'use client'

import { useState, useEffect } from 'react'
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

  // Show dashboard for authenticated users
  if (user) {
    // Import the dashboard page content
    const DashboardContent = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to DocSign!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Hello, {user?.email}! You're now in your dashboard.
            </p>
            <Button onClick={() => {}} variant="outline">
              Sign Out (will add functionality)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              No documents yet. Document management coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
    )

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                DocSign Dashboard
              </h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardContent />
        </main>
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
