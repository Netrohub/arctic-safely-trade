import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Users, AlertTriangle, ShieldCheck, DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AdminNavbar } from "@/components/AdminNavbar";

const Admin = () => {
  const location = useLocation();
  const isRootAdmin = location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(200,70%,15%)] via-[hsl(195,60%,25%)] to-[hsl(200,70%,15%)]" dir="rtl">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[hsl(200,70%,15%,0.95)] backdrop-blur-sm border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Snowflake className="h-8 w-8 text-[hsl(195,80%,70%)]" />
          <span className="text-xl md:text-2xl font-black text-white">
            NXO<span className="text-[hsl(40,90%,55%)]">Land</span>
          </span>
        </Link>
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          لوحة الإدارة
        </Badge>
      </nav>

      {/* Admin Navigation Bar */}
      <AdminNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        {isRootAdmin ? (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">لوحة المعلومات</h1>
              <p className="text-white/60">نظرة عامة على المنصة</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-5 bg-[hsl(195,80%,20%)] border-[hsl(195,80%,50%)] backdrop-blur-sm hover:border-[hsl(195,80%,60%)] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Users className="h-8 w-8 text-[hsl(195,80%,70%)]" />
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">1,248</div>
                <div className="text-sm text-white/90 mb-2">إجمالي المستخدمين</div>
                <div className="text-xs text-emerald-400 font-medium">+12% من الشهر الماضي</div>
              </Card>

              <Card className="p-5 bg-[hsl(280,70%,20%)] border-[hsl(280,70%,50%)] backdrop-blur-sm hover:border-[hsl(280,70%,60%)] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Package className="h-8 w-8 text-[hsl(280,70%,70%)]" />
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">342</div>
                <div className="text-sm text-white/90 mb-2">الإعلانات النشطة</div>
                <div className="text-xs text-emerald-400 font-medium">+8% من الشهر الماضي</div>
              </Card>

              <Card className="p-5 bg-[hsl(40,90%,25%)] border-[hsl(40,90%,50%)] backdrop-blur-sm hover:border-[hsl(40,90%,60%)] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingCart className="h-8 w-8 text-[hsl(40,90%,70%)]" />
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">156</div>
                <div className="text-sm text-white/90 mb-2">الطلبات هذا الشهر</div>
                <div className="text-xs text-emerald-400 font-medium">+23% من الشهر الماضي</div>
              </Card>

              <Card className="p-5 bg-[hsl(120,60%,20%)] border-[hsl(120,60%,50%)] backdrop-blur-sm hover:border-[hsl(120,60%,60%)] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-8 w-8 text-[hsl(120,60%,70%)]" />
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">24,580</div>
                <div className="text-sm text-white/90 mb-2">الإيرادات (ريال)</div>
                <div className="text-xs text-emerald-400 font-medium">+18% من الشهر الماضي</div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <Card className="p-5 bg-[hsl(40,80%,20%)] border-[hsl(40,90%,50%)] backdrop-blur-sm hover:border-[hsl(40,90%,60%)] transition-all max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-[hsl(40,90%,60%)]" />
                  <h2 className="text-xl font-bold text-white">النزاعات المفتوحة</h2>
                  <Badge className="bg-[hsl(40,90%,30%)] text-white border-[hsl(40,90%,50%)] mr-auto">
                    12 نزاع
                  </Badge>
                </div>
                <p className="text-white/80 text-sm mb-4">يوجد 12 نزاع يحتاج إلى مراجعة وحل</p>
                <Link to="/admin/disputes">
                  <button className="w-full py-2 bg-[hsl(40,90%,30%)] hover:bg-[hsl(40,90%,35%)] text-white rounded-lg transition-colors border border-[hsl(40,90%,50%)]">
                    عرض جميع النزاعات
                  </button>
                </Link>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6 bg-[hsl(200,70%,18%)] border-white/20 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">النشاط الأخير</h2>
              <div className="space-y-3">
                {[
                  { action: "مستخدم جديد انضم", user: "أحمد محمد", time: "منذ 5 دقائق", color: "text-[hsl(195,80%,70%)]" },
                  { action: "طلب جديد", user: "سارة علي", time: "منذ 12 دقيقة", color: "text-green-400" },
                  { action: "نزاع تم حله", user: "خالد العتيبي", time: "منذ 30 دقيقة", color: "text-[hsl(280,70%,70%)]" },
                  { action: "إعلان جديد", user: "نورة السعيد", time: "منذ ساعة", color: "text-[hsl(40,90%,70%)]" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20 hover:border-white/30 transition-colors">
                    <div>
                      <div className={`font-medium ${item.color}`}>{item.action}</div>
                      <div className="text-sm text-white/90">{item.user}</div>
                    </div>
                    <div className="text-xs text-white/70">{item.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Admin;
