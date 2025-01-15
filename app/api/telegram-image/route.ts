import { bot } from '@/lib/bot';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) {
    return NextResponse.json(
      { error: 'Missing or invalid fileId' },
      { status: 400 }
    );
  }

  try {
    const file = await bot.api.getFile(fileId);
    const image_url = `https://api.telegram.org/file/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/${file.file_path}`;
    const imageResponse = await fetch(image_url);

    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image from Telegram');
    }

    return new Response(imageResponse.body, {
      headers: {
        'Content-Type': imageResponse.headers.get('content-type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching Telegram image: ${error.message}`);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
