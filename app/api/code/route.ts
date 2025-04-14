import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), 'delta', 'examples', `${name}-demo.tsx`)
    const code = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json({ code })
  } catch (error) {
    console.error(`Error reading example code for ${name}:`, error)
    return NextResponse.json({ error: 'Failed to read code' }, { status: 500 })
  }
} 