#!/usr/bin/env python3
"""
Simple script to execute Jupyter notebooks with proper path setup.
"""
import sys
import os
from nbclient import NotebookClient
import nbformat
import subprocess

def execute_notebook(notebook_path, output_path=None):
    """
    Execute a Jupyter notebook with proper Python path setup.

    Args:
        notebook_path: Path to the input notebook (.ipynb)
        output_path: Path to save the executed notebook (optional)
    """
    # Add parent directory to Python path
    sys.path.insert(0, os.path.dirname(os.path.abspath(notebook_path)) + '/..')

    # Load the notebook
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = nbformat.read(f, as_version=4)

    # Execute the notebook
    client = NotebookClient(nb, timeout=600, kernel_name='python3')

    print(f"🚀 Executing {notebook_path}...")
    try:
        # Execute with path setup injected into first code cell
        for i, cell in enumerate(nb.cells):
            if cell.cell_type == 'code':
                # Inject path setup at the beginning
                original_source = cell.source
                cell.source = f"import sys\nsys.path.insert(0, '..')\n{original_source}"
                break

        executed_nb = client.execute()

        # Save output if path provided
        if output_path:
            with open(output_path, 'w', encoding='utf-8') as f:
                nbformat.write(executed_nb, f)
            print(f"✅ Notebook executed successfully! Saved to {output_path}")
        else:
            print("✅ Notebook executed successfully!")

        return True
    except Exception as e:
        print(f"❌ Error executing notebook: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python run_notebook.py <notebook.ipynb> [output.ipynb]")
        sys.exit(1)

    notebook_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None

    success = execute_notebook(notebook_path, output_path)
    sys.exit(0 if success else 1)