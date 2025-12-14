
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardHome from "./pages/dashboard/DashboardHome";
import RoleActivation from "./pages/dashboard/RoleActivation";
import Products from "./pages/dashboard/Products";
import MyProducts from "./pages/dashboard/MyProducts";
import Orders from "./pages/dashboard/Orders";
import Escrow from "./pages/dashboard/Escrow";
import Messages from "./pages/dashboard/Messages";
import Collaborations from "./pages/dashboard/Collaborations";
import Reputation from "./pages/dashboard/Reputation";
import Invitations from "./pages/dashboard/Invitations";
import ActiveJobs from "./pages/dashboard/ActiveJobs";
import Samples from "./pages/dashboard/Samples";
import Payments from "./pages/dashboard/Payments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();




function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/dashboard/role-activation" element={<ProtectedRoute><RoleActivation /></ProtectedRoute>} />
      <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/dashboard/my-products" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
      <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/dashboard/escrow" element={<ProtectedRoute><Escrow /></ProtectedRoute>} />
      <Route path="/dashboard/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/dashboard/collaborations" element={<ProtectedRoute><Collaborations /></ProtectedRoute>} />
      <Route path="/dashboard/reputation" element={<ProtectedRoute><Reputation /></ProtectedRoute>} />
      
      {/* Additional dashboard pages */}
      <Route path="/dashboard/samples" element={<ProtectedRoute><Samples /></ProtectedRoute>} />
      <Route path="/dashboard/invitations" element={<ProtectedRoute><Invitations /></ProtectedRoute>} />
      <Route path="/dashboard/jobs" element={<ProtectedRoute><ActiveJobs /></ProtectedRoute>} />
      <Route path="/dashboard/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />

      {/* Placeholder routes for remaining dashboard pages */}
      <Route path="/dashboard/suppliers" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/dashboard/production" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/dashboard/sub-suppliers" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/dashboard/quality" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
