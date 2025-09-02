import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, Phone, MapPin, Star } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { customerData, serviceName, selectedProvider } = location.state || {};

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your booking",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Booking Confirmed!",
        description: `Your ${serviceName} service has been booked for ${format(selectedDate, "MMM dd, yyyy")} at ${selectedTime}`,
      });
      
      // In real app, this would send email notifications to provider
      navigate('/customer/booking-success', {
        state: {
          customerData,
          serviceName,
          selectedProvider,
          bookingDetails: {
            date: selectedDate,
            time: selectedTime,
            bookingId: `BOOK-${Date.now()}`
          }
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Providers
            </Button>
            
            <div>
              <h1 className="text-2xl font-bold text-primary">Book Your Service</h1>
              <p className="text-sm text-muted-foreground">Complete your {serviceName} booking</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Provider Details */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Selected Provider</CardTitle>
              <CardDescription>Confirm your service provider details</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">{selectedProvider?.name}</p>
                    <p className="text-sm text-muted-foreground">Service Provider</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">{selectedProvider?.phone}</p>
                    <p className="text-sm text-muted-foreground">Contact Number</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">{selectedProvider?.city}</p>
                    <p className="text-sm text-muted-foreground">Service Area</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">{selectedProvider?.rating} Stars</p>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <p className="font-semibold text-primary">Service Details</p>
                  <p className="text-lg">{serviceName}</p>
                  <p className="text-sm text-muted-foreground">Price Range: {selectedProvider?.priceRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Select Date & Time</CardTitle>
              <CardDescription>Choose your preferred appointment slot</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker */}
              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <SelectValue placeholder="Choose a time slot" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Info Summary */}
              <div className="pt-4 border-t space-y-2">
                <p className="font-semibold text-primary">Your Details</p>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Name:</span> {customerData?.name}</p>
                  <p><span className="font-medium">Email:</span> {customerData?.email}</p>
                  <p><span className="font-medium">Phone:</span> {customerData?.phone}</p>
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBooking}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading || !selectedDate || !selectedTime}
              >
                {isLoading ? "Confirming Booking..." : "Confirm Booking"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;