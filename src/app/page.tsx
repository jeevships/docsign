'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignUpForm } from '@/components/auth/SignUpForm'

export default function Home() {
  const { user, loading: authLoading } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)
  const router = useRouter()

  // For now, we'll just show different content based on auth status
  // Later we can implement proper routing

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Redirect authenticated users to dashboard
  if (user) {
    router.push('/dashboard')
    return null
  }

  // Show sign up/sign in form for unauthenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {showSignUp ? 'Sign Up for DocSign' : 'Sign In to DocSign'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSignUp ? (
            <SignUpForm />
          ) : (
            <LoginForm />
          )}
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowSignUp(!showSignUp)}
              className="text-sm"
            >
              {showSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
