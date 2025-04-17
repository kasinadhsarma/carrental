"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/ui/page-transition"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, CheckCircle, AlertCircle, Clock, Eye, Download, Trash2, Plus, Calendar } from "lucide-react"
import { format } from "date-fns"

export default function VendorDocumentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock document data
  const documents = [
    {
      id: "doc1",
      type: "drivingLicense",
      name: "Driving License.pdf",
      uploadDate: "2023-04-15",
      expiryDate: "2025-04-15",
      status: "verified",
      url: "#",
    },
    {
      id: "doc2",
      type: "businessLicense",
      name: "Business License.pdf",
      uploadDate: "2023-04-15",
      expiryDate: "2024-12-31",
      status: "verified",
      url: "#",
    },
    {
      id: "doc3",
      type: "insurance",
      name: "Insurance Document.pdf",
      uploadDate: "2023-04-15",
      expiryDate: "2024-06-30",
      status: "verified",
      url: "#",
    },
    {
      id: "doc4",
      type: "identityProof",
      name: "Identity Card.jpg",
      uploadDate: "2023-04-15",
      expiryDate: "2028-04-15",
      status: "verified",
      url: "#",
    },
    {
      id: "doc5",
      type: "taxDocument",
      name: "Tax Certificate.pdf",
      uploadDate: "2023-05-20",
      expiryDate: "2024-03-31",
      status: "pending",
      url: "#",
    },
    {
      id: "doc6",
      type: "addressProof",
      name: "Utility Bill.pdf",
      uploadDate: "2023-05-20",
      status: "rejected",
      rejectionReason: "Document is too old. Please upload a recent utility bill (not older than 3 months).",
      url: "#",
    },
  ]

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "drivingLicense":
        return "Driving License"
      case "businessLicense":
        return "Business License"
      case "insurance":
        return "Insurance Document"
      case "identityProof":
        return "Identity Proof"
      case "taxDocument":
        return "Tax Document"
      case "addressProof":
        return "Address Proof"
      default:
        return type
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    if (activeTab === "all") return true
    return doc.status === activeTab
  })

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">Manage your business and identity documents</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload New Document
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
            <CardDescription>View and manage all your uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-initial">
                  All Documents
                </TabsTrigger>
                <TabsTrigger value="verified" className="flex-1 md:flex-initial">
                  Verified
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex-1 md:flex-initial">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex-1 md:flex-initial">
                  Rejected
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">{getDocumentTypeLabel(doc.type)}</h3>
                            <p className="text-xs text-muted-foreground">{doc.name}</p>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Upload Date</p>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(doc.uploadDate), "MMM dd, yyyy")}
                            </p>
                          </div>
                          {doc.expiryDate && (
                            <div>
                              <p className="text-xs text-muted-foreground">Expiry Date</p>
                              <p className="text-sm font-medium flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(doc.expiryDate), "MMM dd, yyyy")}
                              </p>
                            </div>
                          )}
                        </div>

                        {doc.status === "rejected" && doc.rejectionReason && (
                          <div className="bg-red-50 p-2 rounded-md text-xs text-red-700 border border-red-200">
                            <p className="font-medium">Reason for rejection:</p>
                            <p>{doc.rejectionReason}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-3 w-3" /> View
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-3 w-3" /> Download
                          </Button>
                          {doc.status === "rejected" && (
                            <Button variant="outline" size="sm" className="gap-1 ml-auto">
                              <Upload className="h-3 w-3" /> Re-upload
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-12 border rounded-lg">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No documents found</h3>
                    <p className="text-muted-foreground mb-6">
                      {activeTab === "all"
                        ? "You haven't uploaded any documents yet."
                        : `You don't have any ${activeTab} documents.`}
                    </p>
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" /> Upload Document
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>Upload additional documents for your vendor account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <select
                    id="documentType"
                    aria-label="Select document type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select document type</option>
                    <option value="drivingLicense">Driving License</option>
                    <option value="businessLicense">Business License</option>
                    <option value="insurance">Insurance Document</option>
                    <option value="identityProof">Identity Proof</option>
                    <option value="taxDocument">Tax Document</option>
                    <option value="addressProof">Address Proof</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
                  <Input id="expiryDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentFile">Upload Document</Label>
                <div className="flex items-center gap-2">
                  <Input id="documentFile" type="file" className="hidden" />
                  <Label
                    htmlFor="documentFile"
                    className="cursor-pointer flex items-center justify-center gap-2 p-8 border-2 border-dashed border-primary/30 rounded-md hover:bg-primary/5 transition-colors w-full"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-primary/60 mx-auto mb-2" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PDF, JPG, or PNG (max 5MB)</p>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Upload className="h-4 w-4" /> Upload Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
