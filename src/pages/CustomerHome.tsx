import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import backhoeImage from "@/assets/backhoe-loader.jpg";
import craneImage from "@/assets/crane.jpg";
import towingImage from "@/assets/towing-vehicle.jpg";

const CustomerHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const customerData = location.state?.customerData;

  const services = [
    {
      id: "backhoe",
      name: "Backhoe Loader",
      description: "Professional excavation and construction services",
      image: backhoeImage,
      providers: 8
    },
    {
      id: "crane",
      name: "Crane Services", 
      description: "Heavy lifting and construction support",
      image: craneImage,
      providers: 5
    },
    {
      id: "towing",
      name: "Towing Vehicle",
      description: "24/7 vehicle recovery and towing services",
      image: towingImage,
      providers: 12
    }
  ];

  const handleServiceSelect = (serviceId: string, serviceName: string) => {
    navigate(`/customer/providers/${serviceId}`, {
      state: { 
        customerData,
        serviceName,
        serviceId
      }
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Thank you for using TOWHOECR",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary">TOWHOECR</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Welcome, {customerData?.name}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Service
          </h2>
          <p className="text-muted-foreground">
            Select the service you need from our professional providers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              onClick={() => handleServiceSelect(service.id, service.name)}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm bg-primary px-2 py-1 rounded-full">
                    {service.providers} Providers Available
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-primary group-hover:text-primary-glow transition-colors">
                  {service.name}
                </CardTitle>
                <CardDescription>
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceSelect(service.id, service.name);
                  }}
                >
                  View Providers
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CustomerHome;