import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Shield } from 'lucide-react'
import { useAuth, useTranslation } from '../App'

export function Login() {
  const { login } = useAuth()
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username && credentials.password && credentials.role) {
      login(credentials)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2ECC71]/10 to-[#3498DB]/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-[#2ECC71]" />
          </div>
          <CardTitle>Government Authority Portal</CardTitle>
          <CardDescription>
            Antimicrobial Usage & MRL Compliance Monitoring System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={credentials.role} onValueChange={(value) => setCredentials(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="inspector">Inspector</SelectItem>
                  <SelectItem value="veterinary_officer">Veterinary Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-[#2ECC71] hover:bg-[#27AE60]">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p>Username: admin | Password: admin123 | Role: Administrator</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}