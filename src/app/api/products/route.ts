export const runtime = 'nodejs'

import { prisma } from '@/lib/prisma'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

/* GET */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("GET ERROR:", error)
    return NextResponse.json([])
  }
}

/* POST */
export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get('image') as File | null
    const title = formData.get('title')?.toString()
    const price = Number(formData.get('price'))

    if (!file || !title || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads')
    await mkdir(uploadDir, { recursive: true })

    const fileName = `${Date.now()}-${file.name}`
    const filePath = `/uploads/${fileName}`

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(uploadDir, fileName), buffer)

    const product = await prisma.product.create({
      data: {
        title,
        price,
        image: filePath,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("POST ERROR:", error)
    return NextResponse.json({ error: "DB connection failed" }, { status: 500 })
  }
}

/* DELETE */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 })

    if (product.image) {
      try {
        await unlink(path.join(process.cwd(), 'public', product.image))
      } catch {}
    }

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE ERROR:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}