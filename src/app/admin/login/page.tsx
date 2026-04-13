'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Hum password check bhi add kar sakte hain (e.g., 'admin123')
    if (password === 'admin123') { 
      // Cookie set karna protection ke liye
      document.cookie = "admin=true; path=/; max-age=86400" // 24 hours expiry
      
      // Smooth navigation
      window.location.href = "/admin/dashboard"
    } else {
      alert("Invalid Admin Password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* Premium Login Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500 mt-2">Enter your credentials to manage store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Login as Admin"
            )}
          </button>
        </form>

        <p className="text-center text-zinc-600 text-xs mt-8 uppercase tracking-widest">
          Secure Access Only
        </p>
      </div>
    </div>
  )
}