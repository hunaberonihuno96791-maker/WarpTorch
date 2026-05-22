import os
import time
import argparse
import torch
import numpy as np

# --- Библиотеки для красивого CLI ---
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.theme import Theme
import questionary

# --- Импорты WarpTorch ---
from core.utils import get_best_device
from core.solver.energy import get_energy_tensor
from core.visualizer.slicing import get_2d_slice
from core.visualizer.export import export_heatmap_to_json

from core.metrics.alcubierre import get_alcubierre_metric
from core.metrics.lentz import get_lentz_metric
from core.metrics.schwarzschild import get_schwarzschild_metric
from core.metrics.vandenbroeck import get_vandenbroeck_metric
from core.metrics.minkowski import get_minkowski_metric

# Настройка кастомных цветов терминала
custom_theme = Theme({
    "info": "cyan",
    "success": "green",
    "warning": "yellow",
    "danger": "bold red",
    "title": "bold magenta"
})
console = Console(theme=custom_theme)

# ----------------------------------------------------------------------
# РЕЕСТР МЕТРИК И НАСТРОЕК
# ----------------------------------------------------------------------
SIMULATION_REGISTRY = {
    "alcubierre": {
        "name": "Алькубьерре (1994)",
        "description": "Классический суперсветовой варп-пузырь",
        "generator": get_alcubierre_metric,
        "kwargs": {
            "grid_size": (1, 96, 96, 96),
            "grid_scale": (0.1, 0.5, 0.5, 0.5),
            "world_center": (0.0, 24.0, 24.0, 24.0),
            "v": 1.5, "R": 6.0, "sigma": 4.0
        }
    },
    "lentz": {
        "name": "Солитон Ленца (2021)",
        "description": "Положительная плотность энергии",
        "generator": get_lentz_metric,
        "kwargs": {
            "grid_size": (1, 64, 64, 64),
            "grid_scale": (0.1, 0.5, 0.5, 0.5),
            "world_center": (0.0, 16.0, 16.0, 16.0),
            "v": 1.2, "scale": None
        }
    },
    "schwarzschild": {
        "name": "Черная Дыра (Шварцшильд)",
        "description": "Статическая сингулярность и горизонт событий",
        "generator": get_schwarzschild_metric,
        "kwargs": {
            "grid_size": (1, 50, 50, 50),
            "grid_scale": (0.1, 0.4, 0.4, 0.4),
            # Смещение на 0.001 спасает от деления на ноль на горизонте событий
            "world_center": (0.0, 10.001, 10.005, 10.003), 
            "rs": 4.0
        }
    },
    "vandenbroeck": {
        "name": "Ван Ден Брук (1999)",
        "description": "Модифицированный микропузырь",
        "generator": get_vandenbroeck_metric,
        "kwargs": {
            "grid_size": (1, 64, 64, 64),
            "grid_scale": (0.1, 0.5, 0.5, 0.5),
            "world_center": (0.0, 16.0, 16.0, 16.0),
            "v": 1.5, "R1": 6.0, "sigma1": 4.0, "R2": 5.0, "sigma2": 3.0, "A": 10.0
        }
    },
    "minkowski": {
        "name": "Минковский",
        "description": "Плоский вакуум (базис)",
        "generator": get_minkowski_metric,
        "kwargs": {
            "grid_size": (1, 32, 32, 32),
            "grid_scaling": (1.0, 1.0, 1.0, 1.0)
        }
    }
}

def run_single_simulation(key: str, config: dict, device: torch.device, output_dir: str):
    """Выполняет цикл симуляции с красивым логированием."""
    title = f"Симуляция: {config['name']}"
    console.print(Panel(f"[info]{config['description']}[/info]", title=f"[title]{title}[/title]", expand=False))
    
    try:
        # Шаг 1: Метрика
        with console.status("[cyan]Инициализация 4D метрики...", spinner="dots"):
            t_start = time.time()
            kwargs = config["kwargs"].copy()
            if "device" in config["generator"].__code__.co_varnames:
                kwargs["device"] = device
            metric_tensor = config["generator"](**kwargs)
            t_metric = time.time() - t_start
        console.print(f"  [success]✔[/success] Метрика построена [dim]({t_metric:.2f} сек)[/dim]")

        # Шаг 2: Уравнения Эйнштейна
        with console.status("[cyan]Решение уравнений Эйнштейна (Тензор Энергии-Импульса)...", spinner="dots"):
            t_start = time.time()
            energy_tensor = get_energy_tensor(metric_tensor)
            t_einstein = time.time() - t_start
        console.print(f"  [success]✔[/success] Тензор T_μν рассчитан [dim]({t_einstein:.2f} сек)[/dim]")

        # Шаг 3: Экстракция и экспорт
        with console.status("[cyan]Экспорт 2D-среза в JSON...", spinner="dots"):
            t_start = time.time()
            t00_slice = get_2d_slice(energy_tensor, component=(0, 0), slice_plane='xy')
            scale = kwargs.get("grid_scale", kwargs.get("grid_scaling", (1.0, 1.0, 1.0, 1.0)))
            
            export_path = os.path.join(output_dir, f"{key}_t00.json")
            export_heatmap_to_json(
                data_2d=t00_slice,
                filename=export_path,
                title=config['name'],
                grid_scaling=(scale[1], scale[2])
            )
            t_export = time.time() - t_start
        console.print(f"  [success]✔[/success] Данные сохранены в {export_path} [dim]({t_export:.2f} сек)[/dim]\n")
        
    except Exception as e:
        console.print(f"  [danger]✖ Ошибка симуляции:[/danger] {e}\n")

def interactive_menu():
    """Интерактивное меню выбора симуляций."""
    
    # Добавляем явную опцию "Выбрать все" на первое место
    choices = [questionary.Choice("🌟 Выбрать ВСЕ симуляции (Пакетный запуск)", value="ALL")]
    
    # Добавляем остальные метрики
    choices.extend([
        questionary.Choice(f"{key.ljust(15)} | {data['name']}", value=key)
        for key, data in SIMULATION_REGISTRY.items()
    ])
    
    selected_keys = questionary.checkbox(
        "Выберите метрики (Стрелочки - навигация, ПРОБЕЛ - поставить галочку, Enter - старт, 'a' - выбрать все):",
        choices=choices,
        style=questionary.Style([
            ('qmark', 'fg:cyan bold'),
            ('question', 'bold'),
            ('answer', 'fg:green bold'),
            ('pointer', 'fg:cyan bold'),
            ('highlighted', 'fg:cyan'),
            ('selected', 'fg:green'),
        ])
    ).ask()
    
    # Если пользователь нажал Ctrl+C или ничего не выбрал
    if not selected_keys:
        return []
        
    # Если пользователь отметил пункт "ALL"
    if "ALL" in selected_keys:
        return list(SIMULATION_REGISTRY.keys())
        
    return selected_keys


def main():
    # Отключаем принты из export.py, чтобы они не ломали красоту терминала
    import sys
    
    console.clear()
    console.rule("[bold magenta]WarpTorch v1.0[/bold magenta]")
    console.print("\n[info]🚀 Физический симулятор ОТО Эйнштейна[/info]\n", justify="center")

    device = get_best_device()
    console.print(f"Аппаратное ускорение: [bold green]{str(device).upper()}[/bold green]\n")

    # Вызов интерактивного меню
    targets = interactive_menu()
    
    if not targets:
        console.print("[warning]Симуляции не выбраны. Выход.[/warning]")
        return

    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)
    
    t_global_start = time.time()
    
    for key in targets:
        config = SIMULATION_REGISTRY[key]
        run_single_simulation(key, config, device, output_dir)
        
    total_time = time.time() - t_global_start
    console.rule(f"[success]Все задачи завершены (Общее время: {total_time:.2f} сек)[/success]")

if __name__ == "__main__":
    main()