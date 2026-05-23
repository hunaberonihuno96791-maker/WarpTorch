# Multistage build for WarpTorch Backend
# Stage 1: Builder
FROM python:3.12-slim AS builder

# Build argument to choose between CPU and CUDA versions
ARG TORCH_VERSION=cpu

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY backend/requirements.txt .
COPY backend/requirements-${TORCH_VERSION}.txt .

# Install Python dependencies in one layer to reduce image size
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir -r requirements-${TORCH_VERSION}.txt && \
    rm -rf /root/.cache/pip

# Stage 2: Runtime
FROM python:3.12-slim

WORKDIR /app

# Install only runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app

# Copy Python packages from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code
COPY --chown=appuser:appuser core/ ./core/
COPY --chown=appuser:appuser backend/ ./backend/

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8001/health')" || exit 1

# Run the application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8001"]
