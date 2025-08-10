import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-ocean rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">BE</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">BlueEarth</h1>
            <p className="text-xs text-muted-foreground -mt-1">Pure Water for a Pure Planet</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#products" className="text-foreground hover:text-primary transition-colors">
            Products
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="pure" 
            size="sm"
            onClick={() => window.open('tel:9649049912', '_self')}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call Us</span>
          </Button>
          <Button 
            variant="ocean" 
            size="sm"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Quote
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden">
          <div className="w-64 bg-background h-full shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-foreground">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Services
              </a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Products
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;