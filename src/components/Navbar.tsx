import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            MyCompany
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/customer" className="text-gray-700 hover:text-blue-600 transition">Customers</Link>
            <Link to="/employees" className="text-gray-700 hover:text-blue-600 transition">Employees</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">Products</Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition">Orders</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-md">
          <Link to="/customers" className="block py-2 text-gray-700 hover:text-blue-600">Customers</Link>
          <Link to="/employees" className="block py-2 text-gray-700 hover:text-blue-600">Employees</Link>
          <Link to="/products" className="block py-2 text-gray-700 hover:text-blue-600">Products</Link>
          <Link to="/orders" className="block py-2 text-gray-700 hover:text-blue-600">Orders</Link>
        </div>
      )}
    </nav>
  );
}
