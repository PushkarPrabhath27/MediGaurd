package auth

import (
	"context"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrUserAlreadyExists  = errors.New("user already exists")
	ErrTenantNotFound     = errors.New("tenant not found")
)

type AuthService interface {
	Login(ctx context.Context, req LoginRequest, tenantSlug string) (*LoginResponse, error)
	Register(ctx context.Context, req RegisterRequest) error
	RefreshToken(ctx context.Context, refreshToken string) (*TokenPair, error)
	Logout(ctx context.Context, refreshToken string) error
}

type authService struct {
	repo      AuthRepository
	jwtSecret []byte
}

func NewAuthService(repo AuthRepository, jwtSecret string) AuthService {
	return &authService{
		repo:      repo,
		jwtSecret: []byte(jwtSecret),
	}
}

func (s *authService) Login(ctx context.Context, req LoginRequest, tenantSlug string) (*LoginResponse, error) {
	tenantID, err := s.repo.FindTenantBySlug(ctx, tenantSlug)
	if err != nil {
		return nil, ErrTenantNotFound
	}

	user, err := s.repo.FindUserByEmail(ctx, tenantID, req.Email)
	if err != nil || user == nil {
		return nil, ErrInvalidCredentials
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		return nil, ErrInvalidCredentials
	}

	tokens, err := s.generateTokenPair(user)
	if err != nil {
		return nil, err
	}

	err = s.repo.StoreRefreshToken(ctx, user.ID, tokens.RefreshToken, 7*24*time.Hour)
	if err != nil {
		return nil, err
	}

	s.repo.UpdateLastLogin(ctx, user.ID)

	return &LoginResponse{
		Tokens: tokens,
		User:   user,
	}, nil
}


func (s *authService) Register(ctx context.Context, req RegisterRequest) error {
	tenantID, err := s.repo.FindTenantBySlug(ctx, req.TenantSlug)
	if err != nil {
		return ErrTenantNotFound
	}

	existing, _ := s.repo.FindUserByEmail(ctx, tenantID, req.Email)
	if existing != nil {
		return ErrUserAlreadyExists
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		return err
	}

	user := &User{
		TenantID:     tenantID,
		Email:        req.Email,
		PasswordHash: string(hash),
		FirstName:    req.FirstName,
		LastName:     req.LastName,
		Role:         "engineer", // Default role
	}

	return s.repo.CreateUser(ctx, user)
}

func (s *authService) RefreshToken(ctx context.Context, refreshToken string) (*TokenPair, error) {
	_, err := s.repo.ValidateRefreshToken(ctx, refreshToken)
	if err != nil {
		return nil, errors.New("invalid refresh token")
	}

	// In a real app, you'd fetch the user to get current tenant/role
	// For now, we'll assume we need to fetch user details
	// This requires adding FindUserByID to repository
	return nil, errors.New("not implemented")
}

func (s *authService) Logout(ctx context.Context, refreshToken string) error {
	return s.repo.RevokeRefreshToken(ctx, refreshToken)
}

func (s *authService) generateTokenPair(user *User) (*TokenPair, error) {
	accessTokenExpiry := time.Now().Add(15 * time.Minute)
	claims := Claims{
		UserID:   user.ID,
		TenantID: user.TenantID,
		Role:     user.Role,
		Email:    user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(accessTokenExpiry),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	accessTokenStr, err := accessToken.SignedString(s.jwtSecret)
	if err != nil {
		return nil, err
	}

	refreshTokenStr := uuid.New().String()

	return &TokenPair{
		AccessToken:  accessTokenStr,
		RefreshToken: refreshTokenStr,
		ExpiresAt:    accessTokenExpiry,
	}, nil
}
