#!/bin/bash

# --- НАСТРОЙКИ ---
OUTPUT_DIR="ai-context"
FILES_DIR="$OUTPUT_DIR/files"
MERGED_FILE="$OUTPUT_DIR/warp-merged-code.txt"
SOURCE_DIR="$(pwd)"

# Список исключений (простые паттерны)
EXCLUSIONS=(
    "\.git/"
    "venv/"
    "__pycache__/"
    "node_modules/"
    "output/"
    "\.ipynb_checkpoints/"
    "ai-context/"
    "\.pyc$"
    "\.pyo$"
    "\.pyd$"
    "\.so$"
    "\.egg-info/"
    "\.log$"
    "\.env$"
    "\.env\.local$"
    "\.env\.prod$"
    "\.env\.dev$"
    "package-lock\.json$"
    "\.lock$"
    "\.sqlite$"
    "\.db$"
    "merge\.sh$"
    "merge\.ps1$"
    "\.min\.js$"
    "\.min\.css$"
    "/build/"
    "/dist/"
    "\.pytest_cache/"
    "\.coverage/"
    "htmlcov/"
    "/site/"
    "_build/"
    "\.key$"
    "\.pem$"
    "credentials\.json$"
    "\.claude/"
    "\.vscode/"
    "\.idea/"
    "\.DS_Store$"
    "Thumbs\.db$"
)

# Бинарные расширения
BINARY_EXTENSIONS=("png" "jpg" "jpeg" "ico" "sqlite" "zip" "exe" "gif" "bmp" "pdf")

# 1. Очистка старой папки
if [ -d "$OUTPUT_DIR" ]; then
    echo "Removing old folder..."
    rm -rf "$OUTPUT_DIR"
fi

# 2. Создание новых папок
mkdir -p "$FILES_DIR"
echo "Starting build into '$OUTPUT_DIR'..."

# Создаем файл
echo "=== PROJECT CONTEXT ===" > "$MERGED_FILE"

# 3. Сбор файлов с оптимизацией - исключаем директории на уровне find
COUNT=0

# Сначала исключаем целые директории через find -prune, затем проверяем файлы
while IFS= read -r -d '' file; do
    FILE_PATH="$file"
    # Убираем префикс ./ для проверки исключений
    CLEAN_PATH="${FILE_PATH#./}"
    SHOULD_EXCLUDE=false

    # Проверяем файловые исключения (только для файлов, не директорий)
    for pattern in "${EXCLUSIONS[@]}"; do
        if echo "$CLEAN_PATH" | grep -qE "$pattern"; then
            SHOULD_EXCLUDE=true
            break
        fi
    done

    if [ "$SHOULD_EXCLUDE" = true ]; then
        continue
    fi

    # Выводим прогресс каждые 50 файлов
    if [ $((COUNT % 50)) -eq 0 ] && [ $COUNT -gt 0 ]; then
        echo "Processed: $COUNT files..."
    fi

    # Получаем относительный путь (убираем ./)
    RELATIVE_PATH="${FILE_PATH#./}"

    # Создаем целевую директорию
    TARGET_PATH="$FILES_DIR/$RELATIVE_PATH"
    TARGET_DIR=$(dirname "$TARGET_PATH")
    mkdir -p "$TARGET_DIR"

    # Копируем файл
    cp "$FILE_PATH" "$TARGET_PATH"
    ((COUNT++))

    # Проверяем, не является ли файл бинарным
    EXTENSION="${FILE_PATH##*.}"
    IS_BINARY=false

    for ext in "${BINARY_EXTENSIONS[@]}"; do
        if [ "$EXTENSION" = "$ext" ]; then
            IS_BINARY=true
            break
        fi
    done

    if [ "$IS_BINARY" = false ]; then
        echo "" >> "$MERGED_FILE"
        echo "" >> "$MERGED_FILE"
        echo "// ==========================================" >> "$MERGED_FILE"
        echo "// FILE: $RELATIVE_PATH" >> "$MERGED_FILE"
        echo "// ==========================================" >> "$MERGED_FILE"

        # Добавляем содержимое файла
        cat "$FILE_PATH" >> "$MERGED_FILE"
    fi

done < <(find . -type f \
    \( -path "*/.git/*" -o \
       -path "*/venv/*" -o \
       -path "*/__pycache__/*" -o \
       -path "*/node_modules/*" -o \
       -path "*/output/*" -o \
       -path "*/\.ipynb_checkpoints/*" -o \
       -path "*/ai-context/*" \) -prune -o \
    -type f -print0)

echo "Done! Copied files: $COUNT"
echo "Folder '$OUTPUT_DIR' is ready."
echo "Use '$MERGED_FILE' to copy all code at once!"
