import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const { props } = usePage();
  const auth = props.auth ?? {};
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const services = [
    { name: "Bug Bounty", href: "/bug-bounty", description: "Crowdsourced security testing" },
    { name: "Penetration Testing", href: "/pentest", description: "Expert-led security assessments" },
    { name: "Security Audit", href: "/audit", description: "Comprehensive security reviews" },
    { name: "Training", href: "/training", description: "Security awareness programs" },
  ];

  const pages = ["solution", "researchers", "customers", "resources", "company"];

  return (
    <header className="bg-gray-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/bluestrike-logo.png"
              alt="Bluestrike Logo"
              className="h-12 w-auto"
            />
            <Link href="/">
              <span className="text-3xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors">
                Bluestrike
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ml-8 space-x-12 text-white">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 font-medium hover:text-blue-400 transition-all">
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
                  >
                    {services.map((service, idx) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={`block px-6 py-4 hover:bg-gray-700 transition-colors border-b border-gray-700 ${idx === services.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <div className="font-medium text-white mb-1">{service.name}</div>
                        <div className="text-sm text-gray-300">{service.description}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {pages.map((page) => (
              <Link 
                key={page} 
                href={`/${page}`} 
                className="hover:text-blue-400 transition-colors font-medium"
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ml-6">
            {auth.user ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href={route('login')} 
                  className="text-white hover:text-blue-400 transition-colors font-medium px-4 py-2"
                >
                  Log In
                </Link>
                <Link
                  href={route('register')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-blue-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-700 overflow-hidden bg-gray-900"
            >
              <nav className="py-4 space-y-1 text-white">

                {/* Mobile Services */}
                <div className="px-4">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors"
                  >
                    Services <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block py-2 text-white hover:text-blue-400 transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-gray-700 my-2"></div>

                {pages.map((page) => (
                  <Link 
                    key={page} 
                    href={`/${page}`} 
                    className="block px-4 py-2 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Link>
                ))}

                <div className="border-t border-gray-700 my-2"></div>

                {/* Mobile Auth */}
                <div className="px-4 py-2 space-y-2">
                  {auth.user ? (
                    <Link
                      href="/dashboard"
                      className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={route('login')}
                        className="block text-center text-white hover:text-blue-400 px-5 py-2.5 rounded-lg font-medium border border-gray-700 transition-colors"
                      >
                        Log In
                      </Link>
                      <Link
                        href={route('register')}
                        className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>

              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
