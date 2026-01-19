export default function Features() {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Hand-picked fabrics and materials for lasting comfort and elegance',
      icon: '✨',
    },
    {
      title: 'Traditional Designs',
      description: 'Authentic Pakistani patterns and embroidery work',
      icon: '🎨',
    },
    {
      title: 'Modern Styles',
      description: 'Contemporary cuts and designs for the modern woman',
      icon: '👗',
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      icon: '🚚',
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
