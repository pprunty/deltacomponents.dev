# Variables
NODE_ENV ?= development
PNPM := pnpm
NEXT := $(PNPM) next
TSX := $(PNPM) tsx

# Colors for terminal output
CYAN := \033[0;36m
GREEN := \033[0;32m
RED := \033[0;31m
NC := \033[0m # No Color

# Help command
.PHONY: help
help:
	@echo "$(CYAN)Available commands:$(NC)"
	@echo "  $(GREEN)make install$(NC)    - Install dependencies"
	@echo "  $(GREEN)make dev$(NC)        - Start development server"
	@echo "  $(GREEN)make build$(NC)      - Build for production"
	@echo "  $(GREEN)make start$(NC)      - Start production server"
	@echo "  $(GREEN)make lint$(NC)       - Run ESLint"
	@echo "  $(GREEN)make format$(NC)     - Format code with Prettier"
	@echo "  $(GREEN)make clean$(NC)      - Clean build artifacts"
	@echo "  $(GREEN)make test$(NC)       - Run tests (if configured)"
	@echo "  $(GREEN)make create$(NC)     - Create new component (usage: make create name=ComponentName category=category)"
	@echo "  $(GREEN)make component$(NC)  - Create new component (alias for create)"
	@echo "  $(GREEN)make delete$(NC)     - Delete component (usage: make delete name=ComponentName category=category)"
	@echo "  $(GREEN)make demo$(NC)       - Create new component demo (usage: make demo component=ComponentName name=DemoName)"
	@echo "  $(GREEN)make registry$(NC)   - Build component registry (alias for build-registry)"

# Dependencies
.PHONY: install
install:
	@echo "$(CYAN)Installing dependencies...$(NC)"
	$(PNPM) install

# Development
.PHONY: dev
dev:
	@echo "$(CYAN)Starting development server...$(NC)"
	$(NEXT) dev

# Build
.PHONY: build
build:
	@echo "$(CYAN)Building for production...$(NC)"
	$(NEXT) build

# Start production server
.PHONY: start
start:
	@echo "$(CYAN)Starting production server...$(NC)"
	$(NEXT) start

# Linting
.PHONY: lint
lint:
	@echo "$(CYAN)Running ESLint...$(NC)"
	$(PNPM) lint

# Formatting
.PHONY: format
format:
	@echo "$(CYAN)Formatting code...$(NC)"
	$(PNPM) format

# Format check
.PHONY: format-check
format-check:
	@echo "$(CYAN)Checking code formatting...$(NC)"
	$(PNPM) format:check

# Build registry
.PHONY: build-registry
build-registry:
	@echo "$(CYAN)Building registry...$(NC)"
	$(PNPM) build:registry

# Registry alias
.PHONY: registry
registry: build-registry

# Create component
.PHONY: create
create:
	@if [ -z "$(name)" ] || [ -z "$(category)" ]; then \
		echo "$(RED)Error: name and category are required$(NC)"; \
		echo "Usage: make create name=ComponentName category=category"; \
		exit 1; \
	fi
	@echo "$(CYAN)Creating new component: $(name) in category: $(category)$(NC)"
	$(PNPM) create-component $(name) $(category)

# Component alias
.PHONY: component
component: create

# Delete component
.PHONY: delete
delete:
	@if [ -z "$(name)" ] || [ -z "$(category)" ]; then \
		echo "$(RED)Error: name and category are required$(NC)"; \
		echo "Usage: make delete name=ComponentName category=category"; \
		exit 1; \
	fi
	@echo "$(CYAN)Deleting component: $(name) in category: $(category)$(NC)"
	$(PNPM) delete-component $(name) $(category)

# Create demo
.PHONY: demo
demo:
	@if [ -z "$(component)" ] || [ -z "$(name)" ]; then \
		echo "$(RED)Error: component and name are required$(NC)"; \
		echo "Usage: make demo component=ComponentName name=DemoName"; \
		exit 1; \
	fi
	@echo "$(CYAN)Creating new demo: $(name) for component: $(component)$(NC)"
	$(PNPM) create-demo $(component) $(name)

# Clean
.PHONY: clean
clean:
	@echo "$(CYAN)Cleaning build artifacts...$(NC)"
	rm -rf .next
	rm -rf node_modules
	rm -rf .turbo
	rm -rf dist
	rm -rf coverage
	rm -rf .contentlayer

# Prepare (husky)
.PHONY: prepare
prepare:
	@echo "$(CYAN)Setting up git hooks...$(NC)"
	$(PNPM) prepare

.PHONY: commit
commit:
	@echo "$(CYAN)Committing changes and bypassing pre-commit hooks...$(NC)"
	git commit --no-verify -m "$(message)"

# Default target
.DEFAULT_GOAL := help 