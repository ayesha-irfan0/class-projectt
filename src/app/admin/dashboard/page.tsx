"use client"

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 form state
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()

      if (Array.isArray(data)) {
        setProducts(data)
      } else {
        console.error("API did not return array:", data)
        setProducts([])
      }
    } catch (error) {
      console.error("Fetch error:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // 🔥 ADD PRODUCT FUNCTION
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!title || !price || !image) {
      alert("Sab fields fill karo")
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('price', price)
    formData.append('image', image)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        setTitle('')
        setPrice('')
        setImage(null)
        fetchProducts() // refresh list
      } else {
        alert("Product add nahi hua")
      }
    } catch (error) {
      console.error("Add error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 grid lg:grid-cols-3 gap-6">

      {/* 🔥 LEFT SIDE = ADD PRODUCT FORM */}
      <div className="bg-zinc-900 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            className="w-full p-2 bg-black border border-zinc-700 rounded"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            className="w-full p-2 bg-black border border-zinc-700 rounded"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />

          <button className="w-full bg-white text-black py-2 rounded">
            Add Product
          </button>
        </form>
      </div>

      {/* 🔥 RIGHT SIDE = PRODUCTS LIST */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-6">
          Inventory ({products.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-zinc-500">No products found</p>
          )}
        </div>
      </div>

    </div>
  )
}