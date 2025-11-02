import { Link, useLocation } from "react-router-dom";
import { Snowflake, LogIn, ChevronDown } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  showDesktopLinks?: boolean;
}

export const Navbar = ({ showDesktopLinks = true }: NavbarProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10 backdrop-blur-md bg-nav-background/50">
      <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
        <Snowflake className="h-8 w-8 text-nav-highlight animate-pulse" />
        <span className="text-xl md:text-2xl font-black text-white">
          NXO<span className="text-nav-accent">Land</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-4">
        {showDesktopLinks && (
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-nav-highlight/10 hover:text-nav-highlight focus:bg-nav-highlight/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/") ? "bg-nav-highlight/20 text-nav-highlight shadow-glow" : "text-white/90"
                  )}>
                    الرئيسية
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-nav-highlight/10 hover:text-nav-highlight data-[state=open]:bg-nav-highlight/20 data-[state=open]:text-nav-highlight transition-all duration-300">
                  التداول
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-2 p-3 bg-nav-background border border-nav-highlight/20 shadow-arctic backdrop-blur-xl">
                    <li>
                      <Link to="/marketplace" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/marketplace") ? "bg-nav-highlight/20 text-nav-highlight" : "text-white/90"
                      )}>
                        <div className="text-sm font-semibold leading-none">السوق</div>
                        <p className="line-clamp-2 text-xs leading-snug text-white/50 mt-1">
                          تصفح جميع الحسابات المعروضة
                        </p>
                      </Link>
                    </li>
                    {isAuthenticated && (
                      <>
                        <li>
                          <Link to="/sell" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                            isActive("/sell") ? "bg-nav-highlight/20 text-nav-highlight" : "text-white/90"
                          )}>
                            <div className="text-sm font-semibold leading-none">بيع حساب</div>
                            <p className="line-clamp-2 text-xs leading-snug text-white/50 mt-1">
                              أضف حسابك للبيع
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/my-listings" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                            isActive("/my-listings") ? "bg-nav-highlight/20 text-nav-highlight" : "text-white/90"
                          )}>
                            <div className="text-sm font-semibold leading-none">إعلاناتي</div>
                            <p className="line-clamp-2 text-xs leading-snug text-white/50 mt-1">
                              إدارة إعلاناتك
                            </p>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-nav-highlight/10 hover:text-nav-highlight data-[state=open]:bg-nav-highlight/20 data-[state=open]:text-nav-highlight transition-all duration-300">
                  المجتمع
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-2 p-3 bg-nav-background border border-nav-highlight/20 shadow-arctic backdrop-blur-xl">
                    <li>
                      <Link to="/leaderboard" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/leaderboard") ? "bg-nav-highlight/20 text-nav-highlight" : "text-white/90"
                      )}>
                        <div className="text-sm font-semibold leading-none">لوحة المتصدرين</div>
                        <p className="line-clamp-2 text-xs leading-snug text-white/50 mt-1">
                          أفضل البائعين والمشترين
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/members" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/members") ? "bg-nav-highlight/20 text-nav-highlight" : "text-white/90"
                      )}>
                        <div className="text-sm font-semibold leading-none">الأعضاء</div>
                        <p className="line-clamp-2 text-xs leading-snug text-white/50 mt-1">
                          تصفح جميع الأعضاء
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <Link to="/wallet">
                      <NavigationMenuLink className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-nav-highlight/10 hover:text-nav-highlight focus:bg-nav-highlight/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive("/wallet") ? "bg-nav-highlight/20 text-nav-highlight shadow-glow" : "text-white/90"
                      )}>
                        المحفظة
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/profile">
                      <NavigationMenuLink className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-nav-highlight/10 hover:text-nav-highlight focus:bg-nav-highlight/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive("/profile") ? "bg-nav-highlight/20 text-nav-highlight shadow-glow" : "text-white/90"
                      )}>
                        الملف الشخصي
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <NotificationBell />
          ) : (
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="hidden md:flex border-nav-highlight/50 text-nav-highlight hover:bg-nav-highlight hover:text-white hover:border-nav-highlight hover:shadow-glow transition-all duration-300"
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
