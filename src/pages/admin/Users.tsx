import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Ban, CheckCircle, UserX, ShieldCheck, Shield } from "lucide-react";
import { useState } from "react";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const users = [
    { id: 1, name: "محمد أحمد", email: "mohammed@example.com", phone: "+966501234567", status: "active", verified: true, joined: "2025-01-15", orders: 12, totalSpent: 5400, lastActive: "منذ ساعتين", role: "user", roleLabel: "مستخدم" },
    { id: 2, name: "سارة علي", email: "sara@example.com", phone: "+966509876543", status: "active", verified: true, joined: "2025-01-10", orders: 8, totalSpent: 3200, lastActive: "منذ 5 ساعات", role: "moderator", roleLabel: "مشرف" },
    { id: 3, name: "خالد العتيبي", email: "khaled@example.com", phone: "+966551234567", status: "suspended", verified: false, joined: "2025-01-08", orders: 3, totalSpent: 1050, lastActive: "منذ يومين", role: "user", roleLabel: "مستخدم" },
    { id: 4, name: "نورة السعيد", email: "noura@example.com", phone: "+966555555555", status: "active", verified: true, joined: "2025-01-05", orders: 15, totalSpent: 7800, lastActive: "منذ 30 دقيقة", role: "admin", roleLabel: "مدير" },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-destructive/20 text-destructive border-destructive/30";
      case "moderator": return "bg-accent/20 text-accent border-accent/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-foreground mb-2">إدارة المستخدمين</h1>
        <p className="text-muted-foreground">عرض وإدارة جميع مستخدمي المنصة</p>
      </div>

      {/* Search */}
      <Card className="p-4 bg-card border-border backdrop-blur-sm mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="البحث عن مستخدم..."
              className="pr-10 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
            بحث
          </Button>
        </div>
      </Card>

      {/* Users List */}
      <div className="space-y-4 overflow-x-auto">
        {users.map((user) => (
          <Card key={user.id} className="p-5 bg-card border-border backdrop-blur-sm min-w-[600px]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                  {user.verified && (
                    <ShieldCheck className="h-5 w-5 text-success" />
                  )}
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.roleLabel}
                  </Badge>
                  <StatusBadge 
                    status={user.status === "active" ? "success" : "error"}
                    label={user.status === "active" ? "نشط" : "موقوف"}
                    showIcon={false}
                  />
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>البريد: {user.email}</div>
                  <div className="flex gap-4">
                    <span>تاريخ التسجيل: {user.joined}</span>
                    <span>•</span>
                    <span>عدد الطلبات: {user.orders}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex gap-2">
                <Select defaultValue={user.role}>
                  <SelectTrigger className="flex-1 bg-muted border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">مستخدم</SelectItem>
                    <SelectItem value="moderator">مشرف</SelectItem>
                    <SelectItem value="admin">مدير</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="gap-2 min-w-[44px] min-h-[44px] bg-success/20 text-success border-success/30 hover:bg-success/30">
                  <Shield className="h-4 w-4" />
                  تطبيق
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm" 
                  variant="arctic-ghost"
                  className="flex-1 gap-2 min-w-[44px] min-h-[44px]"
                  onClick={() => handleViewDetails(user)}
                >
                  <CheckCircle className="h-4 w-4" />
                  عرض التفاصيل
                </Button>
                {user.status === "active" ? (
                  <Button size="sm" variant="danger" className="gap-2 min-w-[44px] min-h-[44px]">
                    <Ban className="h-4 w-4" />
                    إيقاف
                  </Button>
                ) : (
                  <Button size="sm" className="gap-2 min-w-[44px] min-h-[44px] bg-success hover:bg-success/90 text-success-foreground border-0">
                    <CheckCircle className="h-4 w-4" />
                    تفعيل
                  </Button>
                )}
                <Button size="sm" variant="danger" className="gap-2 min-w-[44px] min-h-[44px]">
                  <UserX className="h-4 w-4" />
                  حذف
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* User Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              {selectedUser?.name}
              {selectedUser?.verified && <ShieldCheck className="h-6 w-6 text-success" />}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
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
              <Card className="p-4 bg-muted/50 border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">معلومات الاتصال</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">البريد الإلكتروني:</span>
                    <span className="text-foreground">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رقم الجوال:</span>
                    <span className="text-foreground">{selectedUser.phone}</span>
                  </div>
                </div>
              </Card>

              {/* Activity Statistics */}
              <Card className="p-4 bg-muted/50 border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">إحصائيات النشاط</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{selectedUser.orders}</div>
                    <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{selectedUser.totalSpent} ريال</div>
                    <div className="text-sm text-muted-foreground">إجمالي المشتريات</div>
                  </div>
                  <div>
                    <div className="text-sm text-nav-highlight">{selectedUser.joined}</div>
                    <div className="text-sm text-muted-foreground">تاريخ التسجيل</div>
                  </div>
                  <div>
                    <div className="text-sm text-nav-highlight">{selectedUser.lastActive}</div>
                    <div className="text-sm text-muted-foreground">آخر نشاط</div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {selectedUser.status === "active" ? (
                  <Button variant="danger" className="flex-1 gap-2 min-w-[44px] min-h-[44px]">
                    <Ban className="h-4 w-4" />
                    إيقاف المستخدم
                  </Button>
                ) : (
                  <Button className="flex-1 gap-2 min-w-[44px] min-h-[44px] bg-success hover:bg-success/90 text-success-foreground border-0">
                    <CheckCircle className="h-4 w-4" />
                    تفعيل المستخدم
                  </Button>
                )}
                <Button variant="danger" className="flex-1 gap-2 min-w-[44px] min-h-[44px]">
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
