"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ChevronRight } from "lucide-react"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl">Registration Successful!</CardTitle>
          <CardDescription>Your vendor account application has been received</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for applying to become a vendor. Our team will review your application and contact you within 24-48 hours.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">What happens next?</p>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="block mt-1">•</span>
                <span>We'll verify your business information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="block mt-1">•</span>
                <span>Review your submitted documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="block mt-1">•</span>
                <span>Send you account activation details via email</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">
              Go to Login
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
