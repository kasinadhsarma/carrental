import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  We'd love to hear from you. Our friendly team is always here to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground mb-6">
                    Feel free to reach out to us through any of these channels. We're here to help!
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Our Location</h3>
                        <p className="text-muted-foreground mt-1">123 Main Street, Anytown, USA 12345</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Phone</h3>
                        <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
                        <p className="text-muted-foreground">+1 (555) 765-4321</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="text-muted-foreground mt-1">info@carrental.com</p>
                        <p className="text-muted-foreground">support@carrental.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Business Hours</h3>
                        <p className="text-muted-foreground mt-1">Monday - Friday: 8:00 AM - 8:00 PM</p>
                        <p className="text-muted-foreground">Saturday - Sunday: 9:00 AM - 6:00 PM</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Card className="border-primary/10 shadow-lg">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="How can we help you?" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" placeholder="Your message here..." rows={5} />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Location</h2>
                <p className="max-w-[600px] text-muted-foreground">
                  Visit us at our main office or one of our many locations across the city
                </p>
              </div>
            </div>
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border shadow-lg">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Map location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[600px] text-muted-foreground">
                  Find quick answers to common questions about our services
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "What documents do I need to rent a car?",
                  answer:
                    "You'll need a valid driver's license, a credit card in your name, and proof of insurance. International customers may need additional documentation.",
                },
                {
                  question: "Can I modify or cancel my reservation?",
                  answer:
                    "Yes, you can modify or cancel your reservation up to 24 hours before your scheduled pickup time without any penalty.",
                },
                {
                  question: "Is there a security deposit required?",
                  answer:
                    "Yes, we require a security deposit that varies based on the vehicle type. The deposit is fully refundable upon return of the vehicle in its original condition.",
                },
                {
                  question: "Do you offer airport pickup and drop-off?",
                  answer:
                    "Yes, we offer convenient airport pickup and drop-off services at all major airports in our service areas.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
