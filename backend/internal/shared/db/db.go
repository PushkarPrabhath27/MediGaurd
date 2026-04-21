package db

import (
	"context"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
)

var db *sqlx.DB

// InitDB initializes the PostgreSQL connection pool
func InitDB(connStr string) (*sqlx.DB, error) {
	var err error
	log.Info().Msg("Connecting to PostgreSQL...")

	// Open connection with retry logic
	for i := 0; i < 5; i++ {
		db, err = sqlx.Connect("postgres", connStr)
		if err == nil {
			break
		}
		log.Warn().Err(err).Msgf("Failed to connect to DB, retrying (%d/5)...", i+1)
		time.Sleep(time.Duration(i+1) * 2 * time.Second)
	}

	if err != nil {
		return nil, fmt.Errorf("failed to connect to postgres after retries: %w", err)
	}

	// Configure pool
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Verify connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping postgres: %w", err)
	}

	log.Info().Msg("Successfully connected to PostgreSQL")
	return db, nil
}

// GetDB returns the initialized DB instance
func GetDB() *sqlx.DB {
	return db
}
