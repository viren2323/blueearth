import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import royalHeroImg from "../assets/royal-hero.png";
import celebrationSpecialImg from "../assets/celebration-special.png";
import corporateSummitImg from "../assets/corporate-summit.png";
import weddingCollectionImg from "../assets/wedding-collection.png";
import blueEarthSignatureImg from "../assets/blueearth-signature.png";

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bottles = [
    {
      name: "Royal Hero Premium",
      features: ["Premium Glass", "Elegant Design", "Royal Branding", "Luxury Finish"],
      popular: true,
      image: royalHeroImg,
      description: "Elegant premium bottles with sophisticated branding for luxury events and corporate gifts."
    },
    {
      name: "Celebration Special",
      features: ["Custom Birthday Design", "Festive Colors", "Personal Touch", "Party Perfect"],
      popular: false,
      image: celebrationSpecialImg,
      description: "Perfect for birthdays and special celebrations with personalized designs and vibrant colors."
    },
    {
      name: "Corporate Summit",
      features: ["Professional Branding", "Conference Ready", "Business Quality", "Corporate Identity"],
      popular: false,
      image: corporateSummitImg,
      description: "Professional bottles designed for business events, conferences, and corporate branding."
    },
    {
      name: "Wedding Collection",
      features: ["Wedding Theme", "Golden Accents", "Romantic Design", "Keepsake Quality"],
      popular: false,
      image: weddingCollectionImg,
      description: "Elegant wedding-themed bottles with golden accents, perfect for special occasions and keepsakes."
    },
    {
      name: "BlueEarth Signature",
      features: ["Eco-Friendly", "Brand Identity", "Sustainable", "Pure & Refreshing"],
      popular: true,
      image: blueEarthSignatureImg,
      description: "Our signature eco-friendly bottles representing pure water for a pure planet with sustainable design."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bottles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bottles.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bottles.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bottles.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Premium
            <span className="text-transparent bg-gradient-nature bg-clip-text"> Bottle Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of eco-friendly bottles, 
            each designed to meet your unique needs and preferences.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Main Carousel */}
          <div className="relative h-[600px] overflow-hidden rounded-3xl shadow-strong">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-full bg-gradient-to-br from-background-soft to-muted/50 flex items-center justify-center relative overflow-hidden">
                  {/* Popular Badge */}
                  {bottles[currentIndex].popular && (
                    <Badge className="absolute top-6 right-6 bg-white/90 text-primary border-0 shadow-md z-20">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}

                  {/* Product Image */}
                  <div className="flex items-center justify-center h-full w-full">
                    <motion.img
                      src={bottles[currentIndex].image}
                      alt={bottles[currentIndex].name}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="carousel-image w-full h-full object-cover md:object-contain md:p-4"
                    />
                  </div>

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-strong">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{bottles[currentIndex].name}</h3>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-20 right-10 w-32 h-32 bg-nature/5 rounded-full blur-2xl"></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-medium flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-medium flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {bottles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Product Details */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              {bottles[currentIndex].description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {bottles[currentIndex].features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + featureIndex * 0.1 }}
                  className="flex items-center space-x-2 bg-background-soft rounded-full px-4 py-2 shadow-soft"
                >
                  <Check className="w-4 h-4 text-nature" />
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                variant={bottles[currentIndex].popular ? "ocean" : "outline"}
                size="lg"
                className="px-8 py-3"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Choose This Bottle
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-8">
          <div className="w-full bg-secondary/30 rounded-full h-1">
            <motion.div
              className="bg-primary h-1 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 3,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
