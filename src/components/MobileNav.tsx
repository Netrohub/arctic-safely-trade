import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, Plus, Users, Trophy, Bell, User, HelpCircle, Wallet, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "الرئيسية", icon: Home, protected: false },
    { path: "/marketplace", label: "السوق", icon: ShoppingBag, protected: false },
    { path: "/wallet", label: "المحفظة", icon: Wallet, protected: true },
    { path: "/sell", label: "إضافة حساب", icon: Plus, protected: true },
    { path: "/members", label: "الأعضاء", icon: Users, protected: false },
    { path: "/leaderboard", label: "المتصدرين", icon: Trophy, protected: false },
    { path: "/notifications", label: "الإشعارات", icon: Bell, protected: true },
    { path: "/profile", label: "الملف الشخصي", icon: User, protected: true },
    { path: "/help", label: "المساعدة", icon: HelpCircle, protected: false },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground hover:bg-muted min-h-[44px] min-w-[44px]"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-card border-border backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-foreground">القائمة</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="text-foreground hover:bg-muted min-h-[44px] min-w-[44px]"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {!isAuthenticated && (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold mb-2 min-h-[44px]"
            >
              <LogIn className="h-5 w-5" />
              <span>تسجيل الدخول</span>
            </Link>
          )}
          {navItems
            .filter(item => !item.protected || isAuthenticated)
            .map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all min-h-[44px] ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </nav>

        <Separator className="my-6 bg-border" />

        <div className="space-y-2">
          <Link
            to="/terms"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            الشروط والأحكام
          </Link>
          <Link
            to="/privacy"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            سياسة الخصوصية
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
