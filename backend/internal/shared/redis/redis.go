package redis

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

var client *redis.Client

// InitRedis initializes the Redis client
func InitRedis(addr, password string) (*redis.Client, error) {
	opts := &redis.Options{
		Addr:     addr,
		Password: password,
		DB:       0,
	}

	// Enable TLS for cloud providers like Upstash
	if addr != "localhost:6379" && addr != "redis:6379" {
		opts.TLSConfig = &tls.Config{
			InsecureSkipVerify: true, // For Upstash/Cloud standard
		}
	}

	client = redis.NewClient(opts)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := client.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to ping redis: %w", err)
	}

	log.Info().Msg("Successfully connected to Redis")
	return client, nil
}

// GetClient returns the initialized Redis client
func GetClient() *redis.Client {
	return client
}

// Helper functions

func Set(ctx context.Context, key string, value interface{}, ttl time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return client.Set(ctx, key, data, ttl).Err()
}

func Get(ctx context.Context, key string, dest interface{}) error {
	data, err := client.Get(ctx, key).Bytes()
	if err != nil {
		return err
	}
	return json.Unmarshal(data, dest)
}

func Delete(ctx context.Context, key string) error {
	return client.Del(ctx, key).Err()
}

func Publish(ctx context.Context, channel string, message interface{}) error {
	data, err := json.Marshal(message)
	if err != nil {
		return err
	}
	return client.Publish(ctx, channel, data).Err()
}

func Subscribe(ctx context.Context, channel string) *redis.PubSub {
	return client.Subscribe(ctx, channel)
}
