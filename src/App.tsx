
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ScanReceipt from "./pages/ScanReceipt";
import ItemSelection from "./pages/ItemSelection";
import BillSummary from "./pages/BillSummary";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Leaderboard from "./pages/Leaderboard";
import JoinSession from "./pages/JoinSession";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/scan" element={
              <ProtectedRoute>
                <ScanReceipt />
              </ProtectedRoute>
            } />
            <Route path="/join" element={
              <ProtectedRoute>
                <JoinSession />
              </ProtectedRoute>
            } />
            <Route path="/items" element={
              <ProtectedRoute>
                <ItemSelection />
              </ProtectedRoute>
            } />
            <Route path="/summary" element={
              <ProtectedRoute>
                <BillSummary />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />
            <Route path="/success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
