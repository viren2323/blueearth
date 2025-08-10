import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Building2, 
  Users, 
  PartyPopper, 
  Upload,
  Palette,
  Calculator,
  Truck
} from "lucide-react";

const Services = () => {
  const eventTypes = [
    {
      icon: Heart,
      title: "Weddings",
      description: "Beautiful custom bottles for your special day",
      color: "text-pink-500"
    },
    {
      icon: Building2,
      title: "Corporate Events",
      description: "Professional branding for business functions",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Private Parties",
      description: "Personalized bottles for intimate gatherings",
      color: "text-nature"
    },
    {
      icon: PartyPopper,
      title: "Celebrations",
      description: "Custom designs for all special occasions",
      color: "text-aqua"
    }
  ];

  const features = [
    {
      icon: Upload,
      title: "Logo Upload",
      description: "Upload your own designs and logos"
    },
    {
      icon: Palette,
      title: "Custom Text",
      description: "Add personalized messages and names"
    },
    {
      icon: Calculator,
      title: "Live Pricing",
      description: "Instant quotes based on your requirements"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick turnaround for your events"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-sky">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Perfect for Every
            <span className="text-transparent bg-gradient-ocean bg-clip-text"> Event</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From intimate weddings to large corporate gatherings, we create custom water bottles 
            that make your event memorable and sustainable.
          </p>
        </div>

        {/* Event Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {eventTypes.map((event, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-0 shadow-soft">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sky rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <event.icon className={`w-8 h-8 ${event.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customization Features */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-medium">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Full Customization Options
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="ocean" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Customizing Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;