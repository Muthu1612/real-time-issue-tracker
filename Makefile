.PHONY: help up down down-v stop restart logs ps clean build

# Docker Compose file path
COMPOSE_FILE := infrastructure/docker-compose.yml
PROJECT_NAME := real-time-issue-tracker

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start all services
	docker-compose -f $(COMPOSE_FILE) up -d

down: ## Stop all services (keeps volumes)
	docker-compose -f $(COMPOSE_FILE) down

down-v: ## Stop all services and remove volumes (deletes data)
	docker-compose -f $(COMPOSE_FILE) down -v

stop: ## Stop services without removing containers
	docker-compose -f $(COMPOSE_FILE) stop

restart: ## Restart all services
	docker-compose -f $(COMPOSE_FILE) restart

logs: ## View logs from all services
	docker-compose -f $(COMPOSE_FILE) logs -f

logs-kafka: ## View Kafka logs
	docker-compose -f $(COMPOSE_FILE) logs -f kafka

logs-postgres: ## View PostgreSQL logs
	docker-compose -f $(COMPOSE_FILE) logs -f postgres

ps: ## List running containers
	docker-compose -f $(COMPOSE_FILE) ps

build: ## Build/rebuild services
	docker-compose -f $(COMPOSE_FILE) build

clean: ## Remove all containers, networks, and volumes
	docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -f

exec-kafka: ## Execute bash in Kafka container
	docker exec -it kafka bash

exec-postgres: ## Execute psql in PostgreSQL container
	docker exec -it postgres psql -U trace -d trace

health: ## Check health of all services
	@docker-compose -f $(COMPOSE_FILE) ps
	@echo "\n=== Kafka Topics ==="
	@docker exec kafka kafka-topics --bootstrap-server localhost:9092 --list 2>/dev/null || echo "Kafka not ready"
