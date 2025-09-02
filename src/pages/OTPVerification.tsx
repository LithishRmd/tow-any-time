import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const customerData = location.state?.customerData;

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") { // Demo OTP
        toast({
          title: "Login Successful!",
          description: "Welcome to TOWHOECR",
        });
        navigate('/customer/home', { 
          state: { customerData }
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please check your code and try again",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your email",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/customer/login')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Verify OTP</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email
              <br />
              <span className="font-medium text-primary">{customerData?.email}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Demo OTP: <span className="font-mono font-bold">123456</span>
            </div>

            <Button
              onClick={handleVerify}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
            </Button>

            <div className="text-center">
              <Button 
                variant="link" 
                onClick={handleResendOTP}
                className="text-primary"
              >
                Didn't receive the code? Resend OTP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;