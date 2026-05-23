# Environment Configuration

## PyTorch Version Management

WarpTorch supports both CPU and CUDA versions of PyTorch. By default, the lightweight CPU version is used to avoid downloading large files.

### CPU Version (Default)
- **Size**: ~200MB
- **Use case**: Development, AMD/Intel GPUs, CPU inference
- **Installation**: Included by default

### CUDA Version
- **Size**: ~2-5GB
- **Use case**: NVIDIA GPU acceleration
- **Installation**: Requires manual switch

## Switching Versions

### Using Make commands:

```bash
# Switch to CPU version (lightweight)
make use-cpu

# Switch to CUDA version (requires NVIDIA GPU)
make use-cuda
```

### Manual configuration:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set `TORCH_VERSION`:
   ```bash
   TORCH_VERSION=cpu  # or TORCH_VERSION=cuda
   ```

3. Rebuild and restart:
   ```bash
   docker compose down
   docker compose build --no-cache
   docker compose up -d
   ```

## Environment Variables

See `.env.example` for all available configuration options:

- `TORCH_VERSION`: `cpu` or `cuda` (default: `cpu`)
- `FRONTEND_PORT`: Frontend port (default: `3001`)
- `BACKEND_PORT`: Backend port (default: `8001`)
- `CORS_ORIGINS`: Allowed CORS origins

## Hardware Detection

To auto-detect your hardware and get recommendations:

```bash
make detect
```

This will analyze your system and suggest whether to use CPU or CUDA version.