import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
// import bottleTypes from  "@/../public/bottle-types.jpg";

const Products = () => {
  const bottles = [
    {
      name: "Eco Plastic",
      price: "₹45",
      minOrder: 100,
      features: ["BPA Free", "Lightweight", "Durable", "Recyclable"],
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Stainless Steel",
      price: "₹125",
      minOrder: 50,
      features: ["Double Wall", "24hr Cold", "Premium Finish", "Scratch Resistant"],
      popular: true,
      gradient: "from-gray-400 to-gray-600"
    },
    {
      name: "Pure Copper",
      price: "₹180",
      minOrder: 25,
      features: ["Ayurvedic Benefits", "Anti-bacterial", "Handcrafted", "Premium Quality"],
      popular: false,
      gradient: "from-orange-400 to-orange-600"
    },
    {
      name: "Borosilicate Glass",
      price: "₹95",
      minOrder: 30,
      features: ["Heat Resistant", "Crystal Clear", "Easy to Clean", "Elegant Design"],
      popular: false,
      gradient: "from-teal-400 to-blue-500"
    }
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Premium
            <span className="text-transparent bg-gradient-nature bg-clip-text"> Bottle Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose from our carefully curated selection of eco-friendly materials, 
            each designed to meet different needs and preferences.
          </p>
          
          {/* Product Showcase Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src="/bottle-types.jpg"
              alt="Different types of water bottles"
              className="w-full rounded-2xl shadow-medium"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bottles.map((bottle, index) => (
            <Card key={index} className={`relative overflow-hidden hover:shadow-strong transition-all duration-300 hover:-translate-y-2 ${
              bottle.popular ? 'border-primary shadow-medium' : 'border-border shadow-soft'
            }`}>
              {bottle.popular && (
                <Badge className="absolute top-4 right-4 bg-gradient-nature text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-full h-32 bg-gradient-to-br ${bottle.gradient} rounded-lg mb-4 flex items-center justify-center`}>
                  <div className="w-16 h-20 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <div className="w-8 h-12 bg-white/40 rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{bottle.name}</CardTitle>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-primary">{bottle.price}</span>
                  <span className="text-muted-foreground">per piece</span>
                </div>
                <p className="text-sm text-muted-foreground">Min. order: {bottle.minOrder} pieces</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {bottle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-nature" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={bottle.popular ? "ocean" : "outline"} 
                  className="w-full"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Choose This Bottle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Pricing Info */}
        <div className="bg-gradient-sky rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Volume Discounts Available</h3>
          <p className="text-muted-foreground mb-6">
            The more you order, the more you save. Get special pricing for large events and corporate orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">100+ bottles: 5% off</Badge>
            <Badge variant="secondary" className="px-4 py-2">500+ bottles: 10% off</Badge>
            <Badge variant="secondary" className="px-4 py-2">1000+ bottles: 15% off</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;