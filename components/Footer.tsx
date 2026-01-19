export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Pakisthani Dress</h3>
            <p className="text-gray-300">
              Your destination for authentic Pakistani traditional wear and modern fashion.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-accent">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Collections</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-accent">Lawn</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Chiffon</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Wedding</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Casual</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@pakisthanidress.com</li>
              <li>Phone: +92 XXX XXXXXXX</li>
              <li>Address: Your Location</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2026 Pakisthani Dress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
