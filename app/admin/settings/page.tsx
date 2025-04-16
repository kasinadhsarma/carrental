"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Server, Database, CreditCard, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [registrationEnabled, setRegistrationEnabled] = useState(true)
  const [bookingEnabled, setBookingEnabled] = useState(true)
  const [paymentEnabled, setPaymentEnabled] = useState(true)
  const [apiRate, setApiRate] = useState([100])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Manage system settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Manage general site settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="CarRental" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input id="site-url" defaultValue="https://carrental.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@carrental.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@carrental.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Premium car rental service providing luxury and comfort for your journeys."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="default-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="default-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="registration">User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register on the platform</p>
                  </div>
                  <Switch id="registration" checked={registrationEnabled} onCheckedChange={setRegistrationEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="booking">Car Booking</Label>
                    <p className="text-sm text-muted-foreground">Allow users to book cars</p>
                  </div>
                  <Switch id="booking" checked={bookingEnabled} onCheckedChange={setBookingEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment">Payment Processing</Label>
                    <p className="text-sm text-muted-foreground">Enable payment processing for bookings</p>
                  </div>
                  <Switch id="payment" checked={paymentEnabled} onCheckedChange={setPaymentEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reviews & Ratings</Label>
                    <p className="text-sm text-muted-foreground">Allow users to leave reviews and ratings</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Manage system performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-rate">API Rate Limit (requests per minute)</Label>
                    <span className="text-sm font-medium">{apiRate[0]}</span>
                  </div>
                  <Slider id="api-rate" min={10} max={500} step={10} value={apiRate} onValueChange={setApiRate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                  <Input id="cache-ttl" type="number" defaultValue="3600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-upload">Maximum Upload Size (MB)</Label>
                  <Input id="max-upload" type="number" defaultValue="10" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>Configure database connection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Database Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Database Port</Label>
                  <Input id="db-port" defaultValue="3306" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input id="db-name" defaultValue="carrental" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-user">Database User</Label>
                  <Input id="db-user" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-password">Database Password</Label>
                  <Input id="db-password" type="password" defaultValue="********" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-prefix">Table Prefix</Label>
                  <Input id="db-prefix" defaultValue="cr_" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Test Connection</Button>
                <Badge variant="outline" className="ml-2">
                  Connected
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Server Information</CardTitle>
              <CardDescription>View server information and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Server className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">PHP Version</p>
                        <p className="font-medium">8.1.0</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">MySQL Version</p>
                        <p className="font-medium">8.0.27</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Server className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Server OS</p>
                        <p className="font-medium">Ubuntu 20.04 LTS</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">System Status</p>
                        <p className="font-medium">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                            Operational
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Force HTTPS</Label>
                    <p className="text-sm text-muted-foreground">Redirect all HTTP requests to HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CAPTCHA Protection</Label>
                    <p className="text-sm text-muted-foreground">Enable CAPTCHA on forms to prevent spam</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Input id="password-expiry" type="number" defaultValue="90" />
                <p className="text-sm text-muted-foreground">Set to 0 to disable password expiration</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max Login Attempts</Label>
                <Input id="login-attempts" type="number" defaultValue="5" />
                <p className="text-sm text-muted-foreground">Number of failed login attempts before account lockout</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
                <Input id="lockout-duration" type="number" defaultValue="30" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Configure API security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require authentication for all API requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>JWT Authentication</Label>
                    <p className="text-sm text-muted-foreground">Use JWT tokens for API authentication</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CORS Protection</Label>
                    <p className="text-sm text-muted-foreground">Enable Cross-Origin Resource Sharing protection</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="jwt-expiry">JWT Token Expiry (minutes)</Label>
                <Input id="jwt-expiry" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowed-origins">Allowed Origins</Label>
                <Textarea
                  id="allowed-origins"
                  defaultValue="https://carrental.com
https://admin.carrental.com"
                />
                <p className="text-sm text-muted-foreground">Enter one origin per line</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>Configure payment gateway integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Stripe</p>
                        <p className="text-sm text-muted-foreground">Credit card processing</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-public">Public Key</Label>
                        <Input id="stripe-public" defaultValue="pk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Secret Key</Label>
                        <Input id="stripe-secret" type="password" defaultValue="sk_test_..." />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="stripe-test" defaultChecked />
                      <Label htmlFor="stripe-test">Test Mode</Label>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-muted-foreground">PayPal payment processing</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypal-client">Client ID</Label>
                        <Input id="paypal-client" defaultValue="" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypal-secret">Secret</Label>
                        <Input id="paypal-secret" type="password" defaultValue="" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="paypal-test" defaultChecked />
                      <Label htmlFor="paypal-test">Sandbox Mode</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email sending settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mail-driver">Mail Driver</Label>
                <Select defaultValue="smtp">
                  <SelectTrigger id="mail-driver">
                    <SelectValue placeholder="Select mail driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="sendmail">Sendmail</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="ses">Amazon SES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="mail-host">SMTP Host</Label>
                  <Input id="mail-host" defaultValue="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-port">SMTP Port</Label>
                  <Input id="mail-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-username">SMTP Username</Label>
                  <Input id="mail-username" defaultValue="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-password">SMTP Password</Label>
                  <Input id="mail-password" type="password" defaultValue="********" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-encryption">Encryption</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="mail-encryption">
                      <SelectValue placeholder="Select encryption" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-from-address">From Address</Label>
                  <Input id="mail-from-address" defaultValue="noreply@carrental.com" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Test Email</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Configure integrations with third-party services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Google Analytics</p>
                        <p className="text-sm text-muted-foreground">Track website traffic and user behavior</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="ga-id">Tracking ID</Label>
                    <Input id="ga-id" defaultValue="UA-XXXXXXXXX-X" />
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Google Maps</p>
                        <p className="text-sm text-muted-foreground">Display maps and location services</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="maps-api-key">API Key</Label>
                    <Input id="maps-api-key" defaultValue="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Twilio SMS</p>
                        <p className="text-sm text-muted-foreground">Send SMS notifications</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twilio-sid">Account SID</Label>
                        <Input id="twilio-sid" defaultValue="" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twilio-token">Auth Token</Label>
                        <Input id="twilio-token" type="password" defaultValue="" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twilio-from">From Number</Label>
                        <Input id="twilio-from" defaultValue="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
