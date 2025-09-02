import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Calendar, Clock, User, Phone, Home } from "lucide-react";
import { format } from "date-fns";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { customerData, serviceName, selectedProvider, bookingDetails } = location.state || {};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-elevated">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
            <CardTitle className="text-3xl font-bold text-success">Booking Confirmed!</CardTitle>
            <CardDescription className="text-lg">
              Your {serviceName} service has been successfully booked
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Booking Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-lg text-primary">Booking Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingDetails?.date ? format(bookingDetails.date, "MMMM dd, yyyy") : "N/A"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-sm text-muted-foreground">{bookingDetails?.time}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-mono font-semibold">{bookingDetails?.bookingId}</p>
              </div>
            </div>

            {/* Provider Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-lg text-primary">Service Provider Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">{selectedProvider?.name}</p>
                    <p className="text-sm text-muted-foreground">{serviceName} Specialist</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">{selectedProvider?.phone}</p>
                    <p className="text-sm text-muted-foreground">Contact Number</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-primary mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm">
                <p>✓ The service provider has been notified about your booking</p>
                <p>✓ You will receive a confirmation email shortly</p>
                <p>✓ The provider will contact you to confirm the appointment</p>
                <p>✓ You can track your booking status via email notifications</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate('/customer/home', { state: { customerData }})}
                variant="primary"
                size="lg"
                className="flex-1 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
              
              <Button
                onClick={() => window.print()}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Print Booking Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingSuccess;