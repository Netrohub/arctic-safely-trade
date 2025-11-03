import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  User, 
  Package, 
  Upload, 
  Send,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const DisputeDetails = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Mock dispute data - replace with real API call
  const dispute = {
    id: "DIS-001",
    orderId: "ORD-001",
    productName: "Whiteout Survival - Lv.8 Account",
    status: "open",
    statusArabic: "مفتوح",
    priority: "high",
    priorityArabic: "عالي",
    createdDate: "2024-03-15",
    buyer: "Ahmad123",
    seller: "ProGamer",
    reason: "حساب مخالف للوصف",
    description: "الحساب المستلم لا يطابق الوصف المعلن. المستوى المذكور كان 8 لكن الحساب الفعلي مستوى 6.",
  };

  // Mock conversation history
  const timeline = [
    {
      id: 1,
      type: "dispute_opened",
      user: "Ahmad123",
      role: "buyer",
      roleArabic: "مشتري",
      date: "2024-03-15 10:30",
      message: "قمت بفتح نزاع بخصوص هذا الطلب. الحساب المستلم لا يطابق الوصف.",
    },
    {
      id: 2,
      type: "evidence",
      user: "Ahmad123",
      role: "buyer",
      roleArabic: "مشتري",
      date: "2024-03-15 10:32",
      message: "إرفاق صور توضح مستوى الحساب الفعلي",
      attachments: [
        { type: "image", name: "screenshot1.jpg" },
        { type: "image", name: "screenshot2.jpg" },
      ],
    },
    {
      id: 3,
      type: "response",
      user: "ProGamer",
      role: "seller",
      roleArabic: "بائع",
      date: "2024-03-15 11:15",
      message: "الحساب كان مستوى 8 عند إرساله. ربما حدث خطأ في التسليم.",
    },
    {
      id: 4,
      type: "admin_review",
      user: "Admin",
      role: "admin",
      roleArabic: "إدارة",
      date: "2024-03-15 14:00",
      message: "جاري مراجعة النزاع والأدلة المقدمة من الطرفين. سيتم الرد خلال 24 ساعة.",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("الرجاء كتابة رسالة");
      return;
    }
    toast.success("تم إرسال الرسالة");
    setMessage("");
  };

  const handleUploadEvidence = () => {
    toast.info("سيتم إضافة ميزة رفع الملفات قريباً");
  };

  const getStatusColor = (status: string) => {
    // Not needed anymore - using StatusBadge component
    return "";
  };

  const getStatusType = (status: string): "success" | "warning" | "error" | "info" | "pending" => {
    switch (status) {
      case "open":
        return "warning";
      case "in_review":
        return "info";
      case "resolved":
        return "success";
      case "closed":
        return "info";
      default:
        return "info";
    }
  };

  const getUserStatusType = (role: string): "success" | "warning" | "error" | "info" | "pending" => {
    switch (role) {
      case "buyer":
        return "info";
      case "seller":
        return "warning";
      case "admin":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Icy background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200,70%,15%)] via-[hsl(195,60%,25%)] to-[hsl(200,70%,15%)]" />
      
      {/* Animated snow particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Frost overlay effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[hsl(195,80%,50%,0.05)] to-transparent opacity-40" />

      <Navbar />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        {/* Back Button */}
        <Button 
          asChild 
          variant="ghost" 
          className="mb-6 text-[hsl(195,80%,70%)] hover:bg-white/10"
        >
          <Link to="/disputes">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للنزاعات
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_0_30px_rgba(148,209,240,0.5)] mb-2">
                نزاع #{id}
              </h1>
              <p className="text-white/70">
                رقم الطلب: {dispute.orderId}
              </p>
            </div>
            <div className="flex gap-2">
              <StatusBadge 
                status={getStatusType(dispute.status)} 
                label={dispute.statusArabic}
              />
              <StatusBadge 
                status="error" 
                label={`أولوية ${dispute.priorityArabic}`}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dispute Info */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-[hsl(195,80%,70%)]" />
                تفاصيل النزاع
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">المنتج</p>
                  <p className="text-white font-medium">{dispute.productName}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">السبب</p>
                  <p className="text-white font-medium">{dispute.reason}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">الوصف</p>
                  <p className="text-white/90 leading-relaxed">{dispute.description}</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <h2 className="text-xl font-bold text-white mb-6">سجل المحادثة</h2>
              <div className="space-y-6">
                {timeline.map((event) => (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {event.id !== timeline.length && (
                      <div className="absolute right-4 top-12 bottom-0 w-0.5 bg-[hsl(195,80%,70%,0.2)]" />
                    )}
                    
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(195,80%,50%)] to-[hsl(200,70%,20%)] flex items-center justify-center border-2 border-[hsl(195,80%,70%,0.3)]">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-white">{event.user}</span>
                          <StatusBadge 
                            status={getUserStatusType(event.role)} 
                            label={event.roleArabic}
                            showIcon={false}
                            className="text-xs"
                          />
                          <span className="text-white/50 text-sm mr-auto">{event.date}</span>
                        </div>
                        
                        <Card className="p-4 bg-white/5 border-[hsl(195,80%,70%,0.1)]">
                          <p className="text-white/90 leading-relaxed">{event.message}</p>
                          
                          {/* Attachments */}
                          {event.attachments && event.attachments.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {event.attachments.map((attachment, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-[hsl(195,80%,70%,0.2)] hover:border-[hsl(195,80%,70%)] transition-all cursor-pointer"
                                  onClick={() => setEnlargedImage(attachment.name)}
                                >
                                  {attachment.type === "image" ? (
                                    <ImageIcon className="h-4 w-4 text-[hsl(195,80%,70%)]" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-[hsl(195,80%,70%)]" />
                                  )}
                                  <span className="text-sm text-white">{attachment.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Response Form */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <h2 className="text-xl font-bold text-white mb-4">إضافة رد</h2>
              <div className="space-y-4">
                <Textarea
                  placeholder="اكتب ردك هنا..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] bg-[hsl(200,70%,20%)] border-[hsl(195,80%,70%,0.3)] text-white placeholder:text-white/50 resize-none"
                />
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={handleSendMessage}
                    variant="arctic"
                  >
                    <Send className="h-4 w-4 ml-2" />
                    إرسال الرد
                  </Button>
                  <Button 
                    onClick={handleUploadEvidence}
                    variant="arctic-ghost"
                  >
                    <Upload className="h-4 w-4 ml-2" />
                    رفع دليل
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dispute Parties */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <h3 className="font-bold text-white mb-4">أطراف النزاع</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(195,80%,50%)] to-[hsl(200,70%,20%)] flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{dispute.buyer}</p>
                    <p className="text-white/60 text-sm">المشتري</p>
                  </div>
                </div>
                <div className="h-px bg-[hsl(195,80%,70%,0.2)]" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(280,70%,55%)] to-[hsl(280,70%,35%)] flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{dispute.seller}</p>
                    <p className="text-white/60 text-sm">البائع</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <h3 className="font-bold text-white mb-4">إجراءات سريعة</h3>
              <div className="space-y-2">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full justify-start bg-white/5 hover:bg-white/10 text-white border-[hsl(195,80%,70%,0.2)]"
                >
                  <Link to={`/order/${dispute.orderId}`}>
                    <Package className="h-4 w-4 ml-2" />
                    عرض تفاصيل الطلب
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white/5 hover:bg-white/10 text-white border-[hsl(195,80%,70%,0.2)]"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  تحميل الأدلة
                </Button>
              </div>
            </Card>

            {/* Status Info */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <h3 className="font-bold text-white mb-4">معلومات الحالة</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">تاريخ الفتح</span>
                  <span className="text-white">{dispute.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">الحالة</span>
                  <span className="text-[hsl(195,80%,70%)]">{dispute.statusArabic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">الأولوية</span>
                  <span className="text-[hsl(0,70%,65%)]">{dispute.priorityArabic}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[hsl(195,80%,50%,0.1)] rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[hsl(195,80%,50%,0.1)] rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none" />
    </div>
  );
};

export default DisputeDetails;
