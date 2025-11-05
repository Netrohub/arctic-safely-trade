import { Home, Users, Package, ShoppingCart, AlertTriangle, Settings, Menu, Bell, DollarSign, ScrollText, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const items = [
  { title: "لوحة المعلومات", url: "/admin", icon: Home },
  { title: "المستخدمين", url: "/admin/users", icon: Users },
  { title: "الإعلانات", url: "/admin/listings", icon: Package },
  { title: "الطلبات", url: "/admin/orders", icon: ShoppingCart },
  { title: "النزاعات", url: "/admin/disputes", icon: AlertTriangle },
  { title: "المراجعات", url: "/admin/reviews", icon: Star },
  { title: "التقارير المالية", url: "/admin/financial", icon: DollarSign },
  { title: "سجل النشاطات", url: "/admin/activity", icon: ScrollText },
  { title: "الإشعارات", url: "/admin/notifications", icon: Bell },
  { title: "الإعدادات", url: "/admin/settings", icon: Settings },
];

export function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-card to-card-foreground/5 border-b border-border backdrop-blur-sm">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1 px-6 py-3">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 w-full px-6 py-3 text-foreground"
        >
          <Menu className="h-5 w-5" />
          <span className="text-sm font-medium">القائمة</span>
        </button>

        {isMobileMenuOpen && (
          <div className="px-3 pb-3 space-y-1 bg-muted/50">
            {items.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
