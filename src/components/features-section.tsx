import { Globe, Search, Code, Users } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    { icon: Globe, title: "Global Coverage", description: "Access landmark data from all around the world" },
    { icon: Search, title: "Advanced Search", description: "Powerful search capabilities to find exactly what you need" },
    { icon: Code, title: "Developer Friendly", description: "Easy to integrate with clear documentation" },
    { icon: Users, title: "User Management", description: "Robust user authentication and authorization" },
  ]

  return (
    <section className="w-full py-20 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Why Choose Landmark API?</h2>
            <p className="text-xl text-gray-300 mb-8">Experience the power of our cutting-edge API with these standout features:</p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg filter blur-xl opacity-50"></div>
            <div className="relative bg-black p-6 rounded-lg border border-gray-800">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`GET /api/v1/landmarks?country=France&limit=5

{
  "landmarks": [
    {
      "id": "eiffel-tower",
      "name": "Eiffel Tower",
      "location": {
        "lat": 48.8584,
        "lon": 2.2945
      },
      "description": "Iconic iron lattice tower on the Champ de Mars in Paris."
    },
    // ... more landmarks
  ],
  "total": 1384,
  "page": 1,
  "limit": 5
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}