.PHONY: help up down logs restart clean install install-cpu install-cuda detect docker-build docker-build-cpu docker-build-cuda use-cpu use-cuda

DOCKER_COMPOSE := $(shell command -v docker-compose >/dev/null 2>&1 && echo "docker-compose" || echo "docker compose")

help:
	@echo "=========================================="
	@echo "🚀 WarpTorch - Warp Simulations"
	@echo "=========================================="
	@echo "Quick start:"
	@echo "  make up      - Запустить симуляцию"
	@echo "  make down    - Остановить симуляцию"
	@echo "  make logs    - Смотреть логи"
	@echo "  make restart - Перезапустить симуляцию"
	@echo "  make clean   - Полная очистка"
	@echo ""
	@echo "PyTorch version switching:"
	@echo "  make use-cpu  - Switch to CPU version (lightweight, ~200MB)"
	@echo "  make use-cuda - Switch to CUDA version (large, ~2-5GB)"
	@echo ""
	@echo "Hardware detection & installation:"
	@echo "  make detect         - Detect hardware and show recommended installation"
	@echo "  make install        - Auto-install based on detected hardware"
	@echo "  make install-cpu    - Install CPU-only version (fast, ~200MB)"
	@echo "  make install-cuda   - Install NVIDIA CUDA version (slow, ~2-5GB)"
	@echo ""
	@echo "Docker builds:"
	@echo "  make docker-build       - Build Docker image (auto-detect hardware)"
	@echo "  make docker-build-cpu   - Build CPU-only Docker image"
	@echo "  make docker-build-cuda  - Build CUDA Docker image"
	@echo "=========================================="

up:
	$(DOCKER_COMPOSE) up -d
	@echo "\033[32m✓ Симуляция запущена!\033[0m"
	@echo "  Frontend: \033[36mhttp://localhost:3001\033[0m"
	@echo "  Backend:  \033[36mhttp://localhost:8001\033[0m"
	@echo "  API Docs: \033[36mhttp://localhost:8001/docs\033[0m"

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

restart:
	$(DOCKER_COMPOSE) restart

clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans
	@echo "\033[32m✓ Очистка завершена\033[0m"

# Hardware detection & installation commands
detect:
	@python detect_hardware.py

install: detect
	@echo "📦 Installing WarpTorch dependencies..."
	@if python detect_hardware.py | grep -q "NVIDIA"; then \
		pip install -r backend/requirements-cuda.txt; \
	else \
		pip install -r backend/requirements-cpu.txt; \
	fi

install-cpu:
	@echo "📦 Installing CPU-only PyTorch (fast & lightweight)..."
	pip install -r backend/requirements-cpu.txt

install-cuda:
	@echo "📦 Installing CUDA-enabled PyTorch (large download)..."
	pip install -r backend/requirements-cuda.txt

docker-build:
	@echo "🐳 Building Docker image..."
	@if python detect_hardware.py | grep -q "NVIDIA"; then \
		echo "Building with CUDA support..."; \
		docker build -f backend/Dockerfile --build-arg TORCH_VERSION=cuda -t warptorch-backend .; \
	else \
		echo "Building CPU-only version..."; \
		docker build -f backend/Dockerfile --build-arg TORCH_VERSION=cpu -t warptorch-backend .; \
	fi

docker-build-cpu:
	@echo "🐳 Building CPU-only Docker image..."
	docker build -f backend/Dockerfile --build-arg TORCH_VERSION=cpu -t warptorch-backend .

docker-build-cuda:
	@echo "🐳 Building CUDA-enabled Docker image..."
	docker build -f backend/Dockerfile --build-arg TORCH_VERSION=cuda -t warptorch-backend .

# Switch PyTorch version (requires rebuild)
use-cpu:
	@echo "🔄 Switching to CPU version..."
	@echo "TORCH_VERSION=cpu" > .env
	@echo "FRONTEND_PORT=3001" >> .env
	@echo "BACKEND_PORT=8001" >> .env
	@echo "CORS_ORIGINS=http://localhost:3001,http://frontend:3001" >> .env
	@$(DOCKER_COMPOSE) down
	@$(DOCKER_COMPOSE) build --no-cache
	@$(DOCKER_COMPOSE) up -d
	@echo "\033[32m✓ Switched to CPU version (lightweight, ~200MB)\033[0m"

use-cuda:
	@echo "🔄 Switching to CUDA version..."
	@echo "TORCH_VERSION=cuda" > .env
	@echo "FRONTEND_PORT=3001" >> .env
	@echo "BACKEND_PORT=8001" >> .env
	@echo "CORS_ORIGINS=http://localhost:3001,http://frontend:3001" >> .env
	@$(DOCKER_COMPOSE) down
	@$(DOCKER_COMPOSE) build --no-cache
	@$(DOCKER_COMPOSE) up -d
	@echo "\033[32m✓ Switched to CUDA version (large, ~2-5GB)\033[0m"
