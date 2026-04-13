import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function Home() {
  let products: any[] = []

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.log("DB ERROR:", error)
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}