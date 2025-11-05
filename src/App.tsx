import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationBanner } from "@/components/NotificationBanner";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Members from "./pages/Members";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Sell from "./pages/Sell";
import Gaming from "./pages/sell/Gaming";
import Social from "./pages/sell/Social";
import SellWOS from "./pages/sell/SellWOS";
import TikTok from "./pages/sell/social/TikTok";
import InstagramSell from "./pages/sell/social/Instagram";
import MyListings from "./pages/MyListings";
import Disputes from "./pages/Disputes";
import DisputeDetails from "./pages/DisputeDetails";
import KYC from "./pages/KYC";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/admin/Users";
import AdminListings from "./pages/admin/Listings";
import AdminOrders from "./pages/admin/Orders";
import AdminDisputes from "./pages/admin/Disputes";
import AdminSettings from "./pages/admin/Settings";
import AdminNotifications from "./pages/admin/Notifications";
import About from "./pages/About";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Security from "./pages/Security";
import Wallet from "./pages/Wallet";
import Suggestions from "./pages/Suggestions";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useKeyboardShortcuts();
  
  return (
    <>
      <NotificationBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/members" element={<Members />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/sell/gaming" element={<Gaming />} />
        <Route path="/sell/gaming/wos" element={<SellWOS />} />
        <Route path="/sell/social" element={<Social />} />
        <Route path="/sell/social/tiktok" element={<TikTok />} />
        <Route path="/sell/social/instagram" element={<InstagramSell />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/disputes" element={<Disputes />} />
        <Route path="/dispute/:id" element={<DisputeDetails />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="disputes" element={<AdminDisputes />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/security" element={<Security />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/reviews/:userId" element={<Reviews />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
