import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Phone, MapPin, Wrench, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const providerData = location.state?.providerData;

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Thank you for being part of TOWHOECR network",
    });
    navigate('/');
  };

  // Mock booking requests
  const bookingRequests = [
    {
      id: "1",
      customerName: "John Doe",
      customerPhone: "+91 98765 43210",
      service: "Backhoe Loader",
      date: "March 15, 2024",
      time: "10:00 AM",
      status: "pending"
    },
    {
      id: "2", 
      customerName: "Jane Smith",
      customerPhone: "+91 98765 43211",
      service: "Crane Services",
      date: "March 16, 2024", 
      time: "2:00 PM",
      status: "pending"
    }
  ];

  const handleAccept = (bookingId: string) => {
    toast({
      title: "Booking Accepted",
      description: "Customer has been notified of your acceptance",
    });
    // In real app, would update booking status and send email
  };

  const handleDecline = (bookingId: string) => {
    toast({
      title: "Booking Declined", 
      description: "Customer has been notified and can choose another provider",
    });
    // In real app, would update booking status and send email
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary">TOWHOECR Provider</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Welcome, {providerData?.name}</span>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Provider Profile */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Your Profile</CardTitle>
                <CardDescription>Service provider information</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">{providerData?.name}</p>
                      <p className="text-sm text-muted-foreground">Service Provider</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">{providerData?.phone}</p>
                      <p className="text-sm text-muted-foreground">Contact Number</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">{providerData?.city}</p>
                      <p className="text-sm text-muted-foreground">Service Area</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold capitalize">{providerData?.serviceType}</p>
                      <p className="text-sm text-muted-foreground">Service Type</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Badge variant="secondary" className="w-full justify-center">
                    ✓ Verified Provider
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Requests */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Booking Requests</CardTitle>
                <CardDescription>
                  New service requests from customers
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {bookingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No new booking requests at the moment.</p>
                    <p className="text-sm">You'll be notified when customers book your services.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookingRequests.map((booking) => (
                      <div 
                        key={booking.id}
                        className="border rounded-lg p-4 bg-muted/30"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{booking.service}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p><span className="font-medium">Customer:</span> {booking.customerName}</p>
                              <p><span className="font-medium">Phone:</span> {booking.customerPhone}</p>
                              <p><span className="font-medium">Date:</span> {booking.date}</p>
                              <p><span className="font-medium">Time:</span> {booking.time}</p>
                            </div>
                          </div>
                          
                          <Badge variant="warning">
                            Pending Response
                          </Badge>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleAccept(booking.id)}
                            variant="primary"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </Button>
                          
                          <Button
                            onClick={() => handleDecline(booking.id)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;