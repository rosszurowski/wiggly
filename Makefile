dev: yarn.lock ## Run a local development server
	@./node_modules/.bin/microbundle watch
.PHONY: dev

examples: ## Run a local development server for examples
	@examples/node_modules/.bin/next examples dev
.PHONY: examples

publish: dist ## Build a new version a publish to npm
	@npm publish

build: dist ## Build production-ready files
.PHONY: build

format: yarn.lock ## Format code to a standard style
	@./node_modules/.bin/prettier --write 'src/**/*.{ts,tsx}'
.PHONY: format

lint: yarn.lock ## Lint code for quality
	@./node_modules/.bin/eslint --fix 'src/**/*.{ts,tsx}'
.PHONY: lint

dist: yarn.lock
	@./node_modules/.bin/microbundle

yarn.lock: package.json node_modules
	@yarn install --frozen-lockfile --check-files --network-timeout=10000
	@touch -mr $(shell ls -Atd $? | head -1) $@

node_modules:
	@mkdir -p $@

help: ## Show this help
	@echo "\nSpecify a command. The choices are:\n"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[0;36m%-12s\033[m %s\n", $$1, $$2}'
	@echo ""
.PHONY: help
