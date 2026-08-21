import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isRequestAuthorized } from '@/lib/admin-auth';

const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContents);
    // Don't leak adminAuth credentials in public GET response
    const { adminAuth, ...publicData } = data;
    return NextResponse.json(publicData, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isRequestAuthorized(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
    }

    const data = await request.json();
    
    // Preserve existing adminAuth if not in incoming payload
    let existingAdminAuth = undefined;
    try {
      const existingFileContents = await fs.readFile(DATA_FILE_PATH, 'utf8');
      const existingData = JSON.parse(existingFileContents);
      existingAdminAuth = existingData.adminAuth;
    } catch {
      // ignore
    }

    const payloadToWrite = {
      ...data,
      ...(existingAdminAuth && !data.adminAuth ? { adminAuth: existingAdminAuth } : {}),
    };

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(payloadToWrite, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing data:', error);
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}

