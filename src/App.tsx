import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import CustomerLogin from "./pages/CustomerLogin";
import OTPVerification from "./pages/OTPVerification";
import ServiceProviderRegister from "./pages/ServiceProviderRegister";
import CustomerHome from "./pages/CustomerHome";
import ProviderListing from "./pages/ProviderListing";
import BookingPage from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess";
import ProviderDashboard from "./pages/ProviderDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/verify-otp" element={<OTPVerification />} />
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/providers/:serviceId" element={<ProviderListing />} />
          <Route path="/customer/booking" element={<BookingPage />} />
          <Route path="/customer/booking-success" element={<BookingSuccess />} />
          <Route path="/provider/register" element={<ServiceProviderRegister />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
