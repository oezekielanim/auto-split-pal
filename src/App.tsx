
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scan" element={<ScanReceipt />} />
          <Route path="/join" element={<JoinSession />} />
          <Route path="/items" element={<ItemSelection />} />
          <Route path="/summary" element={<BillSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
