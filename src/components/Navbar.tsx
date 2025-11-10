import { Link, useLocation } from "react-router-dom";
import { Snowflake, LogIn, ChevronDown } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { MobileNav } from "@/components/MobileNav";
import { GlobalSearch } from "@/components/GlobalSearch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12 border-b border-border backdrop-blur-md bg-nav-background/50">
      <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300 order-1">
        <img 
          src="/nxoland-logo-main.png" 
          alt="NXOLand Logo" 
          className="h-16 md:h-20 w-auto object-contain"
        />
      </Link>
      
      <div className="flex items-center gap-4">
        {showDesktopLinks && (
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-nav-highlight/10 hover:text-nav-highlight focus:bg-nav-highlight/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/") ? "bg-nav-highlight/20 text-nav-highlight shadow-glow" : "text-muted-foreground"
                  )}>
                    {t('nav.home')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-nav-highlight/10 hover:text-nav-highlight data-[state=open]:bg-nav-highlight/20 data-[state=open]:text-nav-highlight transition-all duration-300">
                  {t('nav.marketplace')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-2 p-3 bg-nav-background/95 border border-nav-highlight/20 shadow-arctic backdrop-blur-xl z-50">
                    <li>
                      <Link to="/marketplace" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/marketplace") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                      )}>
                        <div className="text-sm font-semibold leading-none">{t('nav.marketplace')}</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                          {t('home.hero.browseAccounts')}
                        </p>
                      </Link>
                    </li>
                    {isAuthenticated && (
                      <>
                        <li>
                          <Link to="/sell" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                            isActive("/sell") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                          )}>
                            <div className="text-sm font-semibold leading-none">{t('nav.sell')}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                              {t('sell.subtitle')}
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/my-listings" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                            isActive("/my-listings") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                          )}>
                            <div className="text-sm font-semibold leading-none">{t('nav.myListings')}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                              {t('sell.subtitle')}
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                            isActive("/orders") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                          )}>
                            <div className="text-sm font-semibold leading-none">{t('nav.orders')}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                              {t('home.hero.browseAccounts')}
                            </p>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-nav-highlight/10 hover:text-nav-highlight data-[state=open]:bg-nav-highlight/20 data-[state=open]:text-nav-highlight transition-all duration-300">
                  {t('nav.members')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-2 p-3 bg-nav-background/95 border border-nav-highlight/20 shadow-arctic backdrop-blur-xl z-50">
                    <li>
                      <Link to="/leaderboard" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/leaderboard") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                      )}>
                        <div className="text-sm font-semibold leading-none">{t('nav.leaderboard')}</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                          {t('nav.members')}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/members" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/members") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                      )}>
                        <div className="text-sm font-semibold leading-none">{t('nav.members')}</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                          {t('home.hero.browseAccounts')}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/suggestions" className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-nav-highlight/15 hover:text-nav-highlight hover:shadow-glow",
                        isActive("/suggestions") ? "bg-nav-highlight/20 text-nav-highlight" : "text-muted-foreground"
                      )}>
                        <div className="text-sm font-semibold leading-none">{t('nav.help')}</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1">
                          {t('home.footer.support')}
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
                        isActive("/wallet") ? "bg-nav-highlight/20 text-nav-highlight shadow-glow" : "text-muted-foreground"
                      )}>
                        {t('nav.wallet')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/profile">
                      <NavigationMenuLink className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-nav-highlight/10 hover:text-nav-highlight focus:bg-nav-highlight/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive("/profile") ? "bg-nav-highlight/20 text-nav-highlight shadow-glow" : "text-muted-foreground"
                      )}>
                        {t('nav.profile')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <GlobalSearch />
          {isAuthenticated ? (
            <NotificationBell />
          ) : (
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="hidden md:flex border-nav-highlight/50 text-nav-highlight hover:bg-nav-highlight hover:text-primary-foreground hover:border-nav-highlight hover:shadow-glow transition-all duration-300"
            >
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-2" />
                {t('nav.login')}
              </Link>
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};
