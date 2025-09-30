import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Progress } from './ui/progress'
import { Search, Filter, Eye, MapPin, Users, Building2 } from 'lucide-react'
import { useRouter } from '../App'

// Mock farms data
const mockFarms = [
  {
    farmId: 'FARM-IN-AP-001',
    owner: 'Ramesh Kumar',
    type: 'Poultry',
    species: 'Broiler',
    location: 'Hyderabad, Telangana',
    compliance: 85,
    status: 'Active',
    lastInspection: '2025-09-15',
    animals: 5000,
    alerts: 2
  },
  {
    farmId: 'FARM-IN-AP-002',
    owner: 'Lakshmi Devi',
    type: 'Dairy',
    species: 'Cattle',
    location: 'Vijayawada, Andhra Pradesh',
    compliance: 92,
    status: 'Active',
    lastInspection: '2025-09-20',
    animals: 150,
    alerts: 0
  },
  {
    farmId: 'FARM-IN-AP-003',
    owner: 'Suresh Reddy',
    type: 'Poultry',
    species: 'Layer',
    location: 'Visakhapatnam, Andhra Pradesh',
    compliance: 78,
    status: 'Active',
    lastInspection: '2025-09-10',
    animals: 8000,
    alerts: 3
  },
  {
    farmId: 'FARM-IN-AP-004',
    owner: 'Krishna Murthy',
    type: 'Goat Farm',
    species: 'Goat',
    location: 'Tirupati, Andhra Pradesh',
    compliance: 67,
    status: 'Under Review',
    lastInspection: '2025-09-05',
    animals: 300,
    alerts: 5
  },
  {
    farmId: 'FARM-IN-AP-005',
    owner: 'Anitha Sharma',
    type: 'Aquaculture',
    species: 'Fish',
    location: 'Guntur, Andhra Pradesh',
    compliance: 89,
    status: 'Active',
    lastInspection: '2025-09-25',
    animals: 50000,
    alerts: 1
  },
  {
    farmId: 'FARM-IN-AP-006',
    owner: 'Venkata Rao',
    type: 'Poultry',
    species: 'Broiler',
    location: 'Hyderabad, Telangana',
    compliance: 73,
    status: 'Active',
    lastInspection: '2025-09-12',
    animals: 3500,
    alerts: 4
  },
  {
    farmId: 'FARM-IN-AP-007',
    owner: 'Madhavi Latha',
    type: 'Dairy',
    species: 'Buffalo',
    location: 'Vijayawada, Andhra Pradesh',
    compliance: 95,
    status: 'Active',
    lastInspection: '2025-09-28',
    animals: 200,
    alerts: 0
  },
  {
    farmId: 'FARM-IN-AP-008',
    owner: 'Rajesh Babu',
    type: 'Sheep Farm',
    species: 'Sheep',
    location: 'Visakhapatnam, Andhra Pradesh',
    compliance: 81,
    status: 'Active',
    lastInspection: '2025-09-18',
    animals: 500,
    alerts: 2
  }
]

export function FarmsList() {
  const { navigate } = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter farms based on search and filters
  const filteredFarms = mockFarms.filter(farm => {
    const matchesSearch = farm.farmId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || farm.type.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesStatus = statusFilter === 'all' || farm.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredFarms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFarms = filteredFarms.slice(startIndex, startIndex + itemsPerPage)

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 85) return 'text-[#2ECC71]'
    if (compliance >= 70) return 'text-[#F39C12]'
    return 'text-[#E74C3C]'
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-[#2ECC71] text-white">Active</Badge>
      case 'under review':
        return <Badge className="bg-[#F39C12] text-white">Under Review</Badge>
      case 'suspended':
        return <Badge className="bg-[#E74C3C] text-white">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Registered Farms</h1>
          <p className="text-muted-foreground">
            Monitor and manage all registered livestock and poultry farms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {filteredFarms.length} farms found
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-[#2ECC71]" />
              <div>
                <p className="text-2xl font-semibold">{mockFarms.length}</p>
                <p className="text-sm text-muted-foreground">Total Farms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-[#3498DB]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockFarms.reduce((sum, farm) => sum + farm.animals, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Animals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#2ECC71] flex items-center justify-center text-white">
                ✓
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {Math.round(mockFarms.reduce((sum, farm) => sum + farm.compliance, 0) / mockFarms.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Compliance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#E74C3C] flex items-center justify-center text-white">
                !
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {mockFarms.reduce((sum, farm) => sum + farm.alerts, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
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
                  placeholder="Search by Farm ID, Owner, or Location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Farm Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="poultry">Poultry</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="goat">Goat Farm</SelectItem>
                <SelectItem value="sheep">Sheep Farm</SelectItem>
                <SelectItem value="aquaculture">Aquaculture</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Farms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Directory</CardTitle>
          <CardDescription>Complete list of registered farms with compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farm ID</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Animals</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFarms.map((farm) => (
                <TableRow key={farm.farmId}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {farm.farmId}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{farm.owner}</p>
                      <p className="text-sm text-muted-foreground">{farm.species}</p>
                    </div>
                  </TableCell>
                  <TableCell>{farm.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{farm.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{farm.animals.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getComplianceColor(farm.compliance)}`}>
                          {farm.compliance}%
                        </span>
                      </div>
                      <Progress value={farm.compliance} className="h-1 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(farm.status)}</TableCell>
                  <TableCell>
                    {farm.alerts > 0 ? (
                      <Badge variant="destructive">{farm.alerts}</Badge>
                    ) : (
                      <Badge variant="secondary">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/gov/farm/${farm.farmId}`)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFarms.length)} of {filteredFarms.length} farms
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