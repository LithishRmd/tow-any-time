import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Clock } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  city: string;
  phone: string;
  rating: number;
  experience: string;
  availability: string;
  priceRange: string;
}

const ProviderListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { customerData, serviceName, serviceId } = location.state || {};

  // Mock provider data - in real app, this would come from API
  const [providers] = useState<Provider[]>([
    {
      id: "1",
      name: "ABC Construction Services",
      city: "Mumbai",
      phone: "+91 98765 43210",
      rating: 4.8,
      experience: "8+ years",
      availability: "Available Today",
      priceRange: "₹2,000 - ₹5,000"
    },
    {
      id: "2", 
      name: "Quick Fix Solutions",
      city: "Mumbai",
      phone: "+91 98765 43211",
      rating: 4.5,
      experience: "5+ years",
      availability: "Available Tomorrow",
      priceRange: "₹1,500 - ₹4,000"
    },
    {
      id: "3",
      name: "Professional Equipment Co.",
      city: "Navi Mumbai",
      phone: "+91 98765 43212",
      rating: 4.9,
      experience: "12+ years", 
      availability: "Available Now",
      priceRange: "₹3,000 - ₹7,000"
    },
    {
      id: "4",
      name: "City Service Group",
      city: "Pune",
      phone: "+91 98765 43213",
      rating: 4.3,
      experience: "6+ years",
      availability: "Available Today",
      priceRange: "₹2,500 - ₹6,000"
    },
    {
      id: "5",
      name: "Elite Construction",
      city: "Mumbai",
      phone: "+91 98765 43214", 
      rating: 4.7,
      experience: "10+ years",
      availability: "Available Tomorrow",
      priceRange: "₹4,000 - ₹8,000"
    }
  ]);

  const handleSelectProvider = (provider: Provider) => {
    navigate('/customer/booking', {
      state: {
        customerData,
        serviceName,
        serviceId,
        selectedProvider: provider
      }
    });
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes("Now")) return "success";
    if (availability.includes("Today")) return "warning";
    return "secondary";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/customer/home', { state: { customerData }})}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Button>
            
            <div>
              <h1 className="text-2xl font-bold text-primary">{serviceName} Providers</h1>
              <p className="text-sm text-muted-foreground">Choose from our verified professionals</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {providers.map((provider) => (
            <Card 
              key={provider.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              onClick={() => handleSelectProvider(provider)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-primary group-hover:text-primary-glow transition-colors">
                      {provider.name}
                    </CardTitle>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {provider.city}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {provider.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                    
                    <Badge variant={getAvailabilityColor(provider.availability) as any}>
                      <Clock className="w-3 h-3 mr-1" />
                      {provider.availability}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-semibold">{provider.experience}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="font-semibold text-primary">{provider.priceRange}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(provider.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm">({provider.rating})</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProvider(provider);
                  }}
                >
                  Select This Provider
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProviderListing;