import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function AuthComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) throw error
        alert('Check your email for verification link!')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  if (loading) {
    return <div className="flex justify-center p-4">Loading...</div>
  }

  if (user) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Welcome, {user.email}!</h2>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-2 text-blue-500 hover:text-blue-600"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  )
}