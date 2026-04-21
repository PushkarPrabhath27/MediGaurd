package main

import (
	"fmt"
	"log"
	"os"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	db, err := sqlx.Connect("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	tenantID := uuid.New()
	_, err = db.Exec(`
		INSERT INTO tenants (id, name, slug, plan)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (slug) DO UPDATE SET
			name = EXCLUDED.name,
			plan = EXCLUDED.plan
	`,
		tenantID, "City General Hospital", "city-general", "premium")
	if err != nil {
		log.Fatal(err)
	}

	// Fetch tenant ID if it already existed
	db.Get(&tenantID, "SELECT id FROM tenants WHERE slug = 'city-general'")

	hash, _ := bcrypt.GenerateFromPassword([]byte("password123"), 12)
	_, err = db.Exec(`
		INSERT INTO users (tenant_id, email, password_hash, first_name, last_name, role)
		VALUES ($1, $2, $3, $4, $5, $6)
		ON CONFLICT (tenant_id, email) DO UPDATE SET
			password_hash = EXCLUDED.password_hash,
			first_name = EXCLUDED.first_name,
			last_name = EXCLUDED.last_name,
			role = EXCLUDED.role,
			is_active = true
	`,
		tenantID, "admin@citygeneral.com", string(hash), "John", "Doe", "admin")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Seed data created successfully!")
}
