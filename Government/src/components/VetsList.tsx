import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users,
  FileText,
  AlertTriangle,
  Download,
  UserCheck
} from 'lucide-react'

// Mock vets data
const mockVets = [
  {
    vetCode: 'VET-AP-001',
    name: 'Dr. Sita Reddy',
    qualification: 'B.V.Sc & A.H',
    specialization: 'Poultry Medicine',
    clinic: 'Hyderabad Veterinary Clinic',
    location: 'Hyderabad, Telangana',
    licenseNumber: 'AP-VET-2020-001',
    registrationDate: '2020-03-15',
    contact: '+91 9876543210',
    email: 'sita.reddy@vet.com',
    status: 'verified',
    prescriptionsCount: 145,
    farmsCount: 23,
    lastActivity: '2025-09-29',
    flaggedCases: 2
  },
  {
    vetCode: 'VET-AP-002',
    name: 'Dr. Rajesh Kumar',
    qualification: 'B.V.Sc & A.H, M.V.Sc',
    specialization: 'Large Animal Practice',
    clinic: 'Rural Veterinary Services',
    location: 'Vijayawada, Andhra Pradesh',
    licenseNumber: 'AP-VET-2019-045',
    registrationDate: '2019-07-22',
    contact: '+91 9876543211',
    email: 'rajesh.kumar@vet.com',
    status: 'verified',
    prescriptionsCount: 289,
    farmsCount: 41,
    lastActivity: '2025-09-28',
    flaggedCases: 0
  },
  {
    vetCode: 'VET-AP-003',
    name: 'Dr. Lakshmi Prasad',
    qualification: 'B.V.Sc & A.H',
    specialization: 'Aquaculture Medicine',
    clinic: 'Coastal Aqua Vet Services',
    location: 'Visakhapatnam, Andhra Pradesh',
    licenseNumber: 'AP-VET-2021-089',
    registrationDate: '2021-11-10',
    contact: '+91 9876543212',
    email: 'lakshmi.prasad@vet.com',
    status: 'pending',
    prescriptionsCount: 67,
    farmsCount: 12,
    lastActivity: '2025-09-25',
    flaggedCases: 1
  },
  {
    vetCode: 'VET-AP-004',
    name: 'Dr. Venkat Rao',
    qualification: 'B.V.Sc & A.H',
    specialization: 'Small Ruminant Medicine',
    clinic: 'Tirupati Animal Hospital',
    location: 'Tirupati, Andhra Pradesh',
    licenseNumber: 'AP-VET-2022-134',
    registrationDate: '2022-04-18',
    contact: '+91 9876543213',
    email: 'venkat.rao@vet.com',
    status: 'rejected',
    prescriptionsCount: 12,
    farmsCount: 3,
    lastActivity: '2025-09-20',
    flaggedCases: 8
  },
  {
    vetCode: 'VET-AP-005',
    name: 'Dr. Anitha Sharma',
    qualification: 'B.V.Sc & A.H, Ph.D',
    specialization: 'Veterinary Pharmacology',
    clinic: 'Advanced Vet Care Center',
    location: 'Guntur, Andhra Pradesh',
    licenseNumber: 'AP-VET-2023-067',
    registrationDate: '2023-01-25',
    contact: '+91 9876543214',
    email: 'anitha.sharma@vet.com',
    status: 'verified',
    prescriptionsCount: 201,
    farmsCount: 35,
    lastActivity: '2025-09-29',
    flaggedCases: 1
  }
]

export function VetsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedVet, setSelectedVet] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter vets based on search and filters
  const filteredVets = mockVets.filter(vet => {
    const matchesSearch = vet.vetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vet.clinic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || vet.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredVets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVets = filteredVets.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-[#2ECC71] text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      case 'pending':
        return <Badge className="bg-[#F39C12] text-white">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      case 'rejected':
        return <Badge className="bg-[#E74C3C] text-white">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleVerifyVet = (vetCode: string, action: 'approve' | 'reject') => {
    // Mock verification action
    console.log(`${action} vet ${vetCode}`)
    setSelectedVet(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Veterinary Registry</h1>
          <p className="text-muted-foreground">
            Manage and verify registered veterinarians and their credentials
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {filteredVets.length} veterinarians
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-[#2ECC71]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockVets.filter(v => v.status === 'verified').length}
                </p>
                <p className="text-sm text-muted-foreground">Verified Vets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-[#F39C12]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockVets.filter(v => v.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-[#3498DB]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockVets.reduce((sum, vet) => sum + vet.prescriptionsCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Prescriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-[#E74C3C]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockVets.reduce((sum, vet) => sum + vet.flaggedCases, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Flagged Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Vet Code, Name, or Clinic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Veterinary Directory</CardTitle>
          <CardDescription>Complete list of registered veterinarians</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vet Code</TableHead>
                <TableHead>Name & Qualification</TableHead>
                <TableHead>Clinic & Location</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVets.map((vet) => (
                <TableRow key={vet.vetCode}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {vet.vetCode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vet.name}</p>
                      <p className="text-sm text-muted-foreground">{vet.qualification}</p>
                      <p className="text-xs text-muted-foreground">{vet.specialization}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{vet.clinic}</p>
                      <p className="text-sm text-muted-foreground">{vet.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{vet.prescriptionsCount} prescriptions</p>
                      <p className="text-muted-foreground">{vet.farmsCount} farms</p>
                      <p className="text-muted-foreground">Last: {vet.lastActivity}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(vet.status)}</TableCell>
                  <TableCell>
                    {vet.flaggedCases > 0 ? (
                      <Badge variant="destructive">{vet.flaggedCases}</Badge>
                    ) : (
                      <Badge variant="secondary">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedVet(vet)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Veterinarian Details - {vet.vetCode}</DialogTitle>
                            <DialogDescription>
                              Complete profile and verification status for {vet.name}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedVet && (
                            <Tabs defaultValue="profile" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                <TabsTrigger value="activity">Activity</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="profile" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-3">Personal Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Name:</span>
                                        <span>{selectedVet.name}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Qualification:</span>
                                        <span>{selectedVet.qualification}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Specialization:</span>
                                        <span>{selectedVet.specialization}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Contact:</span>
                                        <span>{selectedVet.contact}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Email:</span>
                                        <span>{selectedVet.email}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-3">Practice Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Clinic:</span>
                                        <span>{selectedVet.clinic}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Location:</span>
                                        <span>{selectedVet.location}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">License:</span>
                                        <span>{selectedVet.licenseNumber}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Registered:</span>
                                        <span>{selectedVet.registrationDate}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status:</span>
                                        {getStatusBadge(selectedVet.status)}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {selectedVet.status === 'pending' && (
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button 
                                      className="flex-1 bg-[#2ECC71] hover:bg-[#27AE60]"
                                      onClick={() => handleVerifyVet(selectedVet.vetCode, 'approve')}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      className="flex-1"
                                      onClick={() => handleVerifyVet(selectedVet.vetCode, 'reject')}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </TabsContent>
                              
                              <TabsContent value="documents" className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                      <p className="font-medium">Veterinary Degree Certificate</p>
                                      <p className="text-sm text-muted-foreground">B.V.Sc & A.H - Uploaded 2023-01-20</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                  
                                  <div className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                      <p className="font-medium">Practice License</p>
                                      <p className="text-sm text-muted-foreground">{selectedVet.licenseNumber} - Valid until 2026</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                  
                                  <div className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                      <p className="font-medium">Identity Proof</p>
                                      <p className="text-sm text-muted-foreground">Aadhaar Card - Verified</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="activity" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <h4 className="font-medium mb-2">Prescription Statistics</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>Total Prescriptions:</span>
                                          <span className="font-medium">{selectedVet.prescriptionsCount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Active Farms:</span>
                                          <span className="font-medium">{selectedVet.farmsCount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Flagged Cases:</span>
                                          <span className="font-medium text-[#E74C3C]">{selectedVet.flaggedCases}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Last Activity:</span>
                                          <span className="font-medium">{selectedVet.lastActivity}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  
                                  <Card>
                                    <CardContent className="p-4">
                                      <h4 className="font-medium mb-2">Recent Prescriptions</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="p-2 bg-muted/50 rounded">
                                          <p>FARM-IN-AP-001 - Oxytetracycline</p>
                                          <p className="text-muted-foreground">2025-09-29</p>
                                        </div>
                                        <div className="p-2 bg-muted/50 rounded">
                                          <p>FARM-IN-AP-045 - Enrofloxacin</p>
                                          <p className="text-muted-foreground">2025-09-27</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {vet.status === 'pending' && (
                        <Button 
                          size="sm" 
                          className="bg-[#2ECC71] hover:bg-[#27AE60]"
                          onClick={() => handleVerifyVet(vet.vetCode, 'approve')}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVets.length)} of {filteredVets.length} veterinarians
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}