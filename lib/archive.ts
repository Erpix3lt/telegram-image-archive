import fs from 'fs';
import { getImageUrlByFileId } from '../bot';
import { Bot } from 'grammy';

const errorMessages = {
  archivePath: 'Error: Archive path is undefined or empty.',
  readArchive: 'Error reading archive file: ',
  parseArchive: 'Error parsing archive file: ',
  writeArchive: 'Error writing to archive file:',
};

export type ArchiveItem = {
  file_id: string;
  preview_file_id: string;
  artist: string;
  date: string;
  keywords: string[];
};

export type DisplayArchiveItem = ArchiveItem & {
  imageUrl: string;
};

export const getDisplayArchive = async (bot: Bot): Promise<DisplayArchiveItem[]> => {
  const archive = await readFromArchive();
  const displayArchive = await Promise.all(
    archive.map(async (item) => {
      const imageUrl = await getImageUrlByFileId(bot, item.preview_file_id);
      return { ...item, imageUrl };
    })
  );
  return displayArchive;
}

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
  const archive = await readFromArchive();
  if (operation === 'PUSH') {
    await writeToArchive(item, archive);
  } else if (operation === 'DELETE') {
    const updatedArchive = archive.filter(
      (archiveItem) => archiveItem.file_id !== item.file_id
    );
    await writeToArchive(item, updatedArchive);
  }
};