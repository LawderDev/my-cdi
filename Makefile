.PHONY: help install start test build typecheck lint

help: ## List available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies and prepare the native ABI for the app
	pnpm install
	pnpm rebuild:app

start: ## Launch the app in dev mode (auto-aligns the native ABI)
	pnpm dev

test: ## Run the test suite (auto-aligns the native ABI for Node)
	pnpm test

build: ## Typecheck and build the app
	pnpm build

typecheck: ## Run TypeScript checks
	pnpm typecheck

lint: ## Run ESLint
	pnpm lint