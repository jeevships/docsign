'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SignUpFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    setLoading(true)
    setMessage('')
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      const errorMessage = `Error: ${error.message}`
      setMessage(errorMessage)
      onError?.(errorMessage)
    } else {
      const successMessage = 'Success! Check your email for confirmation.'
      setMessage(successMessage)
      onSuccess?.()
    }
    
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button 
        onClick={handleSignUp} 
        disabled={loading}
        variant="outline"
        className="w-full"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
      
      {message && (
        <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}