import { School, User, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SchoolAdmin</h1>
              <p className="text-sm text-gray-500">Administration Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Students</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Teachers</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Classes</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Reports</a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Admin User
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}