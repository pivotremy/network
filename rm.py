import os
import shutil

def remove_directories():
    """
    Remove node_modules and .next directories recursively from the current directory
    """
    for root, dirs, files in os.walk('.', topdown=False):
        # Look for node_modules and .next directories
        if 'node_modules' in dirs:
            node_modules_path = os.path.join(root, 'node_modules')
            try:
                print(f"Removing {node_modules_path}")
                shutil.rmtree(node_modules_path)
            except Exception as e:
                print(f"Error removing {node_modules_path}: {e}")

        if '.next' in dirs:
            next_path = os.path.join(root, '.next')
            try:
                print(f"Removing {next_path}")
                shutil.rmtree(next_path)
            except Exception as e:
                print(f"Error removing {next_path}: {e}")

if __name__ == "__main__":
    print("Starting cleanup...")
    remove_directories()
    print("Cleanup completed!")
