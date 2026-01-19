export default function Collection() {
  const collections = [
    {
      title: 'Lawn Collection',
      description: 'Light and comfortable for summer',
      image: '🌸',
      bgColor: 'bg-pink-100',
    },
    {
      title: 'Chiffon Collection',
      description: 'Elegant and luxurious designs',
      image: '💎',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Wedding Collection',
      description: 'Special occasion masterpieces',
      image: '👰',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Casual Wear',
      description: 'Comfortable daily wear',
      image: '🌺',
      bgColor: 'bg-blue-100',
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-primary">
          Our Collections
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our diverse range of Pakistani dresses, each carefully curated to bring you the best in traditional and contemporary fashion.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className={`${collection.bgColor} p-8 rounded-lg hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-6xl mb-4 text-center">{collection.image}</div>
              <h3 className="text-2xl font-semibold mb-2 text-primary text-center">
                {collection.title}
              </h3>
              <p className="text-gray-700 text-center">{collection.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-primary text-white px-10 py-4 rounded-lg font-semibold hover:bg-secondary transition-colors">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  )
}
