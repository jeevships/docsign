'use client'

import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to DocSign!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Hello, {user?.email}! You're now in your dashboard.
          </p>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder for future features */}
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
}