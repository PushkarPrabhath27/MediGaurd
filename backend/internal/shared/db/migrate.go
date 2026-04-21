package db

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

// RunMigrations executes all SQL files in the migrations directory
func RunMigrations(db *sqlx.DB, migrationsPath string) error {
	log.Info().Msg("Starting database migrations...")

	// Create migrations table if not exists
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS migrations (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) UNIQUE NOT NULL,
			applied_at TIMESTAMPTZ DEFAULT NOW()
		)
	`)
	if err != nil {
		return fmt.Errorf("failed to create migrations table: %w", err)
	}

	files, err := os.ReadDir(migrationsPath)
	if err != nil {
		return fmt.Errorf("failed to read migrations directory: %w", err)
	}

	var migrationFiles []string
	for _, f := range files {
		if !f.IsDir() && strings.HasSuffix(f.Name(), ".sql") {
			migrationFiles = append(migrationFiles, f.Name())
		}
	}

	sort.Strings(migrationFiles)

	for _, fileName := range migrationFiles {
		var appliedAt sql.NullString
		err := db.Get(&appliedAt, "SELECT applied_at FROM migrations WHERE name = $1", fileName)
		if err != nil && err != sql.ErrNoRows {
			return fmt.Errorf("failed to check migration status for %s: %w", fileName, err)
		}

		if appliedAt.Valid {
			log.Debug().Str("file", fileName).Msg("Migration already applied, skipping")
			continue
		}

		log.Info().Str("file", fileName).Msg("Applying migration...")

		content, err := os.ReadFile(filepath.Join(migrationsPath, fileName))
		if err != nil {
			return fmt.Errorf("failed to read migration file %s: %w", fileName, err)
		}

		tx, err := db.Beginx()
		if err != nil {
			return fmt.Errorf("failed to start transaction for %s: %w", fileName, err)
		}

		_, err = tx.Exec(string(content))
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to execute migration %s: %w", fileName, err)
		}

		_, err = tx.Exec("INSERT INTO migrations (name) VALUES ($1)", fileName)
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to record migration %s: %w", fileName, err)
		}

		if err := tx.Commit(); err != nil {
			return fmt.Errorf("failed to commit migration %s: %w", fileName, err)
		}

		log.Info().Str("file", fileName).Msg("Migration applied successfully")
	}

	log.Info().Msg("All migrations completed successfully")
	return nil
}
