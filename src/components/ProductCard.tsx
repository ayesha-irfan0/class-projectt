"use client"

import { Product } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Kya aap waqai is product ko delete karna chahte hain?")
    if (!confirmDelete) return

    setIsDeleting(true)

    try {
      const res = await fetch('/api/delete', {
        method: 'POST', // ⚠️ FIX: tumhari API POST hai
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: product.id })
      })

      if (res.ok) {
        router.refresh() // ✅ UI update
      } else {
        alert("Delete karne mein masla pesh aaya")
      }
    } catch (error) {
      console.error("Delete Error:", error)
      alert("Server error aaya")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 p-4 rounded-xl overflow-hidden transition-all hover:border-white/20 shadow-lg">
      
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-lg bg-zinc-800">
        <img 
          src={product.image || 'https://placehold.co/600x400'} 
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Details */}
      <div className="mt-4 space-y-1">
        <h2 className="text-white font-medium text-lg truncate">
          {product.title}
        </h2>

        <div className="flex justify-between items-center">
          <p className="text-zinc-400 font-bold text-xl">
            ${product.price}
          </p>

          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-md transition disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border border-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity rounded-xl" />
    </div>
  )
}