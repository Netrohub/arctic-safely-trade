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
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10 backdrop-blur-md bg-[hsl(200,70%,15%,0.5)]">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Snowflake className="h-8 w-8 text-[hsl(195,80%,70%)]" />
        <span className="text-xl md:text-2xl font-black text-white">
          NXO<span className="text-[hsl(40,90%,55%)]">Land</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-4">
        {showDesktopLinks && (
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)] focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/") && "bg-white/10 text-[hsl(195,80%,70%)]"
                  )}>
                    الرئيسية
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-[hsl(195,80%,70%)] data-[state=open]:bg-white/10">
                  التداول
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 bg-[hsl(200,70%,15%)] border border-white/10">
                    <li>
                      <Link to="/marketplace" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)]",
                        isActive("/marketplace") && "bg-white/10 text-[hsl(195,80%,70%)]"
                      )}>
                        <div className="text-sm font-medium leading-none">السوق</div>
                        <p className="line-clamp-2 text-sm leading-snug text-white/60">
                          تصفح جميع الحسابات المعروضة
                        </p>
                      </Link>
                    </li>
                    {isAuthenticated && (
                      <>
                        <li>
                          <Link to="/sell" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)]",
                            isActive("/sell") && "bg-white/10 text-[hsl(195,80%,70%)]"
                          )}>
                            <div className="text-sm font-medium leading-none">بيع حساب</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/60">
                              أضف حسابك للبيع
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/my-listings" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)]",
                            isActive("/my-listings") && "bg-white/10 text-[hsl(195,80%,70%)]"
                          )}>
                            <div className="text-sm font-medium leading-none">إعلاناتي</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/60">
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
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-[hsl(195,80%,70%)] data-[state=open]:bg-white/10">
                  المجتمع
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 bg-[hsl(200,70%,15%)] border border-white/10">
                    <li>
                      <Link to="/leaderboard" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)]",
                        isActive("/leaderboard") && "bg-white/10 text-[hsl(195,80%,70%)]"
                      )}>
                        <div className="text-sm font-medium leading-none">لوحة المتصدرين</div>
                        <p className="line-clamp-2 text-sm leading-snug text-white/60">
                          أفضل البائعين والمشترين
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/members" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)]",
                        isActive("/members") && "bg-white/10 text-[hsl(195,80%,70%)]"
                      )}>
                        <div className="text-sm font-medium leading-none">الأعضاء</div>
                        <p className="line-clamp-2 text-sm leading-snug text-white/60">
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
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)] focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive("/wallet") && "bg-white/10 text-[hsl(195,80%,70%)]"
                      )}>
                        المحفظة
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/profile">
                      <NavigationMenuLink className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-[hsl(195,80%,70%)] focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive("/profile") && "bg-white/10 text-[hsl(195,80%,70%)]"
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
