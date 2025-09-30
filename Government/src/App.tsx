import { useState, createContext, useContext } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './components/ui/sidebar'
import { Button } from './components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Input } from './components/ui/input'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { FarmsList } from './components/FarmsList'
import { FarmDetail } from './components/FarmDetail'
import { VetsList } from './components/VetsList'
import { PrescriptionsList } from './components/PrescriptionsList'
import { Reports } from './components/Reports'
import { Settings } from './components/Settings'
import { 
  BarChart3, 
  Building2, 
  Users, 
  FileText, 
  Settings as SettingsIcon, 
  Search,
  Calendar,
  LogOut,
  Shield,
  Menu
} from 'lucide-react'

// Translation context
const TranslationContext = createContext({
  t: (key: string) => key,
  language: 'en',
  setLanguage: (lang: string) => {}
})

export const useTranslation = () => useContext(TranslationContext)

// Mock translations
const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.farms': 'Farms',
    'nav.vets': 'Veterinarians',
    'nav.prescriptions': 'Prescriptions',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'header.search': 'Search farms, vets, prescriptions...',
    'header.dateFilter': 'Date Filter',
    'dashboard.title': 'Government Monitoring Dashboard'
  },
  te: {
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.farms': 'పొలములు',
    'nav.vets': 'పశు వైద్యులు',
    'nav.prescriptions': 'ప్రిస్క్రిప్షన్స్',
    'nav.reports': 'రిపోర్టులు',
    'nav.settings': 'సెట్టింగులు',
    'header.search': 'పొలములు, వైద్యులు, ప్రిస్క్రిప్షన్లను వెతకండి...',
    'header.dateFilter': 'తేదీ ఫిల్టర్',
    'dashboard.title': 'ప్రభుత్వ పర్యవేక్షణ డాష్‌బోర్డ్'
  }
}

// Router context
const RouterContext = createContext({
  currentRoute: '/gov/dashboard',
  navigate: (route: string) => {},
  params: {} as Record<string, string>
})

export const useRouter = () => useContext(RouterContext)

// Auth context
const AuthContext = createContext({
  user: null as any,
  login: (credentials: any) => {},
  logout: () => {},
  isAuthenticated: false
})

export const useAuth = () => useContext(AuthContext)

function AppLayout({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage } = useTranslation()
  const { currentRoute, navigate } = useRouter()
  const { logout, user } = useAuth()

  const navigation = [
    { id: 'dashboard', href: '/gov/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { id: 'farms', href: '/gov/farms', label: t('nav.farms'), icon: Building2 },
    { id: 'vets', href: '/gov/vets', label: t('nav.vets'), icon: Users },
    { id: 'prescriptions', href: '/gov/prescriptions', label: t('nav.prescriptions'), icon: FileText },
    { id: 'reports', href: '/gov/reports', label: t('nav.reports'), icon: BarChart3 },
    { id: 'settings', href: '/gov/settings', label: t('nav.settings'), icon: SettingsIcon }
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-[#2ECC71]" />
              <div>
                <h2 className="font-medium">AMU Monitor</h2>
                <p className="text-sm text-muted-foreground">Gov Authority</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.href)}
                    className={currentRoute === item.href ? 'bg-sidebar-accent' : ''}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#2ECC71] flex items-center justify-center text-white text-sm">
                  {user?.name?.[0] || 'A'}
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || 'Inspector'}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border bg-background px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div className="flex items-center gap-2 max-w-md flex-1">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={t('header.search')}
                    className="border-0 bg-muted/50"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    className="w-40"
                    defaultValue="2025-09-29"
                  />
                </div>
                
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="te">తెలుగు</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-[#FAFBFC] p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/gov/dashboard')
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  const navigate = (route: string) => {
    setCurrentRoute(route)
  }

  // Parse params from route (simple implementation)
  const params = currentRoute.split('/').reduce((acc, part, index, arr) => {
    if (part.startsWith(':') || (arr[index - 1] && arr[index - 1].includes(':'))) {
      const key = arr[index - 1]?.replace(':', '') || 'id'
      acc[key] = part
    }
    return acc
  }, {} as Record<string, string>)

  const login = (credentials: { username: string; password: string; role: string }) => {
    // Mock login
    setUser({
      name: credentials.username,
      role: credentials.role,
      id: '1'
    })
    setIsAuthenticated(true)
    navigate('/gov/dashboard')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    navigate('/gov/login')
  }

  // Route rendering
  const renderRoute = () => {
    if (!isAuthenticated && currentRoute !== '/gov/login') {
      return <Login />
    }

    switch (true) {
      case currentRoute === '/gov/login':
        return <Login />
      case currentRoute === '/gov/dashboard':
        return <Dashboard />
      case currentRoute === '/gov/farms':
        return <FarmsList />
      case currentRoute.startsWith('/gov/farm/'):
        return <FarmDetail />
      case currentRoute === '/gov/vets':
        return <VetsList />
      case currentRoute === '/gov/prescriptions':
        return <PrescriptionsList />
      case currentRoute === '/gov/reports':
        return <Reports />
      case currentRoute === '/gov/settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      <RouterContext.Provider value={{ currentRoute, navigate, params }}>
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
          {isAuthenticated && currentRoute !== '/gov/login' ? (
            <AppLayout>
              {renderRoute()}
            </AppLayout>
          ) : (
            renderRoute()
          )}
        </AuthContext.Provider>
      </RouterContext.Provider>
    </TranslationContext.Provider>
  )
}