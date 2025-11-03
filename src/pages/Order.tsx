import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { BackButton } from "@/components/BackButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Shield, Clock, CheckCircle2, AlertTriangle, Copy, Eye, EyeOff, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { ReviewForm } from "@/components/ReviewForm";

const Order = () => {
  const [showCredentials, setShowCredentials] = useState(false);
  const [timeLeft, setTimeLeft] = useState("11:45:23");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    toast.success("تم تأكيد استلام الحساب بنجاح");
  };

  const handleOpenDispute = () => {
    navigate("/disputes");
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200,70%,15%)] via-[hsl(195,60%,25%)] to-[hsl(200,70%,15%)]" />
      
      {/* Snow particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navbar showDesktopLinks={false} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 max-w-4xl">
        <BackButton fallbackPath="/orders" label="العودة للطلبات" />
        
        <Breadcrumb 
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "طلباتي", href: "/orders" },
            { label: "تفاصيل الطلب" }
          ]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-black text-white">طلب #12458</h1>
            <StatusBadge status="warning" label="قيد المراجعة" />
          </div>
          <p className="text-white/60">تم الشراء بتاريخ 24 مايو 2025</p>
        </div>

        {/* Timer Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[hsl(40,90%,15%)] to-[hsl(40,80%,10%)] border-[hsl(40,90%,55%,0.5)] backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-[hsl(40,90%,55%,0.3)] border border-[hsl(40,90%,55%,0.5)]">
              <Clock className="h-8 w-8 text-[hsl(40,90%,55%)]" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="font-bold text-white text-lg mb-1">فترة الضمان النشطة</h3>
              <p className="text-white/80 text-sm">الوقت المتبقي لفحص الحساب وتأكيد الاستلام</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-3xl font-black text-[hsl(40,90%,55%)]">{timeLeft}</div>
              <div className="text-xs text-white/70 mt-1">ساعة:دقيقة:ثانية</div>
            </div>
          </div>
        </Card>

        {/* Credentials Card */}
        <Card className="p-6 mb-6 bg-white/5 border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">معلومات الحساب</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-[hsl(195,80%,70%)] hover:text-[hsl(195,80%,80%)] hover:bg-white/5"
            >
              {showCredentials ? (
                <>
                  <EyeOff className="h-4 w-4 ml-2" />
                  إخفاء
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 ml-2" />
                  عرض
                </>
              )}
            </Button>
          </div>

          {showCredentials ? (
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">البريد الإلكتروني</span>
                  <Button variant="ghost" size="sm" className="h-8 text-[hsl(195,80%,70%)]">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-mono text-white font-medium">account@example.com</div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">كلمة المرور</span>
                  <Button variant="ghost" size="sm" className="h-8 text-[hsl(195,80%,70%)]">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-mono text-white font-medium">SecurePass123!</div>
              </div>

              <div className="p-4 bg-[hsl(40,90%,55%,0.1)] rounded-lg border border-[hsl(40,90%,55%,0.3)]">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-[hsl(40,90%,55%)] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-white/80">
                    <p className="font-bold mb-1">تحذير هام:</p>
                    <p>قم بتغيير كلمة المرور فوراً بعد تسجيل الدخول. لا تشارك هذه المعلومات مع أي شخص.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">اضغط "عرض" للكشف عن معلومات الحساب</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button 
            size="lg"
            onClick={handleConfirmOrder}
            disabled={orderConfirmed}
            variant="arctic"
            className="gap-2 text-sm md:text-base py-4 md:py-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] touch-manipulation active:scale-95 transition-transform"
          >
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">
              {orderConfirmed ? "تم التأكيد" : "تأكيد - الحساب يعمل بشكل صحيح"}
            </span>
            <span className="md:hidden">
              {orderConfirmed ? "تم التأكيد" : "تأكيد الاستلام"}
            </span>
          </Button>

          <Button 
            size="lg"
            onClick={handleOpenDispute}
            disabled={orderConfirmed}
            variant="arctic-ghost"
            className="gap-2 text-sm md:text-base py-4 md:py-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] touch-manipulation active:scale-95 transition-transform"
          >
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">فتح نزاع - هناك مشكلة</span>
            <span className="md:hidden">فتح نزاع</span>
          </Button>
        </div>
        
        {/* Quick Navigation - Show after order confirmation */}
        {orderConfirmed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <Button 
              asChild
              variant="outline"
              className="bg-white/5 hover:bg-white/10 text-white border-white/20"
            >
              <Link to="/marketplace">
                العودة للسوق
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="bg-white/5 hover:bg-white/10 text-white border-white/20"
            >
              <Link to="/orders">
                عرض جميع الطلبات
              </Link>
            </Button>
          </div>
        )}

        {/* Order Details */}
        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <h3 className="text-xl font-bold text-white mb-4">تفاصيل الطلب</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-white/80">
              <span>اسم الحساب:</span>
              <span className="font-medium">حساب مميز - المستوى 45</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>السيرفر:</span>
              <span className="font-medium">Server 101</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>البائع:</span>
              <span className="font-medium">محمد العتيبي</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>المبلغ المدفوع:</span>
              <span className="font-bold text-[hsl(195,80%,70%)]">1,300 ريال</span>
            </div>
          </div>
        </Card>

        {/* Review Form - Shows after order confirmation */}
        {orderConfirmed && (
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">قيّم تجربتك</h3>
              <p className="text-white/60">ساعد المشترين الآخرين من خلال مشاركة رأيك الصادق</p>
            </div>
            <ReviewForm 
              orderId="12458"
              sellerId="seller-123"
              onSubmit={async (data) => {
                console.log("Review submitted:", data);
                // TODO: Backend integration to save review
                await new Promise(resolve => setTimeout(resolve, 1000));
              }}
            />
          </div>
        )}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[hsl(195,80%,50%,0.1)] rounded-full blur-[120px] animate-pulse pointer-events-none" />
    </div>
  );
};

export default Order;
