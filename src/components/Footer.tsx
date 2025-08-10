import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  Droplets,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-deep text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">BlueEarth</h3>
                <p className="text-sm text-white/80">Pure Water for a Pure Planet</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Creating custom water bottles for memorable events while caring for our planet. 
              Quality, sustainability, and style in every bottle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-white/70 hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="text-white/70 hover:text-white transition-colors">Services</a></li>
              <li><a href="#products" className="text-white/70 hover:text-white transition-colors">Products</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Wedding Bottles</li>
              <li>Corporate Events</li>
              <li>Private Parties</li>
              <li>Custom Designs</li>
              <li>Bulk Orders</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-aqua" />
                <span className="text-white/70">+91 9649049912</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-aqua" />
                <span className="text-white/70">virusikar5600@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-aqua mt-0.5" />
                <span className="text-white/70">Jaipur, Rajasthan, India</span>
              </div>
            </div>

            <Button 
              variant="nature" 
              size="sm" 
              className="mt-4"
              onClick={() => window.open('https://wa.me/9649049912', '_blank')}
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-white/70">
            © 2025 BlueEarth. All rights reserved. | Eco-friendly solutions for a better tomorrow.
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;