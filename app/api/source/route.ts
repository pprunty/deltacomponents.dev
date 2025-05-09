import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'No path provided' }, { status: 400 });
  }

  try {
    // Make sure the path is relative to the workspace root and doesn't try to access files outside it
    const normalizedPath = path.normalize(filePath);
    const workspacePath = process.cwd();
    const fullPath = path.join(workspacePath, normalizedPath);
    
    // Security check to make sure we're not accessing files outside the workspace
    if (!fullPath.startsWith(workspacePath)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    // Read the file
    const source = fs.readFileSync(fullPath, 'utf8');
    
    // Clean up the source if needed (e.g., replace imports or remove specific sections)
    const cleanedSource = source
      .replaceAll("@/registry/hooks/", "@/hooks/")
      .replaceAll("@/registry/components/", "@/components/")
      .replaceAll("export default", "export");

    return NextResponse.json({ source: cleanedSource });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
} 