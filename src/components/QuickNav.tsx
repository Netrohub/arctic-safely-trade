import { Link } from "react-router-dom";
import { ShoppingBag, Package, MessageSquare, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const QuickNav = () => {
  const { isAuthenticated } = useAuth();

  const quickLinks = [
    { 
      path: "/marketplace", 
      label: "تصفح السوق", 
      icon: ShoppingBag,
      protected: false,
      color: "bg-primary/15 border-nav-highlight/30 text-nav-highlight"
    },
    { 
      path: "/orders", 
      label: "طلباتي", 
      icon: Package,
      protected: true,
      color: "bg-primary/15 border-nav-highlight/30 text-nav-highlight"
    },
    { 
      path: "/disputes", 
      label: "النزاعات", 
      icon: MessageSquare,
      protected: true,
      color: "bg-destructive/15 border-destructive/30 text-destructive"
    },
    { 
      path: "/help", 
      label: "المساعدة", 
      icon: HelpCircle,
      protected: false,
      color: "bg-nav-accent/15 border-nav-accent/30 text-nav-accent"
    },
  ];

  const visibleLinks = quickLinks.filter(link => !link.protected || isAuthenticated);

  return (
    <div className="fixed bottom-24 md:bottom-8 left-4 z-40 flex flex-col gap-2">
      {visibleLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Button
            key={link.path}
            asChild
            size="icon"
            className={`min-w-12 min-h-12 w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all ${link.color} border backdrop-blur-sm`}
            title={link.label}
          >
            <Link to={link.path}>
              <Icon className="h-5 w-5" />
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
