# Function to run the image archive inside ~/Documents/telegram-image-archive
function runArchive() {
    local original_dir=$(pwd)
    local archive_dir="$HOME/documents/telegram-image-archive"

    # navigate towards the archive directory
    cd "$archive_dir" || { echo "Failed to navigate to archive directory"; return 1; }

    # until the user terminates by control + c, build the ts to js file and run it using node bot.js
    while true; do
      npx tsc bot.ts
      node bot.js
    done

    #navigate back to the original directory
    cd "$original_dir" || { echo "Failed to return to the original directory"; return 1; }
}
