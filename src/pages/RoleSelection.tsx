import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white">
                TOWHOECR
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Professional Construction & Vehicle Services at Your Fingertips
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate('/customer/login')}
                className="flex items-center gap-3 text-lg px-8 py-6"
              >
                <Users className="w-6 h-6" />
                I Need Service
              </Button>
              
              <Button
                variant="heroOutline"
                size="lg"
                onClick={() => navigate('/provider/register')}
                className="flex items-center gap-3 text-lg px-8 py-6"
              >
                <Wrench className="w-6 h-6" />
                I Provide Service
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src={heroImage}
              alt="TOWHOECR Construction Services"
              className="w-full h-auto rounded-2xl shadow-elevated"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Service Categories Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <h3 className="text-xl font-semibold mb-2">Backhoe Loader</h3>
            <p className="text-white/80">Professional excavation and construction services</p>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <h3 className="text-xl font-semibold mb-2">Crane Services</h3>
            <p className="text-white/80">Heavy lifting and construction support</p>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <h3 className="text-xl font-semibold mb-2">Towing Vehicle</h3>
            <p className="text-white/80">24/7 vehicle recovery and towing services</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;