import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Slider } from './ui/slider'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Users,
  Database,
  Mail,
  Smartphone,
  Save,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useTranslation } from '../App'

export function Settings() {
  const { language, setLanguage } = useTranslation()
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    inApp: true,
    compliance: true,
    violations: true,
    reports: false
  })
  
  const [thresholds, setThresholds] = useState({
    complianceThreshold: [75],
    violationThreshold: [3],
    amuUsageThreshold: [100],
    withdrawalThreshold: [24]
  })

  const [userSettings, setUserSettings] = useState({
    defaultView: 'dashboard',
    itemsPerPage: '10',
    autoRefresh: true,
    darkMode: false
  })

  const [systemSettings, setSystemSettings] = useState({
    dataRetention: '24',
    backupFrequency: 'daily',
    apiTimeout: '30',
    maxFileSize: '10'
  })

  const handleSaveSettings = () => {
    // Mock save functionality
    console.log('Settings saved:', { notifications, thresholds, userSettings, systemSettings })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>System Settings</h1>
          <p className="text-muted-foreground">
            Configure system parameters, notifications, and user preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[#2ECC71]">
            <SettingsIcon className="h-3 w-3 mr-1" />
            Configuration
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Language & Localization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Localization
                </CardTitle>
                <CardDescription>Configure language and regional settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">System Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="te">Telugu (తెలుగు)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Format</label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Time Zone</label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Currency</label>
                  <Select defaultValue="inr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Display Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Customize the interface appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Default Landing Page</label>
                  <Select 
                    value={userSettings.defaultView} 
                    onValueChange={(value) => setUserSettings(prev => ({ ...prev, defaultView: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="farms">Farms List</SelectItem>
                      <SelectItem value="prescriptions">Prescriptions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Items Per Page</label>
                  <Select 
                    value={userSettings.itemsPerPage} 
                    onValueChange={(value) => setUserSettings(prev => ({ ...prev, itemsPerPage: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-refresh Data</p>
                    <p className="text-xs text-muted-foreground">Automatically refresh dashboard every 5 minutes</p>
                  </div>
                  <Switch 
                    checked={userSettings.autoRefresh}
                    onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, autoRefresh: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Enable dark theme (coming soon)</p>
                  </div>
                  <Switch 
                    checked={userSettings.darkMode}
                    onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, darkMode: checked }))}
                    disabled
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Channels
                </CardTitle>
                <CardDescription>Configure how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">admin@government.gov</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">In-App Notifications</p>
                      <p className="text-xs text-muted-foreground">Browser notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.inApp}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, inApp: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Types */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Choose which events trigger notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Compliance Alerts</p>
                    <p className="text-xs text-muted-foreground">When compliance drops below threshold</p>
                  </div>
                  <Switch 
                    checked={notifications.compliance}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, compliance: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Violation Reports</p>
                    <p className="text-xs text-muted-foreground">New violations detected</p>
                  </div>
                  <Switch 
                    checked={notifications.violations}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, violations: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Report Generation</p>
                    <p className="text-xs text-muted-foreground">When reports are ready for download</p>
                  </div>
                  <Switch 
                    checked={notifications.reports}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reports: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Thresholds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Compliance Thresholds
                </CardTitle>
                <CardDescription>Set alert thresholds for compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Minimum Compliance Rate</label>
                    <span className="text-sm text-muted-foreground">{thresholds.complianceThreshold[0]}%</span>
                  </div>
                  <Slider
                    value={thresholds.complianceThreshold}
                    onValueChange={(value) => setThresholds(prev => ({ ...prev, complianceThreshold: value }))}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Alert when farm compliance drops below this percentage
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Maximum Violations per Month</label>
                    <span className="text-sm text-muted-foreground">{thresholds.violationThreshold[0]}</span>
                  </div>
                  <Slider
                    value={thresholds.violationThreshold}
                    onValueChange={(value) => setThresholds(prev => ({ ...prev, violationThreshold: value }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Flag farms exceeding this number of violations
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Usage Thresholds */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Thresholds</CardTitle>
                <CardDescription>Configure antimicrobial usage monitoring limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">AMU Usage Limit (mg/kg/month)</label>
                    <span className="text-sm text-muted-foreground">{thresholds.amuUsageThreshold[0]}</span>
                  </div>
                  <Slider
                    value={thresholds.amuUsageThreshold}
                    onValueChange={(value) => setThresholds(prev => ({ ...prev, amuUsageThreshold: value }))}
                    max={200}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Alert when monthly usage exceeds this limit
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Withdrawal Time Buffer (hours)</label>
                    <span className="text-sm text-muted-foreground">{thresholds.withdrawalThreshold[0]}</span>
                  </div>
                  <Slider
                    value={thresholds.withdrawalThreshold}
                    onValueChange={(value) => setThresholds(prev => ({ ...prev, withdrawalThreshold: value }))}
                    max={72}
                    min={12}
                    step={6}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Additional buffer time added to standard withdrawal periods
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage system users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Current Users</h4>
                  <Button variant="outline">Add New User</Button>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Last Login</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Admin User', role: 'Administrator', email: 'admin@gov.in', status: 'Active', lastLogin: '2025-09-29' },
                        { name: 'Inspector Kumar', role: 'Inspector', email: 'kumar@gov.in', status: 'Active', lastLogin: '2025-09-28' },
                        { name: 'Dr. Veterinary Officer', role: 'Veterinary Officer', email: 'vet@gov.in', status: 'Active', lastLogin: '2025-09-27' }
                      ].map((user, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-medium">{user.name}</td>
                          <td className="p-3">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">
                            <Badge className="bg-[#2ECC71] text-white">{user.status}</Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">{user.lastLogin}</td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Configure data retention and backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Data Retention Period (months)</label>
                  <Select 
                    value={systemSettings.dataRetention} 
                    onValueChange={(value) => setSystemSettings(prev => ({ ...prev, dataRetention: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Backup Frequency</label>
                  <Select 
                    value={systemSettings.backupFrequency} 
                    onValueChange={(value) => setSystemSettings(prev => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Maximum File Upload Size (MB)</label>
                  <Input 
                    type="number" 
                    value={systemSettings.maxFileSize}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, maxFileSize: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">API Timeout (seconds)</label>
                  <Input 
                    type="number" 
                    value={systemSettings.apiTimeout}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, apiTimeout: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Session Timeout</label>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Audit Logging</p>
                    <p className="text-xs text-muted-foreground">Log all user actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Save Configuration</p>
              <p className="text-sm text-muted-foreground">
                Changes will be applied immediately after saving
              </p>
            </div>
            <Button onClick={handleSaveSettings} className="bg-[#2ECC71] hover:bg-[#27AE60]">
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}