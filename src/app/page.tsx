'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignUpForm } from '@/components/auth/SignUpForm'

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)

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

  // Show authenticated user dashboard
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Welcome to DocSign!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Signed in as: <span className="font-medium">{user.email}</span>
              </p>
            </div>
            <Button 
              onClick={signOut} 
              variant="outline" 
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
