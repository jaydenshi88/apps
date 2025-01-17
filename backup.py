import os
import time
import subprocess
from datetime import datetime

# MySQL database configuration
DB_HOST = 'localhost'
DB_DATABASE: fbla
DB_USER: user
DB_PASSWORD: 123
  

# Backup configuration
BACKUP_DIR = './backup/'
MAX_BACKUPS = 5

# Get the current timestamp
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

# Construct the backup file name
backup_file = f'{DB_NAME}_{timestamp}.sql'
backup_path = os.path.join(BACKUP_DIR, backup_file)

# Create the backup directory if it doesn't exist
os.makedirs(BACKUP_DIR, exist_ok=True)

# Perform the MySQL database backup using mysqldump
mysqldump_cmd = f'mysqldump -h {DB_HOST} -u {DB_USER} -p{DB_PASSWORD} {DB_NAME} > {backup_path}'
subprocess.call(mysqldump_cmd, shell=True)

print(f'Database backup created: {backup_path}')

# Get the list of existing backup files
backup_files = [f for f in os.listdir(BACKUP_DIR) if f.startswith(DB_NAME)]

# Sort the backup files by timestamp (oldest first)
backup_files.sort()

# Remove older backups if the number of backups exceeds MAX_BACKUPS
if len(backup_files) > MAX_BACKUPS:
    old_backups = backup_files[:-MAX_BACKUPS]
    for old_backup in old_backups:
        old_backup_path = os.path.join(BACKUP_DIR, old_backup)
        os.remove(old_backup_path)
        print(f'Removed old backup: {old_backup_path}')
