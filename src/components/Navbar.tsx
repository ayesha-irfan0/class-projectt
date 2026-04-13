'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  // Agar hum login page par hain to navbar clean rakhein ya hide kar dein
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-black font-black text-xl">S</span>
          </div>
          <h1 className="text-white font-bold tracking-tighter text-xl uppercase">
            Store<span className="text-zinc-500">.</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-white ${
              pathname === '/' ? 'text-white' : 'text-zinc-400'
            }`}
          >
            Home
          </Link>

          <Link 
            href="/admin/login" 
            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all border ${
              isAdminPage 
              ? 'bg-white text-black border-white' 
              : 'text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
            }`}
          >
            {isAdminPage ? 'Dashboard' : 'Admin Access'}
            
            {/* Dot indicator for Admin */}
            {isAdminPage && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  )
}