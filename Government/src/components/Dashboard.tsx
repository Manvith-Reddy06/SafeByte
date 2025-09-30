import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Progress } from './ui/progress'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, Users, Building2, CheckCircle, XCircle, Eye } from 'lucide-react'
import { useTranslation, useRouter } from '../App'

// Mock data
const mockData = {
  kpis: {
    totalFarms: 1247,
    complianceRate: 82,
    activeAlerts: 34,
    withdrawalCompliance: 78
  },
  compliance: {
    compliant: 82,
    nonCompliant: 18
  },
  trends: [
    { date: '2025-09-01', tetracyclines: 45, macrolides: 25, fluoroquinolones: 15 },
    { date: '2025-09-08', tetracyclines: 42, macrolides: 28, fluoroquinolones: 18 },
    { date: '2025-09-15', tetracyclines: 38, macrolides: 30, fluoroquinolones: 22 },
    { date: '2025-09-22', tetracyclines: 35, macrolides: 32, fluoroquinolones: 25 },
    { date: '2025-09-29', tetracyclines: 40, macrolides: 28, fluoroquinolones: 20 }
  ],
  topDrugs: [
    { drug: 'Oxytetracycline', mgUsed: 2840, percent: 35 },
    { drug: 'Enrofloxacin', mgUsed: 2150, percent: 26 },
    { drug: 'Erythromycin', mgUsed: 1680, percent: 21 },
    { drug: 'Doxycycline', mgUsed: 920, percent: 11 },
    { drug: 'Ciprofloxacin', mgUsed: 580, percent: 7 }
  ],
  violations: [
    { farmId: 'FARM-IN-AP-001', species: 'Broiler', drug: 'Enrofloxacin', date: '2025-09-28', withdrawalTime: '3 days', status: 'violation' },
    { farmId: 'FARM-IN-AP-045', species: 'Layer', drug: 'Oxytetracycline', date: '2025-09-27', withdrawalTime: '7 days', status: 'violation' },
    { farmId: 'FARM-IN-AP-089', species: 'Cattle', drug: 'Doxycycline', date: '2025-09-26', withdrawalTime: '5 days', status: 'warning' },
    { farmId: 'FARM-IN-AP-123', species: 'Goat', drug: 'Erythromycin', date: '2025-09-25', withdrawalTime: '4 days', status: 'violation' }
  ],
  recentPrescriptions: [
    { vetCode: 'VET-AP-001', farmId: 'FARM-IN-AP-001', drugs: 'Enrofloxacin, Vitamin B', date: '2025-09-29' },
    { vetCode: 'VET-AP-012', farmId: 'FARM-IN-AP-045', drugs: 'Oxytetracycline', date: '2025-09-28' },
    { vetCode: 'VET-AP-008', farmId: 'FARM-IN-AP-089', drugs: 'Doxycycline, Probiotics', date: '2025-09-28' },
    { vetCode: 'VET-AP-023', farmId: 'FARM-IN-AP-123', drugs: 'Erythromycin', date: '2025-09-27' }
  ],
  regionCompliance: [
    { region: 'Hyderabad', compliance: 85 },
    { region: 'Vijayawada', compliance: 78 },
    { region: 'Visakhapatnam', compliance: 92 },
    { region: 'Tirupati', compliance: 73 },
    { region: 'Guntur', compliance: 80 }
  ]
}

function KPICard({ title, value, trend, trendValue, color, icon: Icon }: {
  title: string
  value: string | number
  trend?: 'up' | 'down'
  trendValue?: number
  color?: 'success' | 'warning' | 'danger'
  icon: React.ElementType
}) {
  const colorClasses = {
    success: 'text-[#2ECC71] bg-[#2ECC71]/10',
    warning: 'text-[#F39C12] bg-[#F39C12]/10',
    danger: 'text-[#E74C3C] bg-[#E74C3C]/10'
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-semibold mt-2">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            {trend && trendValue && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-[#2ECC71]" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-[#E74C3C]" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`}>
                  {trendValue}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color ? colorClasses[color] : 'text-muted-foreground bg-muted'}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const COLORS = ['#2ECC71', '#E74C3C', '#F39C12', '#3498DB', '#9B59B6']

export function Dashboard() {
  const { t } = useTranslation()
  const { navigate } = useRouter()

  const handlePieClick = (data: any) => {
    // Navigate to farms with filter
    navigate('/gov/farms')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Government Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor antimicrobial usage and MRL compliance across registered farms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[#2ECC71]">
            <CheckCircle className="h-3 w-3 mr-1" />
            System Online
          </Badge>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Registered Farms"
          value={mockData.kpis.totalFarms}
          trend="up"
          trendValue={12}
          color="success"
          icon={Building2}
        />
        <KPICard
          title="MRL Compliance Rate"
          value={`${mockData.kpis.complianceRate}%`}
          trend="up"
          trendValue={3}
          color="success"
          icon={CheckCircle}
        />
        <KPICard
          title="Active Alerts"
          value={mockData.kpis.activeAlerts}
          trend="down"
          trendValue={8}
          color="warning"
          icon={AlertTriangle}
        />
        <KPICard
          title="Withdrawal Compliance"
          value={`${mockData.kpis.withdrawalCompliance}%`}
          trend="up"
          trendValue={5}
          color="warning"
          icon={Users}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRL Compliance Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>MRL Compliance Overview</CardTitle>
            <CardDescription>Distribution of compliant vs non-compliant farms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Compliant', value: mockData.compliance.compliant, color: '#2ECC71' },
                    { name: 'Non-Compliant', value: mockData.compliance.nonCompliant, color: '#E74C3C' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  onClick={handlePieClick}
                  style={{ cursor: 'pointer' }}
                >
                  {[
                    { name: 'Compliant', value: mockData.compliance.compliant, color: '#2ECC71' },
                    { name: 'Non-Compliant', value: mockData.compliance.nonCompliant, color: '#E74C3C' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AMU Trends Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Antimicrobial Usage Trends</CardTitle>
            <CardDescription>Weekly usage patterns by drug class (mg/kg)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tetracyclines" stroke="#2ECC71" strokeWidth={2} />
                <Line type="monotone" dataKey="macrolides" stroke="#3498DB" strokeWidth={2} />
                <Line type="monotone" dataKey="fluoroquinolones" stroke="#F39C12" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Drugs Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Used Antimicrobials</CardTitle>
            <CardDescription>Most frequently prescribed drugs by volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.topDrugs} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="drug" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="mgUsed" fill="#3498DB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Compliance</CardTitle>
            <CardDescription>Compliance rates by district</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.regionCompliance.map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{region.region}</span>
                  <span className={region.compliance >= 80 ? 'text-[#2ECC71]' : region.compliance >= 70 ? 'text-[#F39C12]' : 'text-[#E74C3C]'}>
                    {region.compliance}%
                  </span>
                </div>
                <Progress 
                  value={region.compliance} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdrawal Violations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Withdrawal Violations</CardTitle>
            <CardDescription>Farms with withdrawal time compliance issues</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm ID</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Drug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.violations.map((violation, index) => (
                  <TableRow key={index} className={violation.status === 'violation' ? 'bg-[#E74C3C]/5' : 'bg-[#F39C12]/5'}>
                    <TableCell>
                      <Badge variant="outline">{violation.farmId}</Badge>
                    </TableCell>
                    <TableCell>{violation.species}</TableCell>
                    <TableCell>{violation.drug}</TableCell>
                    <TableCell>
                      <Badge variant={violation.status === 'violation' ? 'destructive' : 'secondary'}>
                        {violation.status === 'violation' ? (
                          <XCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {violation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/gov/farm/${violation.farmId}`)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Prescriptions Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>Latest veterinary prescriptions submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentPrescriptions.map((prescription, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[#3498DB]">
                        {prescription.vetCode}
                      </Badge>
                      <Badge variant="outline">
                        {prescription.farmId}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {prescription.drugs}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {prescription.date}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/gov/prescriptions')}>
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vet Verification Card */}
      <Card>
        <CardHeader>
          <CardTitle>Veterinary Verification Status</CardTitle>
          <CardDescription>Current verification status of registered veterinarians</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-[#2ECC71]">87%</p>
                <p className="text-sm text-muted-foreground">Verified Vets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-[#F39C12]">23</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-[#E74C3C]">5</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
            <Button onClick={() => navigate('/gov/vets')}>
              View Vet Registry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}