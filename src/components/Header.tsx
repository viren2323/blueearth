import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Phone } from "lucide-react";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Contact", href: "#contact" }
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

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
          <a 
            href="#customizer" 
            className="text-foreground hover:text-primary transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            3D Customizer
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
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96">
              {/* Accessibility Title (Hidden) */}
              <VisuallyHidden>
                <DialogTitle>Menu</DialogTitle>
              </VisuallyHidden>

              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-2 pb-6 border-b border-border">
                  <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">BE</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">BlueEarth</h2>
                    <p className="text-xs text-muted-foreground -mt-1">Pure Water for a Pure Planet</p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-6 pt-8 flex-1">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg text-foreground hover:text-primary transition-colors py-2"
                      onClick={item.onClick || handleNavClick}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="pt-6 border-t border-border space-y-4">
                  <Button 
                    variant="pure" 
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      window.open('tel:9649049912', '_self');
                      setIsOpen(false);
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us: 9649049912
                  </Button>
                  <Button 
                    variant="ocean" 
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
