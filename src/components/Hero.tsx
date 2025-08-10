import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Leaf, Shield } from "lucide-react";
 import heroBg from "@/assets/hero-bottles.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <div className="flex items-center space-x-2 mb-6">
            <Droplets className="w-8 h-8 text-aqua animate-pulse" />
            <span className="text-aqua font-medium tracking-wider uppercase text-sm">
              Premium Custom Water Bottles
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Pure Water for a
            <span className="block text-transparent bg-gradient-to-r from-aqua to-nature bg-clip-text">
              Pure Planet
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
            Customize premium water bottles for your special events. From intimate gatherings 
            to corporate functions, we deliver quality that reflects your brand values.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-nature" />
              <span className="text-white/80">100% Safe Materials</span>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-nature" />
              <span className="text-white/80">Eco-Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-aqua" />
              <span className="text-white/80">Custom Designs</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              className="group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Order
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="pure" 
              size="lg" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Products
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;