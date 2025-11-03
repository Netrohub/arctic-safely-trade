import { Card } from "@/components/ui/card";
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
      price: "$120.00",
      date: "2024-03-05",
      seller: "TopTier",
      server: "NA East",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      case "active":
        return <Clock className="h-4 w-4" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "active":
        return "secondary";
      case "disputed":
        return "destructive";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-muted-foreground">
            View and manage all your orders in one place
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, product, or seller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search" : "You haven't placed any orders yet"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link to="/marketplace">
                    Browse Marketplace
                  </Link>
                </Button>
              )}
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{order.productName}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                      </div>
                      <Badge variant={getStatusVariant(order.status)} className="w-fit gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Seller</p>
                        <p className="font-medium">{order.seller}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Server</p>
                        <p className="font-medium">{order.server}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-medium text-primary">{order.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium">{order.date}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button asChild size="sm" variant="default">
                        <Link to={`/order/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      {order.status === "active" && (
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/disputes`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Seller
                          </Link>
                        </Button>
                      )}
                      {order.status === "disputed" && (
                        <Button asChild size="sm" variant="destructive">
                          <Link to={`/disputes`}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            View Dispute
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
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
    </div>
  );
};

export default Orders;
