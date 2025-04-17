"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Upload, Check } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageTransition } from "@/components/ui/page-transition"

export default function VendorRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    registrationNumber: "",
    taxId: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBusinessTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      businessType: value,
    }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Here you would typically send the data to your API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/vendor/register/success")
    }, 2000)
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.businessName && formData.ownerName && formData.email && formData.phone
      case 2:
        return formData.address && formData.businessType
      case 3:
        return formData.registrationNumber && formData.taxId
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <motion.div
        className="container flex h-16 items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </motion.div>

      <PageTransition className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.div
            className="flex flex-col items-center text-center space-y-2 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Building className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Become a Vendor</h1>
            <p className="text-muted-foreground">
              Join our platform and start growing your car rental business
            </p>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle>Step {step} of 3</CardTitle>
              <CardDescription>
                {step === 1
                  ? "Basic Information"
                  : step === 2
                  ? "Business Details"
                  : "Documentation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        placeholder="Your business name"
                        value={formData.businessName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        placeholder="Full name"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@business.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Full address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={formData.businessType} onValueChange={handleBusinessTypeChange}>
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                        <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Business Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      placeholder="Registration/License number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      placeholder="Tax identification number"
                      value={formData.taxId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Documents</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                        <Upload className="h-6 w-6" />
                        Business License
                      </Button>
                      <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                        <Upload className="h-6 w-6" />
                        Tax Certificate
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!isStepValid() || isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </PageTransition>
    </div>
  )
}