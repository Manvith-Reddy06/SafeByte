import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  MapPin,
  Building2,
  Users,
  AlertTriangle
} from 'lucide-react'

// Mock report data
const mockReportData = {
  summary: {
    totalFarms: 1247,
    compliancRate: 82,
    totalPrescriptions: 3456,
    violations: 234,
    dateRange: '2025-09-01 to 2025-09-29'
  },
  complianceByRegion: [
    { region: 'Hyderabad', compliant: 85, nonCompliant: 15, total: 250 },
    { region: 'Vijayawada', compliant: 78, nonCompliant: 22, total: 320 },
    { region: 'Visakhapatnam', compliant: 92, nonCompliant: 8, total: 180 },
    { region: 'Tirupati', compliant: 73, nonCompliant: 27, total: 290 },
    { region: 'Guntur', compliant: 80, nonCompliant: 20, total: 207 }
  ],
  drugUsageByClass: [
    { class: 'Tetracyclines', usage: 2850, percentage: 35, trend: '+5%' },
    { class: 'Macrolides', usage: 2120, percentage: 26, trend: '+2%' },
    { class: 'Fluoroquinolones', usage: 1680, percentage: 21, trend: '-8%' },
    { class: 'Beta-lactams', usage: 920, percentage: 11, trend: '+12%' },
    { class: 'Others', usage: 580, percentage: 7, trend: '+3%' }
  ],
  monthlyTrends: [
    { month: 'Jan', compliance: 78, violations: 45, prescriptions: 280 },
    { month: 'Feb', compliance: 80, violations: 38, prescriptions: 295 },
    { month: 'Mar', compliance: 77, violations: 52, prescriptions: 310 },
    { month: 'Apr', compliance: 82, violations: 35, prescriptions: 325 },
    { month: 'May', compliance: 85, violations: 28, prescriptions: 340 },
    { month: 'Jun', compliance: 83, violations: 31, prescriptions: 355 },
    { month: 'Jul', compliance: 86, violations: 25, prescriptions: 370 },
    { month: 'Aug', compliance: 84, violations: 29, prescriptions: 385 },
    { month: 'Sep', compliance: 82, violations: 34, prescriptions: 400 }
  ],
  farmTypeDistribution: [
    { type: 'Poultry', count: 487, percentage: 39 },
    { type: 'Dairy', count: 312, percentage: 25 },
    { type: 'Aquaculture', count: 186, percentage: 15 },
    { type: 'Goat Farm', count: 149, percentage: 12 },
    { type: 'Sheep Farm', count: 113, percentage: 9 }
  ]
}

export function Reports() {
  const [reportType, setReportType] = useState('compliance')
  const [dateRange, setDateRange] = useState({ start: '2025-09-01', end: '2025-09-29' })
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['all'])
  const [selectedFarmTypes, setSelectedFarmTypes] = useState<string[]>(['all'])
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)

  const reportTypes = [
    { value: 'compliance', label: 'Compliance Report', description: 'Overall MRL compliance status' },
    { value: 'amu_usage', label: 'AMU Usage Report', description: 'Antimicrobial usage patterns' },
    { value: 'violations', label: 'Violations Report', description: 'Compliance violations and penalties' },
    { value: 'trends', label: 'Trend Analysis', description: 'Monthly/yearly trend analysis' },
    { value: 'regional', label: 'Regional Analysis', description: 'Region-wise performance' },
    { value: 'veterinary', label: 'Veterinary Report', description: 'Vet registration and activity' }
  ]

  const regions = ['Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Tirupati', 'Guntur']
  const farmTypes = ['Poultry', 'Dairy', 'Aquaculture', 'Goat Farm', 'Sheep Farm']

  const handleRegionChange = (region: string, checked: boolean) => {
    if (region === 'all') {
      setSelectedRegions(checked ? ['all'] : [])
    } else {
      setSelectedRegions(prev => {
        const filtered = prev.filter(r => r !== 'all')
        return checked 
          ? [...filtered, region]
          : filtered.filter(r => r !== region)
      })
    }
  }

  const handleFarmTypeChange = (type: string, checked: boolean) => {
    if (type === 'all') {
      setSelectedFarmTypes(checked ? ['all'] : [])
    } else {
      setSelectedFarmTypes(prev => {
        const filtered = prev.filter(t => t !== 'all')
        return checked 
          ? [...filtered, type]
          : filtered.filter(t => t !== type)
      })
    }
  }

  const generateReport = (format: 'pdf' | 'csv' | 'excel') => {
    // Mock report generation
    console.log(`Generating ${format} report for ${reportType}`)
    // In real implementation, this would trigger the actual report generation
  }

  const COLORS = ['#2ECC71', '#E74C3C', '#F39C12', '#3498DB', '#9B59B6']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports on compliance, usage patterns, and trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[#2ECC71]">
            <BarChart3 className="h-3 w-3 mr-1" />
            Report Builder
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Configure your report parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <p className="font-medium">{type.label}</p>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Regions</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="all-regions"
                      checked={selectedRegions.includes('all')}
                      onCheckedChange={(checked) => handleRegionChange('all', checked as boolean)}
                    />
                    <label htmlFor="all-regions" className="text-sm">All Regions</label>
                  </div>
                  {regions.map(region => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`region-${region}`}
                        checked={selectedRegions.includes(region)}
                        onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                      />
                      <label htmlFor={`region-${region}`} className="text-sm">{region}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Farm Types</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="all-types"
                      checked={selectedFarmTypes.includes('all')}
                      onCheckedChange={(checked) => handleFarmTypeChange('all', checked as boolean)}
                    />
                    <label htmlFor="all-types" className="text-sm">All Types</label>
                  </div>
                  {farmTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type}`}
                        checked={selectedFarmTypes.includes(type)}
                        onCheckedChange={(checked) => handleFarmTypeChange(type, checked as boolean)}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Include in Report</label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-charts"
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                  />
                  <label htmlFor="include-charts" className="text-sm">Charts & Visualizations</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-details"
                    checked={includeDetails}
                    onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
                  />
                  <label htmlFor="include-details" className="text-sm">Detailed Data Tables</label>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Button 
                  className="w-full bg-[#2ECC71] hover:bg-[#27AE60]"
                  onClick={() => generateReport('pdf')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF Report
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => generateReport('csv')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    CSV
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => generateReport('excel')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                Preview of your {reportTypes.find(t => t.value === reportType)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Report Summary */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Executive Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-2xl font-semibold text-[#2ECC71]">{mockReportData.summary.totalFarms}</p>
                    <p className="text-sm text-muted-foreground">Total Farms</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-2xl font-semibold text-[#3498DB]">{mockReportData.summary.compliancRate}%</p>
                    <p className="text-sm text-muted-foreground">Compliance Rate</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-2xl font-semibold text-[#F39C12]">{mockReportData.summary.totalPrescriptions}</p>
                    <p className="text-sm text-muted-foreground">Prescriptions</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-2xl font-semibold text-[#E74C3C]">{mockReportData.summary.violations}</p>
                    <p className="text-sm text-muted-foreground">Violations</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Report Period: {mockReportData.summary.dateRange}
                </p>
              </div>

              {/* Charts based on report type */}
              {includeCharts && (
                <div className="space-y-6">
                  {reportType === 'compliance' && (
                    <>
                      <div>
                        <h4 className="font-medium mb-3">Regional Compliance Distribution</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={mockReportData.complianceByRegion}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="compliant" fill="#2ECC71" name="Compliant %" />
                            <Bar dataKey="nonCompliant" fill="#E74C3C" name="Non-Compliant %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Farm Type Distribution</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={mockReportData.farmTypeDistribution}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              dataKey="count"
                            >
                              {mockReportData.farmTypeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  )}

                  {reportType === 'amu_usage' && (
                    <div>
                      <h4 className="font-medium mb-3">Drug Usage by Class</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockReportData.drugUsageByClass} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="class" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="usage" fill="#3498DB" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {reportType === 'trends' && (
                    <div>
                      <h4 className="font-medium mb-3">Monthly Compliance Trends</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockReportData.monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="compliance" stroke="#2ECC71" strokeWidth={2} name="Compliance %" />
                          <Line type="monotone" dataKey="violations" stroke="#E74C3C" strokeWidth={2} name="Violations" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}

              {/* Data Tables */}
              {includeDetails && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Detailed Data</h4>
                  {reportType === 'compliance' && (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-3 text-left">Region</th>
                            <th className="p-3 text-right">Total Farms</th>
                            <th className="p-3 text-right">Compliant</th>
                            <th className="p-3 text-right">Non-Compliant</th>
                            <th className="p-3 text-right">Compliance %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockReportData.complianceByRegion.map((region, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3">{region.region}</td>
                              <td className="p-3 text-right">{region.total}</td>
                              <td className="p-3 text-right text-[#2ECC71]">{Math.round(region.total * region.compliant / 100)}</td>
                              <td className="p-3 text-right text-[#E74C3C]">{Math.round(region.total * region.nonCompliant / 100)}</td>
                              <td className="p-3 text-right font-medium">{region.compliant}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {reportType === 'amu_usage' && (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-3 text-left">Drug Class</th>
                            <th className="p-3 text-right">Usage (mg)</th>
                            <th className="p-3 text-right">Percentage</th>
                            <th className="p-3 text-right">Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockReportData.drugUsageByClass.map((drug, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3">{drug.class}</td>
                              <td className="p-3 text-right">{drug.usage.toLocaleString()}</td>
                              <td className="p-3 text-right">{drug.percentage}%</td>
                              <td className={`p-3 text-right font-medium ${
                                drug.trend.startsWith('+') ? 'text-[#2ECC71]' : 'text-[#E74C3C]'
                              }`}>
                                {drug.trend}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously generated reports available for download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Monthly Compliance Report - September 2025', date: '2025-09-30', type: 'PDF', size: '2.4 MB' },
                  { name: 'AMU Usage Analysis - Q3 2025', date: '2025-09-28', type: 'Excel', size: '1.8 MB' },
                  { name: 'Regional Performance Summary', date: '2025-09-25', type: 'PDF', size: '3.1 MB' },
                  { name: 'Violations Report - September 2025', date: '2025-09-22', type: 'CSV', size: '0.5 MB' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.date} • {report.type} • {report.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}