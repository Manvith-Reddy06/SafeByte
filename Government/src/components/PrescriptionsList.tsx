import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Flag, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Camera,
  MessageSquare
} from 'lucide-react'

// Mock prescriptions data
const mockPrescriptions = [
  {
    id: 'RX-2025-001',
    farmId: 'FARM-IN-AP-001',
    vetCode: 'VET-AP-001',
    veterinarian: 'Dr. Sita Reddy',
    date: '2025-09-29',
    submissionTime: '14:30',
    drugs: 'Oxytetracycline 10mg/kg, Vitamin B Complex',
    diagnosis: 'Mild respiratory symptoms in batch #45',
    species: 'Broiler Chickens',
    animalCount: 500,
    treatmentDuration: '5 days',
    withdrawalTime: '7 days',
    status: 'verified',
    ocrConfidence: 95,
    ocrText: `Rx: Oxytetracycline 10mg/kg BID x 5 days
Vitamin B Complex 1ml/10kg daily
Withdrawal time: 7 days
Diagnosis: Respiratory infection`,
    flagReason: null,
    reviewerNotes: 'Clear prescription, proper dosage'
  },
  {
    id: 'RX-2025-002',
    farmId: 'FARM-IN-AP-045',
    vetCode: 'VET-AP-001',
    veterinarian: 'Dr. Sita Reddy',
    date: '2025-09-28',
    submissionTime: '11:15',
    drugs: 'Enrofloxacin 5mg/kg',
    diagnosis: 'Digestive disorder',
    species: 'Layer Hens',
    animalCount: 200,
    treatmentDuration: '3 days',
    withdrawalTime: '5 days',
    status: 'flagged',
    ocrConfidence: 88,
    ocrText: `Rx: Enrofloxacin 5mg/kg SID x 3 days
Withdrawal time: 5 days
Diagnosis: Digestive issues`,
    flagReason: 'Fluoroquinolone usage requires additional justification',
    reviewerNotes: null
  },
  {
    id: 'RX-2025-003',
    farmId: 'FARM-IN-AP-089',
    vetCode: 'VET-AP-012',
    veterinarian: 'Dr. Rajesh Kumar',
    date: '2025-09-27',
    submissionTime: '16:45',
    drugs: 'Doxycycline 15mg/kg, Probiotics',
    diagnosis: 'Preventive treatment during stress period',
    species: 'Cattle',
    animalCount: 25,
    treatmentDuration: '4 days',
    withdrawalTime: '6 days',
    status: 'pending',
    ocrConfidence: 92,
    ocrText: `Rx: Doxycycline 15mg/kg BID x 4 days
Probiotics 5g/animal daily
Withdrawal time: 6 days
Indication: Stress prevention`,
    flagReason: null,
    reviewerNotes: null
  },
  {
    id: 'RX-2025-004',
    farmId: 'FARM-IN-AP-123',
    vetCode: 'VET-AP-008',
    veterinarian: 'Dr. Venkat Rao',
    date: '2025-09-26',
    submissionTime: '09:20',
    drugs: 'Erythromycin 20mg/kg',
    diagnosis: 'Respiratory infection',
    species: 'Goats',
    animalCount: 15,
    treatmentDuration: '4 days',
    withdrawalTime: '4 days',
    status: 'rejected',
    ocrConfidence: 76,
    ocrText: `Rx: Erythromycin 20mg/kg BID x 4 days
Withdrawal time: 4 days
Diagnosis: Respiratory infection`,
    flagReason: 'Insufficient withdrawal time for erythromycin',
    reviewerNotes: 'Minimum 6 days withdrawal required'
  },
  {
    id: 'RX-2025-005',
    farmId: 'FARM-IN-AP-234',
    vetCode: 'VET-AP-023',
    veterinarian: 'Dr. Anitha Sharma',
    date: '2025-09-25',
    submissionTime: '13:10',
    drugs: 'Amoxicillin 15mg/kg, Multivitamins',
    diagnosis: 'Bacterial infection treatment',
    species: 'Pigs',
    animalCount: 30,
    treatmentDuration: '5 days',
    withdrawalTime: '8 days',
    status: 'verified',
    ocrConfidence: 94,
    ocrText: `Rx: Amoxicillin 15mg/kg BID x 5 days
Multivitamins 2ml/10kg daily
Withdrawal time: 8 days
Diagnosis: Bacterial infection`,
    flagReason: null,
    reviewerNotes: 'Appropriate treatment protocol followed'
  }
]

export function PrescriptionsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null)
  const [queryText, setQueryText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter prescriptions based on search and filters
  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.farmId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.vetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter
    const matchesDate = !dateFilter || prescription.date.includes(dateFilter)
    
    return matchesSearch && matchesStatus && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrescriptions = filteredPrescriptions.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-[#2ECC71] text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      case 'flagged':
        return <Badge className="bg-[#E74C3C] text-white">
          <Flag className="h-3 w-3 mr-1" />
          Flagged
        </Badge>
      case 'pending':
        return <Badge className="bg-[#F39C12] text-white">
          <AlertTriangle className="h-3 w-3 mr-1" />
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-[#2ECC71]'
    if (confidence >= 75) return 'text-[#F39C12]'
    return 'text-[#E74C3C]'
  }

  const handleActionOnPrescription = (prescriptionId: string, action: 'verify' | 'flag' | 'reject') => {
    // Mock action
    console.log(`${action} prescription ${prescriptionId}`)
    setSelectedPrescription(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Prescription Explorer</h1>
          <p className="text-muted-foreground">
            Review, verify, and manage veterinary prescriptions with OCR analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {filteredPrescriptions.length} prescriptions found
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-[#2ECC71]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockPrescriptions.filter(p => p.status === 'verified').length}
                </p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flag className="h-8 w-8 text-[#E74C3C]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockPrescriptions.filter(p => p.status === 'flagged').length}
                </p>
                <p className="text-sm text-muted-foreground">Flagged</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-[#F39C12]" />
              <div>
                <p className="text-2xl font-semibold">
                  {mockPrescriptions.filter(p => p.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Camera className="h-8 w-8 text-[#3498DB]" />
              <div>
                <p className="text-2xl font-semibold">
                  {Math.round(mockPrescriptions.reduce((sum, p) => sum + p.ocrConfidence, 0) / mockPrescriptions.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg OCR Accuracy</p>
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
                  placeholder="Search by Rx ID, Farm ID, Vet Code, or Veterinarian..."
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
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-48"
            />

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Grid */}
      <div className="grid gap-6">
        {paginatedPrescriptions.map((prescription) => (
          <Card key={prescription.id} className={`${
            prescription.status === 'flagged' ? 'border-[#E74C3C]' : 
            prescription.status === 'rejected' ? 'border-[#E74C3C]' : ''
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {prescription.id}
                  </Badge>
                  <Badge variant="outline" className="text-[#3498DB]">
                    {prescription.vetCode}
                  </Badge>
                  <Badge variant="outline">
                    {prescription.farmId}
                  </Badge>
                  {getStatusBadge(prescription.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {prescription.date} • {prescription.submissionTime}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Veterinarian</p>
                    <p className="font-medium">{prescription.veterinarian}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Species & Count</p>
                    <p className="text-sm">{prescription.species} ({prescription.animalCount} animals)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diagnosis</p>
                    <p className="text-sm">{prescription.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Treatment Duration</p>
                    <p className="text-sm">{prescription.treatmentDuration} • Withdrawal: {prescription.withdrawalTime}</p>
                  </div>
                </div>

                {/* Prescribed Drugs */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Prescribed Drugs</p>
                    <p className="text-sm font-medium">{prescription.drugs}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">OCR Confidence</p>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getConfidenceColor(prescription.ocrConfidence)}`}>
                        {prescription.ocrConfidence}%
                      </span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            prescription.ocrConfidence >= 90 ? 'bg-[#2ECC71]' :
                            prescription.ocrConfidence >= 75 ? 'bg-[#F39C12]' : 'bg-[#E74C3C]'
                          }`}
                          style={{ width: `${prescription.ocrConfidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  {prescription.flagReason && (
                    <div>
                      <p className="text-sm text-muted-foreground">Flag Reason</p>
                      <p className="text-sm text-[#E74C3C]">{prescription.flagReason}</p>
                    </div>
                  )}
                  {prescription.reviewerNotes && (
                    <div>
                      <p className="text-sm text-muted-foreground">Reviewer Notes</p>
                      <p className="text-sm text-[#2ECC71]">{prescription.reviewerNotes}</p>
                    </div>
                  )}
                </div>

                {/* OCR Text & Actions */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">OCR Extracted Text</p>
                    <div className="bg-muted/50 p-3 rounded text-xs font-mono whitespace-pre-line">
                      {prescription.ocrText}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-3 w-3 mr-1" />
                          View Full Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Prescription Details - {prescription.id}</DialogTitle>
                          <DialogDescription>
                            Complete prescription information with OCR analysis
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Prescription Image</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="aspect-video bg-muted/50 rounded flex items-center justify-center">
                                  <div className="text-center">
                                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">Prescription Image</p>
                                    <p className="text-xs text-muted-foreground">Click to view full size</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">OCR Analysis</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Extracted Text</p>
                                    <div className="bg-muted/50 p-3 rounded text-sm font-mono whitespace-pre-line">
                                      {prescription.ocrText}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Confidence Score</p>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-medium ${getConfidenceColor(prescription.ocrConfidence)}`}>
                                        {prescription.ocrConfidence}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Actions</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                {prescription.status === 'pending' && (
                                  <>
                                    <Button 
                                      className="w-full bg-[#2ECC71] hover:bg-[#27AE60]"
                                      onClick={() => handleActionOnPrescription(prescription.id, 'verify')}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Verify Prescription
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      className="w-full"
                                      onClick={() => handleActionOnPrescription(prescription.id, 'flag')}
                                    >
                                      <Flag className="h-4 w-4 mr-2" />
                                      Flag for Review
                                    </Button>
                                  </>
                                )}
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Send Query
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Send Query to Veterinarian</DialogTitle>
                                      <DialogDescription>
                                        Send a query to {prescription.veterinarian} regarding this prescription
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <Textarea
                                        placeholder="Enter your query or request for clarification..."
                                        value={queryText}
                                        onChange={(e) => setQueryText(e.target.value)}
                                        rows={4}
                                      />
                                      <div className="flex gap-2">
                                        <Button className="flex-1">Send Query</Button>
                                        <Button variant="outline" className="flex-1">Save Draft</Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="outline" className="w-full">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {prescription.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#2ECC71] hover:bg-[#27AE60]"
                          onClick={() => handleActionOnPrescription(prescription.id, 'verify')}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verify
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleActionOnPrescription(prescription.id, 'flag')}
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          Flag
                        </Button>
                      </div>
                    )}
                    
                    {prescription.status === 'flagged' && (
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Send Query
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPrescriptions.length)} of {filteredPrescriptions.length} prescriptions
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
          </CardContent>
        </Card>
      )}
    </div>
  )
}