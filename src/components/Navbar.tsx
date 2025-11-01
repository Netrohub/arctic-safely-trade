import { Link, useLocation } from "react-router-dom";
import { Snowflake, LogIn } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  showDesktopLinks?: boolean;
}

export const Navbar = ({ showDesktopLinks = true }: NavbarProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const desktopLinks = [
    { path: "/", label: "الرئيسية", protected: false },
    { path: "/marketplace", label: "السوق", protected: false },
    { path: "/wallet", label: "المحفظة", protected: true },
    { path: "/profile", label: "الملف الشخصي", protected: true },
  ];

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10 backdrop-blur-md bg-[hsl(200,70%,15%,0.5)]">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Snowflake className="h-8 w-8 text-[hsl(195,80%,70%)]" />
        <span className="text-xl md:text-2xl font-black text-white">
          NXO<span className="text-[hsl(40,90%,55%)]">Land</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-4">
        {showDesktopLinks && (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            {desktopLinks
              .filter(link => !link.protected || isAuthenticated)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "hover:text-[hsl(195,80%,70%)] transition-colors",
                    isActive(link.path) && "text-[hsl(195,80%,70%)] font-bold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <NotificationBell />
          ) : (
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="hidden md:flex border-[hsl(195,80%,70%)] text-[hsl(195,80%,70%)] hover:bg-[hsl(195,80%,70%)] hover:text-white"
            >
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-2" />
                تسجيل الدخول
              </Link>
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};
