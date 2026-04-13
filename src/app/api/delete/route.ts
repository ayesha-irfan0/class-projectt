import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { id } = await req.json()

    const product = await prisma.product.delete({
      where: { id }
    })

    try {
      await unlink(path.join(process.cwd(), 'public', product.image))
    } catch {}

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Delete failed' }, { status: 500 })
  }
}