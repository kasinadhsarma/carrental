import { redirect } from "next/navigation"

// Mock car data
const car = {
  id: 1,
  name: "Toyota Camry",
  category: "Sedan",
  price: 50,
  rating: 4.5,
  description: "The Toyota Camry is a comfortable and reliable sedan, perfect for city driving and longer trips.",
  location: "123 Main St, Anytown, USA",
  image: "/placeholder.svg",
}

export function generateStaticParams() {
  return [{ id: "1" }]
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  // For static export, we'll only support car with ID 1
  if (params.id !== "1") {
    redirect("/cars")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{car.name}</h1>
      <img src={car.image} alt={car.name} className="w-full max-w-2xl mx-auto mb-4" />
      <div className="grid gap-4">
        <p>
          <strong>Category:</strong> {car.category}
        </p>
        <p>
          <strong>Price:</strong> ${car.price}/day
        </p>
        <p>
          <strong>Rating:</strong> {car.rating}/5
        </p>
        <p>
          <strong>Location:</strong> {car.location}
        </p>
        <p>{car.description}</p>
      </div>
    </div>
  )
}
