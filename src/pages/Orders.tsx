import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Package, Search, Eye, MessageSquare, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock orders data - replace with real API call
  const orders = [
    {
      id: "ORD-001",
      productName: "Whiteout Survival - Lv.8 Account",
      productImage: "/placeholder.svg",
      status: "delivered",
      statusArabic: "تم التسليم",
      price: "$45.00",
      date: "2024-03-15",
      seller: "JohnDoe123",
      server: "Server 1",
    },
    {
      id: "ORD-002",
      productName: "Epic Account Package",
      productImage: "/placeholder.svg",
      status: "active",
      statusArabic: "نشط",
      price: "$89.99",
      date: "2024-03-18",
      seller: "ProSeller",
      server: "EU West",
    },
    {
      id: "ORD-003",
      productName: "Starter Bundle",
      productImage: "/placeholder.svg",
      status: "disputed",
      statusArabic: "نزاع",
      price: "$25.00",
      date: "2024-03-10",
      seller: "GameMaster",
      server: "Asia",
    },
    {
      id: "ORD-004",
      productName: "Premium Account Lv.12",
      productImage: "/placeholder.svg",
      status: "cancelled",
      statusArabic: "ملغي",
      price: "$120.00",
      date: "2024-03-05",
      seller: "TopTier",
      server: "NA East",
    },
  ];

  const getStatusIcon = (status: string) => {
    // Icons handled by StatusBadge component
    return null;
  };

  const getStatusType = (status: string): "success" | "warning" | "error" | "info" | "pending" => {
    switch (status) {
      case "delivered":
        return "success";
      case "active":
        return "info";
      case "disputed":
        return "error";
      case "cancelled":
        return "warning";
      default:
        return "info";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-3 text-white drop-shadow-[0_0_30px_rgba(148,209,240,0.5)]">
            طلباتي
          </h1>
          <p className="text-white/70 text-lg">
            عرض وإدارة جميع مشترياتك
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 p-4 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(195,80%,70%)]" />
              <Input
                placeholder="ابحث برقم الطلب، المنتج، أو البائع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[hsl(200,70%,20%)] border-[hsl(195,80%,70%,0.3)] text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)]">
              <Package className="h-16 w-16 mx-auto mb-4 text-[hsl(195,80%,70%)]/50" />
              <h3 className="text-xl font-bold mb-2 text-white">لا توجد طلبات</h3>
              <p className="text-white/70 mb-6">
                {searchQuery ? "حاول تعديل البحث" : "لم تقم بأي عمليات شراء بعد"}
              </p>
              {!searchQuery && (
                <Button asChild className="bg-[hsl(195,80%,50%)] hover:bg-[hsl(195,80%,60%)] text-white shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                  <Link to="/marketplace">
                    تصفح السوق
                  </Link>
                </Button>
              )}
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-6 bg-white/5 backdrop-blur-sm border-[hsl(195,80%,70%,0.2)] hover:border-[hsl(195,80%,70%)] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 rounded-lg bg-gradient-to-br from-[hsl(195,80%,50%,0.2)] to-[hsl(200,70%,20%)] flex items-center justify-center shrink-0 border border-[hsl(195,80%,70%,0.2)]">
                    <Package className="h-12 w-12 text-[hsl(195,80%,70%)]" />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white">{order.productName}</h3>
                        </div>
                        <p className="text-sm text-white/60">رقم الطلب: {order.id}</p>
                      </div>
                      <StatusBadge 
                        status={getStatusType(order.status)} 
                        label={order.statusArabic}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">البائع</p>
                        <p className="font-medium text-white">{order.seller}</p>
                      </div>
                      <div>
                        <p className="text-white/60">السيرفر</p>
                        <p className="font-medium text-white">{order.server}</p>
                      </div>
                      <div>
                        <p className="text-white/60">السعر</p>
                        <p className="font-medium text-[hsl(195,80%,70%)]">{order.price}</p>
                      </div>
                      <div>
                        <p className="text-white/60">التاريخ</p>
                        <p className="font-medium text-white">{order.date}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button asChild size="sm" variant="arctic">
                        <Link to={`/order/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          عرض التفاصيل
                        </Link>
                      </Button>
                      {order.status === "active" && (
                        <Button asChild size="sm" variant="arctic-ghost">
                          <Link to={`/disputes`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            التواصل مع البائع
                          </Link>
                        </Button>
                      )}
                      {order.status === "disputed" && (
                        <Button asChild size="sm" variant="danger">
                          <Link to={`/dispute/${order.id.replace('ORD-', 'DIS-')}`}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            عرض النزاع
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[hsl(195,80%,50%,0.1)] rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[hsl(195,80%,50%,0.1)] rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none" />
    </div>
  );
};

export default Orders;
