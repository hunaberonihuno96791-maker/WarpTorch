# --- НАСТРОЙКИ ---
$outputDir = "ai-context"
$filesDir = Join-Path $outputDir "files"
$mergedFile = Join-Path $outputDir "warp-merged-code.txt"
$sourceDir = Get-Location

# Список исключений
$exclusions = @(
    "[\\/]\.git[\\/]",
    "[\\/]node_modules[\\/]",
    "[\\/]data[\\/]",          
    "[\\/]public[\\/]",          
    "[\\/]storage[\\/]",       # Добавлено: исключаем кэш Crawlee
    "[\\/]$outputDir[\\/]",  
    "package-lock\.json$",     
    "\.lock$",     
    "\.sqlite$",               
    "\.env$",                  
    "\.ps1$",                  
    "\.env\.prod$"             
    "\.env\.dev$"             
)

$binaryExtensions = @(".png", ".jpg", ".jpeg", ".ico", ".sqlite", ".zip", ".exe")

# 1. Очистка старой папки
if (Test-Path $outputDir) {
    Write-Host "Removing old folder..." -ForegroundColor Gray
    Remove-Item $outputDir -Recurse -Force
}

# 2. Создание новых папок
New-Item -ItemType Directory -Path $filesDir -Force | Out-Null
Write-Host "Starting build into '$outputDir'..." -ForegroundColor Cyan

# Создаем файл (с явным UTF8)
Set-Content -Path $mergedFile -Value "=== PROJECT CONTEXT ===`n" -Encoding UTF8

# 3. Сбор файлов
$allFiles = Get-ChildItem -Path . -Recurse -File
$count = 0

foreach ($file in $allFiles) {
    $path = $file.FullName
    $shouldExclude = $false

    foreach ($pattern in $exclusions) {
        if ($path -match $pattern) {
            $shouldExclude = $true
            break
        }
    }

    if ($shouldExclude) {
        continue
    }

    $relativePath = $path.Substring($sourceDir.Path.Length)
    if ($relativePath.StartsWith("\")) { $relativePath = $relativePath.Substring(1) }
    
    $targetPath = Join-Path $filesDir $relativePath
    $targetDir = Split-Path $targetPath -Parent

    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }

    Copy-Item -Path $path -Destination $targetPath
    $count++

    if ($binaryExtensions -notcontains $file.Extension.ToLower()) {
        Add-Content -Path $mergedFile -Value "`n`n// ==========================================" -Encoding UTF8
        Add-Content -Path $mergedFile -Value "// FILE: $relativePath" -Encoding UTF8
        Add-Content -Path $mergedFile -Value "// ==========================================" -Encoding UTF8
        
        # 🔥 ВОТ ЗДЕСЬ ИСПРАВЛЕНИЕ: добавлено -Encoding UTF8
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        
        # Если файл был пустой, пропускаем добавление
        if ($null -ne $content) {
            Add-Content -Path $mergedFile -Value $content -Encoding UTF8
        }
    }
}

Write-Host "Done! Copied files: $count" -ForegroundColor Green
Write-Host "Folder '$outputDir' is ready." -ForegroundColor Yellow
Write-Host "Use '$mergedFile' to copy all code at once!" -ForegroundColor Magenta