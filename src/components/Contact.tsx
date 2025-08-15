import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  Send
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    bottleType: "",
    quantity: "",
    customization: ""
  });
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const { toast } = useToast();

  const bottlePrices = {
    plastic: 45,
    steel: 125,
    copper: 180,
    glass: 95
  };

  // ✅ FIXED: Instant price update when bottle type or quantity changes
  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    if (updatedData.bottleType && updatedData.quantity) {
      const pricePerBottle = bottlePrices[updatedData.bottleType as keyof typeof bottlePrices] || 0;
      const qty = parseInt(updatedData.quantity) || 0;
      setEstimatedPrice(pricePerBottle * qty);
    } else {
      setEstimatedPrice(0);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.eventType || !formData.bottleType || !formData.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-quote', {
        body: {
          ...formData,
          estimatedPrice,
          adminEmail: 'theblueearthorders@gmail.com',
          whatsappNumber: '9649049912'
        }
      });

      if (error) throw error;

      toast({
        title: "Quote Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        bottleType: "",
        quantity: "",
        customization: ""
      });
      setEstimatedPrice(0);

    } catch (error) {
      console.error('Error sending quote:', error);
      toast({
        title: "Error",
        description: "Failed to send quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-sky">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Get Your
            <span className="text-transparent bg-gradient-ocean bg-clip-text"> Custom Quote</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to create something special? Get in touch with us for a personalized quote 
            and let's make your event unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>WhatsApp Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Quick responses and instant quotes via WhatsApp
                </p>
                <Button 
                  variant="nature" 
                  className="w-full"
                  onClick={() => window.open('https://wa.me/9649049912', '_blank')}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Call Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">+91 9649049912</p>
                <p className="text-sm text-muted-foreground mb-4">Mon-Sat: 9 AM - 7 PM</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>Email Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">theblueearthorders@gmail.com</p>
              </CardContent>
            </Card>
          </div>

          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Custom Quote</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your Name *
                    </label>
                    <Input 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number *
                    </label>
                    <Input 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Event Type *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('eventType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="party">Private Party</SelectItem>
                        <SelectItem value="celebration">Celebration</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Event Date
                    </label>
                    <Input 
                      type="date" 
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Bottle Type *
                    </label>
                    <Select onValueChange={(value) => handleInputChange('bottleType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastic">Eco Plastic (₹45/piece)</SelectItem>
                        <SelectItem value="steel">Stainless Steel (₹125/piece)</SelectItem>
                        <SelectItem value="copper">Pure Copper (₹180/piece)</SelectItem>
                        <SelectItem value="glass">Borosilicate Glass (₹95/piece)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Quantity *
                    </label>
                    <Input 
                      type="number" 
                      placeholder="e.g., 100" 
                      min="25"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Customization Details
                  </label>
                  <Textarea 
                    placeholder="Describe your customization needs (logo, text, colors, etc.)"
                    rows={4}
                    value={formData.customization}
                    onChange={(e) => handleInputChange('customization', e.target.value)}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Estimated Price
                  </h4>
                  <p className="text-lg font-bold text-primary transition-all duration-300">
                    ₹{estimatedPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price will be calculated based on your selections
                  </p>
                </div>

                <Button 
                  variant="ocean" 
                  size="lg" 
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Quote Request"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to receive communications from BlueEarth. 
                  We'll never spam you or share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
