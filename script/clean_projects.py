import os
import shutil

def clean_project():
    # Directories to remove
    dirs_to_remove = ['node_modules', '.next']
    
    # Get the current working directory (project root)
    root_dir = os.getcwd()
    
    # Walk through all directories recursively
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Check each directory to remove
        for dir_to_remove in dirs_to_remove:
            full_path = os.path.join(dirpath, dir_to_remove)
            if os.path.exists(full_path):
                try:
                    print(f"Removing {full_path}")
                    shutil.rmtree(full_path)
                except Exception as e:
                    print(f"Error removing {full_path}: {e}")

if __name__ == "__main__":
    clean_project()
