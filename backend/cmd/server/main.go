package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/mediguard/core/internal/auth"
	"github.com/mediguard/core/internal/shared/db"
	"github.com/mediguard/core/internal/shared/redis"
	mgMiddleware "github.com/mediguard/core/internal/shared/middleware"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	// Setup logging
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	// Load config (simplified for demo)
	dbURL := os.Getenv("DATABASE_URL")
	redisAddr := os.Getenv("REDIS_ADDR")
	redisPass := os.Getenv("REDIS_PASSWORD")
	jwtSecret := os.Getenv("JWT_SECRET")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize DB
	database, err := db.InitDB(dbURL)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to initialize database")
	}

	// Run Migrations
	err = db.RunMigrations(database, "./migrations")
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to run migrations")
	}

	// Initialize Redis
	_, err = redis.InitRedis(redisAddr, redisPass)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to initialize Redis")
	}

	// Initialize Services
	authRepo := auth.NewAuthRepository(database)
	authService := auth.NewAuthService(authRepo, jwtSecret)
	authHandler := auth.NewAuthHandler(authService)

	// Router setup
	r := chi.NewRouter()

	// Standard middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// Custom middleware
	r.Use(mgMiddleware.RequestID)
	r.Use(mgMiddleware.Logging)

	// Routes
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			authHandler.RegisterRoutes(r)
		})
	})

	// Server setup
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	// Graceful shutdown
	go func() {
		log.Info().Msgf("Server starting on port %s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal().Err(err).Msg("Server failed to start")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info().Msg("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal().Err(err).Msg("Server forced to shutdown")
	}

	log.Info().Msg("Server exited properly")
}
