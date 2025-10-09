# Delta Components Registry - Makefile
# Based on package.json scripts for easy command access

.PHONY: help dev build start lint typecheck format registry component clean install

# Default target when running just "make"
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "Delta Components Registry - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Development
dev: ## Start development server with Turbopack on port 4000
	npm run dev

build: ## Build the application for production
	npm run build

start: ## Start production server on port 4000
	npm run start

# Code Quality
lint: ## Run ESLint
	npm run lint

lint-fix: ## Run ESLint with auto-fix
	npm run lint:fix

typecheck: ## Run TypeScript type checking
	npm run typecheck

format: ## Check code formatting with Prettier
	npm run format:check

format-fix: ## Fix code formatting with Prettier
	npm run format:write

# Registry Management
registry-build: ## Build registry index and format
	npm run registry:build

registry-capture: ## Capture registry screenshots
	npm run registry:capture

registry-validate: ## Validate registry structure
	npm run validate:registries

# Component Management
component-create: ## Create new component (usage: make component-create name=button type=ui)
	@if [ -z "$(name)" ]; then \
		echo "Usage: make component-create name=<component-name> [type=ui|components|blocks]"; \
		exit 1; \
	fi
	node scripts/create-component.js $(name) $(or $(type),components)

component-delete: ## Delete component (usage: make component-delete name=button)
	@if [ -z "$(name)" ]; then \
		echo "Usage: make component-delete name=<component-name>"; \
		exit 1; \
	fi
	node scripts/delete-component.js $(name)

# Installation & Dependencies
install: ## Install dependencies and run postinstall
	npm install

postinstall: ## Run fumadocs-mdx postinstall
	npm run postinstall

# Cleanup
clean: ## Remove node_modules and build artifacts
	rm -rf node_modules
	rm -rf .next
	rm -rf .turbo

# Development Workflow
setup: install ## Setup project (install dependencies)
	@echo "✅ Project setup complete!"
	@echo "Run 'make dev' to start development server"

quality: lint typecheck format ## Run all quality checks
	@echo "✅ All quality checks passed!"

# Registry Workflow
registry: registry-build registry-validate ## Build and validate registry
	@echo "✅ Registry build and validation complete!"

# Common Development Tasks
check: quality registry ## Run all checks (quality + registry)
	@echo "✅ All checks passed!"

deploy-prep: check build ## Prepare for deployment (checks + build)
	@echo "✅ Ready for deployment!"

# Examples
examples: ## Show usage examples
	@echo "Component Management Examples:"
	@echo "  make component-create name=my-button type=ui"
	@echo "  make component-create name=voice-recorder type=components"
	@echo "  make component-create name=hero-section type=blocks"
	@echo "  make component-delete name=my-button"
	@echo ""
	@echo "Development Workflow Examples:"
	@echo "  make setup      # Initial project setup"
	@echo "  make dev        # Start development"
	@echo "  make check      # Run all checks before commit"
	@echo "  make deploy-prep # Prepare for deployment"