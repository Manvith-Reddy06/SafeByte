import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Download,
  Send,
  Flag
} from 'lucide-react'
import { useRouter } from '../App'

// Mock farm detail data
const mockFarmDetail = {
  farmId: 'FARM-IN-AP-001',
  owner: 'Ramesh Kumar',
  type: 'Poultry Farm',
  species: 'Broiler Chickens',
  location: 'Plot 45, Shamshabad, Hyderabad, Telangana - 501218',
  registrationDate: '2023-03-15',
  licenseNumber: 'AP-POULTRY-2023-001',
  contact: '+91 9876543210',
  email: 'ramesh.kumar@example.com',
  capacity: 5000,
  currentStock: 4850,
  compliance: 85,
  status: 'Active',
  lastInspection: '2025-09-15',
  nextInspection: '2025-12-15',
  veterinarian: 'Dr. Sita Reddy (VET-AP-001)',
  
  // AMU History
  amuHistory: [
    {
      date: '2025-09-25',
      drug: 'Oxytetracycline',
      dosage: '10mg/kg',
      duration: '5 days',
      prescribedBy: 'VET-AP-001',
      reason: 'Respiratory infection',
      withdrawalTime: '7 days',
      status: 'completed'
    },
    {
      date: '2025-09-10',
      drug: 'Enrofloxacin',
      dosage: '5mg/kg',
      duration: '3 days',
      prescribedBy: 'VET-AP-001',
      reason: 'Digestive disorder',
      withdrawalTime: '5 days',
      status: 'violation'
    },
    {
      date: '2025-08-28',
      drug: 'Erythromycin',
      dosage: '15mg/kg',
      duration: '4 days',
      prescribedBy: 'VET-AP-012',
      reason: 'Preventive treatment',
      withdrawalTime: '6 days',
      status: 'completed'
    }
  ],

  // Drug usage by class
  drugClassUsage: [
    { month: 'May', tetracyclines: 120, macrolides: 80, fluoroquinolones: 45 },
    { month: 'Jun', tetracyclines: 95, macrolides: 90, fluoroquinolones: 30 },
    { month: 'Jul', tetracyclines: 110, macrolides: 70, fluoroquinolones: 35 },
    { month: 'Aug', tetracyclines: 85, macrolides: 85, fluoroquinolones: 40 },
    { month: 'Sep', tetracyclines: 100, macrolides: 75, fluoroquinolones: 25 }
  ],

  // Prescriptions
  prescriptions: [
    {
      id: 'RX-2025-001',
      date: '2025-09-25',
      veterinarian: 'Dr. Sita Reddy',
      vetCode: 'VET-AP-001',
      drugs: 'Oxytetracycline 10mg/kg, Vitamin B Complex',
      diagnosis: 'Mild respiratory symptoms in batch #45',
      ocrText: 'Rx: Oxytetracycline 10mg/kg BID x 5 days...',
      status: 'verified',
      confidence: 95
    },
    {
      id: 'RX-2025-002',
      date: '2025-09-10',
      veterinarian: 'Dr. Sita Reddy',
      vetCode: 'VET-AP-001',
      drugs: 'Enrofloxacin 5mg/kg',
      diagnosis: 'Digestive disorder',
      ocrText: 'Rx: Enrofloxacin 5mg/kg SID x 3 days...',
      status: 'flagged',
      confidence: 88
    }
  ],

  // Alerts
  alerts: [
    {
      id: 'ALERT-001',
      type: 'Withdrawal Violation',
      severity: 'high',
      date: '2025-09-12',
      description: 'Enrofloxacin withdrawal time not observed. Products harvested 2 days early.',
      action: 'Issue warning letter',
      status: 'pending'
    },
    {
      id: 'ALERT-002',
      type: 'Unusual Usage Pattern',
      severity: 'medium',
      date: '2025-09-08',
      description: 'Higher than normal fluoroquinolone usage detected.',
      action: 'Schedule inspection',
      status: 'resolved'
    }
  ]
}

export function FarmDetail() {
  const { navigate } = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [warningText, setWarningText] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[#2ECC71]'
      case 'violation':
        return 'text-[#E74C3C]'
      case 'warning':
        return 'text-[#F39C12]'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-[#2ECC71] text-white">Completed</Badge>
      case 'violation':
        return <Badge className="bg-[#E74C3C] text-white">Violation</Badge>
      case 'warning':
        return <Badge className="bg-[#F39C12] text-white">Warning</Badge>
      case 'verified':
        return <Badge className="bg-[#2ECC71] text-white">Verified</Badge>
      case 'flagged':
        return <Badge className="bg-[#E74C3C] text-white">Flagged</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-[#E74C3C] text-white">High</Badge>
      case 'medium':
        return <Badge className="bg-[#F39C12] text-white">Medium</Badge>
      case 'low':
        return <Badge className="bg-[#2ECC71] text-white">Low</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/gov/farms')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Farms
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-lg px-3 py-1">
              {mockFarmDetail.farmId}
            </Badge>
            <h1>{mockFarmDetail.type}</h1>
            {mockFarmDetail.status === 'Active' && (
              <Badge className="bg-[#2ECC71] text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                {mockFarmDetail.status}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Owned by {mockFarmDetail.owner} • Last inspected {mockFarmDetail.lastInspection}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
                <p className="text-2xl font-semibold text-[#2ECC71]">{mockFarmDetail.compliance}%</p>
              </div>
              <Progress value={mockFarmDetail.compliance} className="w-16 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-[#3498DB]" />
              <div>
                <p className="text-sm text-muted-foreground">Current Stock</p>
                <p className="text-xl font-semibold">{mockFarmDetail.currentStock.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-[#E74C3C]" />
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-xl font-semibold">{mockFarmDetail.alerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-[#F39C12]" />
              <div>
                <p className="text-sm text-muted-foreground">Next Inspection</p>
                <p className="text-sm font-medium">{mockFarmDetail.nextInspection}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="amu-history">AMU History</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Farm Information */}
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>Basic details and registration information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{mockFarmDetail.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Species</p>
                    <p className="font-medium">{mockFarmDetail.species}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">License Number</p>
                    <p className="font-medium font-mono">{mockFarmDetail.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{mockFarmDetail.capacity.toLocaleString()} birds</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{mockFarmDetail.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="text-sm">{mockFarmDetail.contact}</p>
                    <p className="text-sm">{mockFarmDetail.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Veterinarian</p>
                    <p className="text-sm">{mockFarmDetail.veterinarian}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Summary</CardTitle>
                <CardDescription>Current compliance status and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Compliance</span>
                    <span className="font-medium text-[#2ECC71]">{mockFarmDetail.compliance}%</span>
                  </div>
                  <Progress value={mockFarmDetail.compliance} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-[#2ECC71]/10 rounded-lg">
                    <p className="text-2xl font-semibold text-[#2ECC71]">12</p>
                    <p className="text-sm text-muted-foreground">Compliant Treatments</p>
                  </div>
                  <div className="p-3 bg-[#E74C3C]/10 rounded-lg">
                    <p className="text-2xl font-semibold text-[#E74C3C]">3</p>
                    <p className="text-sm text-muted-foreground">Violations</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Withdrawal Compliance</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Documentation Score</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Prescription Accuracy</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="amu-history" className="space-y-6">
          {/* Drug Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Drug Usage by Class</CardTitle>
              <CardDescription>Monthly antimicrobial usage patterns (mg/kg)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockFarmDetail.drugClassUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tetracyclines" fill="#2ECC71" />
                  <Bar dataKey="macrolides" fill="#3498DB" />
                  <Bar dataKey="fluoroquinolones" fill="#F39C12" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Treatment History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment History</CardTitle>
              <CardDescription>Complete record of antimicrobial treatments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Drug</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Prescribed By</TableHead>
                    <TableHead>Withdrawal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFarmDetail.amuHistory.map((treatment, index) => (
                    <TableRow key={index} className={treatment.status === 'violation' ? 'bg-[#E74C3C]/5' : ''}>
                      <TableCell>{treatment.date}</TableCell>
                      <TableCell className="font-medium">{treatment.drug}</TableCell>
                      <TableCell>{treatment.dosage}</TableCell>
                      <TableCell>{treatment.duration}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{treatment.prescribedBy}</Badge>
                      </TableCell>
                      <TableCell>{treatment.withdrawalTime}</TableCell>
                      <TableCell>{getStatusBadge(treatment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Records</CardTitle>
              <CardDescription>Veterinary prescriptions with OCR verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockFarmDetail.prescriptions.map((prescription) => (
                <div key={prescription.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{prescription.id}</Badge>
                      <Badge variant="outline" className="text-[#3498DB]">
                        {prescription.vetCode}
                      </Badge>
                      {getStatusBadge(prescription.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Veterinarian</p>
                      <p className="font-medium">{prescription.date} - {prescription.veterinarian}</p>
                      
                      <p className="text-sm text-muted-foreground mt-2">Prescribed Drugs</p>
                      <p className="text-sm">{prescription.drugs}</p>
                      
                      <p className="text-sm text-muted-foreground mt-2">Diagnosis</p>
                      <p className="text-sm">{prescription.diagnosis}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">OCR Extracted Text</p>
                      <div className="bg-muted/50 p-3 rounded text-sm font-mono">
                        {prescription.ocrText}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Confidence: {prescription.confidence}%
                        </span>
                        {prescription.status === 'flagged' && (
                          <Button variant="outline" size="sm">
                            <Flag className="h-3 w-3 mr-1" />
                            Review Flag
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Current compliance issues and warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockFarmDetail.alerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#F39C12]" />
                        <span className="font-medium">{alert.type}</span>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <Badge variant="outline">{alert.id}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {alert.date}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {alert.status === 'pending' && (
                          <Button size="sm" className="bg-[#E74C3C] hover:bg-[#C0392B]">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Actions</CardTitle>
                <CardDescription>Issue warnings and enforcement actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#F39C12] hover:bg-[#E67E22]">
                      <Send className="h-4 w-4 mr-2" />
                      Issue Warning Letter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Issue Warning Letter</DialogTitle>
                      <DialogDescription>
                        Send an official warning to {mockFarmDetail.owner} regarding compliance violations.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Warning Details</label>
                        <Textarea
                          placeholder="Describe the violation and required corrective actions..."
                          value={warningText}
                          onChange={(e) => setWarningText(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Send Warning</Button>
                        <Button variant="outline" className="flex-1">Save Draft</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </Button>

                <Button variant="outline" className="w-full">
                  <Flag className="h-4 w-4 mr-2" />
                  Suspend License
                </Button>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-3">Recent Actions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Warning issued for withdrawal violation</span>
                      <span className="text-muted-foreground">2025-09-12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inspection scheduled</span>
                      <span className="text-muted-foreground">2025-09-08</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}