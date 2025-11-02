import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { ErrorState } from "@/components/ErrorState";
import { 
  Star, 
  TrendingUp, 
  Filter,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "react-router-dom";

// Mock data - replace with actual API calls
const mockReviews = [
  {
    id: "1",
    rating: 5,
    comment: "بائع ممتاز، الحساب كما في الوصف تماماً. التسليم كان سريع والتواصل احترافي. أنصح بالتعامل معه بشدة!",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: {
      name: "أحمد محمد",
      verified: true,
    },
    order_id: "ORD-001",
    helpful_count: 12,
    user_found_helpful: false,
  },
  {
    id: "2",
    rating: 4,
    comment: "حساب جيد، لكن التسليم تأخر قليلاً. البائع متعاون وحل المشكلة بسرعة.",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: {
      name: "فاطمة علي",
      verified: true,
    },
    order_id: "ORD-002",
    helpful_count: 8,
    user_found_helpful: true,
  },
  {
    id: "3",
    rating: 5,
    comment: "تجربة رائعة! الحساب أفضل مما توقعت. شكراً للبائع على الصدق والأمانة.",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    reviewer: {
      name: "عمر خالد",
      verified: false,
    },
    order_id: "ORD-003",
    helpful_count: 15,
    user_found_helpful: false,
  },
];

const mockStats = {
  average_rating: 4.8,
  total_reviews: 127,
  rating_distribution: {
    5: 89,
    4: 28,
    3: 7,
    2: 2,
    1: 1,
  },
};

const Reviews = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const reviews = mockReviews;
  const stats = mockStats;

  const getRatingPercentage = (count: number) => {
    return ((count / stats.total_reviews) * 100).toFixed(0);
  };

  const filteredReviews = reviews.filter(review => {
    if (activeFilter === "all") return true;
    return review.rating === parseInt(activeFilter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "helpful":
        return (b.helpful_count || 0) - (a.helpful_count || 0);
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200,70%,15%)] via-[hsl(195,60%,25%)] to-[hsl(200,70%,15%)]" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 max-w-6xl pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            التقييمات والمراجعات
          </h1>
          <p className="text-white/60">آراء المشترين السابقين</p>
        </div>

        {/* Rating Overview */}
        <Card className="p-6 md:p-8 bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="text-6xl font-black text-white">
                  {stats.average_rating.toFixed(1)}
                </div>
                <div>
                  <StarRating rating={stats.average_rating} readonly size="lg" />
                  <p className="text-white/60 text-sm mt-1">
                    بناءً على {stats.total_reviews} تقييم
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-bold">98% تقييمات إيجابية</span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-white font-bold">{rating}</span>
                    <Star className="h-4 w-4 text-[hsl(40,90%,55%)] fill-current" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[hsl(40,90%,55%)] h-full rounded-full transition-all"
                      style={{ width: `${getRatingPercentage(stats.rating_distribution[rating as keyof typeof stats.rating_distribution])}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-sm w-12 text-left">
                    {stats.rating_distribution[rating as keyof typeof stats.rating_distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white/5 border border-white/10">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-[hsl(195,80%,50%)] data-[state=active]:text-white text-white/70 text-sm"
              >
                الكل
              </TabsTrigger>
              {[5, 4, 3, 2, 1].map((rating) => (
                <TabsTrigger 
                  key={rating}
                  value={rating.toString()}
                  className="data-[state=active]:bg-[hsl(195,80%,50%)] data-[state=active]:text-white text-white/70 text-sm"
                >
                  {rating} <Star className="h-3 w-3 inline mr-1" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-2 bg-white/5 hover:bg-white/10 text-white border-white/20 min-h-[48px] w-full md:w-auto"
              >
                <Filter className="h-4 w-4" />
                {sortBy === "recent" && "الأحدث"}
                {sortBy === "helpful" && "الأكثر فائدة"}
                {sortBy === "rating-high" && "التقييم: الأعلى"}
                {sortBy === "rating-low" && "التقييم: الأدنى"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[hsl(200,70%,20%)] border-white/10 min-w-[200px]">
              <DropdownMenuItem 
                onClick={() => setSortBy("recent")}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                الأحدث
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy("helpful")}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                الأكثر فائدة
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy("rating-high")}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                التقييم: الأعلى أولاً
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy("rating-low")}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                التقييم: الأدنى أولاً
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6 bg-white/5 border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 bg-white/10" />
                    <Skeleton className="h-3 w-24 bg-white/10" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full bg-white/10 mb-4" />
                <Skeleton className="h-8 w-40 bg-white/10" />
              </Card>
            ))}
          </div>
        ) : sortedReviews.length > 0 ? (
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onHelpful={(id) => {
                  console.log("Mark helpful:", id);
                  // TODO: Backend integration
                }}
                onReport={(id) => {
                  console.log("Report review:", id);
                  // TODO: Backend integration
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-white/5 border-white/10 border-dashed text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-white/30" />
            <p className="text-white/60">لا توجد تقييمات في هذه الفئة</p>
          </Card>
        )}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[hsl(195,80%,50%,0.1)] rounded-full blur-[120px] animate-pulse pointer-events-none" />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Reviews;
