.PHONY: help up down logs restart clean

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
