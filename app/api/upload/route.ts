import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const uploadType = formData.get('type') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const ext = path.extname(originalName) || (file.type === 'application/pdf' ? '.pdf' : '.jpg');
    const baseName = path.basename(originalName, ext);

    if (uploadType === 'resume' || ext === '.pdf') {
      // Save directly to public/resume-subhan-haider.pdf for canonical link AND unique file
      const publicDir = path.join(process.cwd(), 'public');
      const canonicalPath = path.join(publicDir, 'resume-subhan-haider.pdf');
      await fs.writeFile(canonicalPath, buffer);

      const fileName = `resume_${Date.now()}.pdf`;
      const filePath = path.join(publicDir, fileName);
      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/resume-subhan-haider.pdf`,
        fileName: file.name,
      });
    }

    const fileName = `${baseName}_${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
