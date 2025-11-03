import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, Ban, CheckCircle, UserX, ShieldCheck } from "lucide-react";
import { useState } from "react";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const users = [
    { id: 1, name: "محمد أحمد", email: "mohammed@example.com", phone: "+966501234567", status: "active", verified: true, joined: "2025-01-15", orders: 12, totalSpent: 5400, lastActive: "منذ ساعتين" },
    { id: 2, name: "سارة علي", email: "sara@example.com", phone: "+966509876543", status: "active", verified: true, joined: "2025-01-10", orders: 8, totalSpent: 3200, lastActive: "منذ 5 ساعات" },
    { id: 3, name: "خالد العتيبي", email: "khaled@example.com", phone: "+966551234567", status: "suspended", verified: false, joined: "2025-01-08", orders: 3, totalSpent: 1050, lastActive: "منذ يومين" },
    { id: 4, name: "نورة السعيد", email: "noura@example.com", phone: "+966555555555", status: "active", verified: true, joined: "2025-01-05", orders: 15, totalSpent: 7800, lastActive: "منذ 30 دقيقة" },
  ];

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">إدارة المستخدمين</h1>
        <p className="text-white/60">عرض وإدارة جميع مستخدمي المنصة</p>
      </div>

      {/* Search */}
      <Card className="p-4 bg-[hsl(200,70%,18%)] border-white/20 backdrop-blur-sm mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input 
              placeholder="البحث عن مستخدم..."
              className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          <Button className="gap-2 bg-[hsl(195,80%,50%)] hover:bg-[hsl(195,80%,60%)] text-white border-0 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            بحث
          </Button>
        </div>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-5 bg-[hsl(200,70%,18%)] border-white/20 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{user.name}</h3>
                  {user.verified && (
                    <ShieldCheck className="h-5 w-5 text-[hsl(160,60%,50%)]" />
                  )}
                  <StatusBadge 
                    status={user.status === "active" ? "success" : "error"}
                    label={user.status === "active" ? "نشط" : "موقوف"}
                    showIcon={false}
                  />
                </div>
                <div className="text-sm text-white/60 space-y-1">
                  <div>البريد: {user.email}</div>
                  <div className="flex gap-4">
                    <span>تاريخ التسجيل: {user.joined}</span>
                    <span>•</span>
                    <span>عدد الطلبات: {user.orders}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/10">
              <Button 
                size="sm" 
                variant="arctic-ghost"
                className="flex-1 gap-2"
                onClick={() => handleViewDetails(user)}
              >
                <CheckCircle className="h-4 w-4" />
                عرض التفاصيل
              </Button>
              {user.status === "active" ? (
                <Button size="sm" variant="danger" className="gap-2">
                  <Ban className="h-4 w-4" />
                  إيقاف
                </Button>
              ) : (
                <Button size="sm" className="gap-2 bg-[hsl(160,60%,50%)] hover:bg-[hsl(160,60%,60%)] text-white border-0">
                  <CheckCircle className="h-4 w-4" />
                  تفعيل
                </Button>
              )}
              <Button size="sm" variant="danger" className="gap-2">
                <UserX className="h-4 w-4" />
                حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* User Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[hsl(200,70%,15%)] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              {selectedUser?.name}
              {selectedUser?.verified && <ShieldCheck className="h-6 w-6 text-green-400" />}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              معلومات تفصيلية عن المستخدم
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6 mt-4">
              {/* Status Badge */}
              <div className="flex gap-3">
                <StatusBadge 
                  status={selectedUser.status === "active" ? "success" : "error"}
                  label={selectedUser.status === "active" ? "نشط" : "موقوف"}
                />
                {selectedUser.verified && (
                  <StatusBadge 
                    status="success"
                    label="موثق"
                  />
                )}
              </div>

              {/* Contact Information */}
              <Card className="p-4 bg-white/10 border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">معلومات الاتصال</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">البريد الإلكتروني:</span>
                    <span className="text-white">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">رقم الجوال:</span>
                    <span className="text-white">{selectedUser.phone}</span>
                  </div>
                </div>
              </Card>

              {/* Activity Statistics */}
              <Card className="p-4 bg-white/10 border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">إحصائيات النشاط</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white">{selectedUser.orders}</div>
                    <div className="text-sm text-white/60">إجمالي الطلبات</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{selectedUser.totalSpent} ريال</div>
                    <div className="text-sm text-white/60">إجمالي المشتريات</div>
                  </div>
                  <div>
                    <div className="text-sm text-[hsl(195,80%,80%)]">{selectedUser.joined}</div>
                    <div className="text-sm text-white/60">تاريخ التسجيل</div>
                  </div>
                  <div>
                    <div className="text-sm text-[hsl(195,80%,80%)]">{selectedUser.lastActive}</div>
                    <div className="text-sm text-white/60">آخر نشاط</div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {selectedUser.status === "active" ? (
                  <Button variant="danger" className="flex-1 gap-2">
                    <Ban className="h-4 w-4" />
                    إيقاف المستخدم
                  </Button>
                ) : (
                  <Button className="flex-1 gap-2 bg-[hsl(160,60%,50%)] hover:bg-[hsl(160,60%,60%)] text-white border-0">
                    <CheckCircle className="h-4 w-4" />
                    تفعيل المستخدم
                  </Button>
                )}
                <Button variant="danger" className="flex-1 gap-2">
                  <UserX className="h-4 w-4" />
                  حذف المستخدم
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
