import { Bot } from "grammy";
import { Message } from "grammy/types";
import { config } from "dotenv";
import * as fs from 'fs';

config({ path: ".env.local" });

// ******************** //
// archive              //
// ******************** //

type ArchiveItem = {
  file_id: string;
  preview_file_id: string;
  artist: string;
  date: string;
  keywords: string[];
};

export const getArchiveItemFromMessage = (message: Message): ArchiveItem => {
  const caption = message.caption || "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, artist = "Unknown Artist"] = caption.match(/^(.*?),/) || [];

  const archiveItem: ArchiveItem = {
    file_id: message.photo![message.photo!.length - 1].file_id,
    preview_file_id: message.photo![2].file_id,
    artist,
    date: new Date().toISOString(),
    keywords: caption.match(/#\w+/g) || [],
  };
  return archiveItem;
};

const errorMessages = {
    archivePath: 'Error: Archive path is undefined or empty.',
    readArchive: 'Error reading archive file: ',
    parseArchive: 'Error parsing archive file: ',
    writeArchive: 'Error writing to archive file:',
  };

  const readFromArchive = async (
    archivePath: string | undefined = process.env.NEXT_PUBLIC_ARCHIVE_PATH
  ): Promise<ArchiveItem[]> => {
    return new Promise((resolve, reject) => {
      if (!archivePath) {
        return reject(errorMessages.archivePath);
      }
  
      fs.readFile(archivePath, 'utf8', (readError, data) => {
        if (readError) {
          return reject(errorMessages.readArchive + readError);
        }
  
        if (!data.trim()) {
          return resolve([]);
        }
  
        try {
          const archiveArray: ArchiveItem[] = JSON.parse(data);
          resolve(archiveArray);
        } catch (parseError) {
          reject(errorMessages.parseArchive + parseError);
        }
      });
    });
  };
  
  
const writeToArchive = async (
    item: ArchiveItem,
    archive: ArchiveItem[],
    archivePath: string | undefined = process.env.NEXT_PUBLIC_ARCHIVE_PATH
  ) => {
    return new Promise<void>((resolve, reject) => {
      if (!archivePath) {
        return reject(errorMessages.archivePath);
      }
  
      archive.push(item);
  
      try {
        fs.writeFile(
          archivePath,
          JSON.stringify(archive, null, 2),
          'utf8',
          (writeError) => {
            if (writeError) {
              return reject(writeError);
            }
            resolve();
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  };
  
export const updateArchive = async (
    item: ArchiveItem,
    operation: 'PUSH' | 'DELETE'
  ) => {
    try {
      const archive = await readFromArchive();
      if (operation === 'PUSH') {
        await writeToArchive(item, archive);
      } else if (operation === 'DELETE') {
        const updatedArchive = archive.filter(
          (archiveItem) => archiveItem.file_id !== item.file_id
        );
        await writeToArchive(item, updatedArchive);
      }
    } catch (error) {
      console.error("Error updating archive:", error);
      throw error; // Rethrow to allow caller to handle if necessary
    }
  };

// ******************** //
// utils                //
// ******************** //

export const randomSuccessMessage = () => {
    const emojis = [
      "🥹",
      "👺", 
      "🏃🏽‍♂️‍➡️", 
      "🦄",
    ];
  
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

const bot = new Bot(process.env.NEXT_PUBLIC_BOT_TOKEN || "");
bot.start();
console.log("BOT INSTANCE", bot);
bot.on("message", async (ctx) => {
  if (ctx.message) {
    try {
      const archiveItem = getArchiveItemFromMessage(ctx.message);
      await updateArchive(archiveItem, "PUSH");
      ctx.reply(randomSuccessMessage());
    } catch (error) {
      console.error("Unexpected error:", error);
      // Send a user-friendly error message
      ctx.reply("Oops! Something went wrong while saving the image. Please try again later.");
    }
  }
});

