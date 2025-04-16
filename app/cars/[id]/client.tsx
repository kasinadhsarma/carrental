"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { CalendarIcon, CarFront, Check, ChevronLeft, MapPin, Star } from "lucide-react"

interface CarDetailClientProps {
  car: any // TODO: Add proper type
}

export default function CarDetailClient({ car }: CarDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Calculate total days and price
  const days = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const total = days * car.price

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/cars">
          <Button variant="ghost" className="px-0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img alt={car.name} className="object-cover w-full" src={car.images[selectedImage]} />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {car.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
                  selectedImage === index ? "ring-2 ring-blue-600" : ""
                }`}
              >
                <img alt={`${car.name} ${index + 1}`} className="object-cover w-full" src={image} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{car.name}</h1>
          <div className="mt-2 flex items-center text-sm">
            <CarFront className="mr-2 h-4 w-4" />
            <span className="mr-4">{car.category}</span>
            <Star className="mr-2 h-4 w-4 text-yellow-500" />
            <span>{car.rating}</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4" />
            {car.location}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Select Dates</h2>
            <div className="mt-4 flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Tabs defaultValue="details" className="mt-6">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="mt-4 space-y-4">
                <p>{car.description}</p>
                <h3 className="font-semibold">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {car.features.map((feature: string) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications">
              <div className="mt-4 space-y-4">
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(car.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
                      <dd>{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="mt-4 space-y-4">
                {car.reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{review.user}</span>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 rounded-lg bg-gray-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">${car.price} / day</span>
              <span className="text-lg font-semibold">${total} total</span>
            </div>
            <Button className="mt-4 w-full">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
