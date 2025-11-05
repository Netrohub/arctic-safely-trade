import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/BackButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Shield, Star, CheckCircle2, Users, Heart, Eye, Mail, Phone, Video, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { useLanguage } from "@/contexts/LanguageContext";
import tiktokLogo from "@/assets/tiktok-logo.png";

const SocialProductExample = () => {
  const { t, language } = useLanguage();

  // Example social media account data
  const accountData = {
    platform: "TikTok",
    username: "@example_creator",
    price: 2500,
    description: "Premium TikTok account focused on fitness and lifestyle content. High engagement rate with active and loyal followers. Perfect for brands or influencers looking to expand their reach in the fitness niche.",
    stats: {
      followers: 125000,
      likes: 2500000,
      views: 5000000,
    },
    hasPrimaryEmail: true,
    hasPhoneNumber: true,
    niche: "Fitness & Lifestyle",
    contentType: "Educational & Entertainment",
    avgViews: "50K-100K per video",
    engagementRate: "8.5%",
  };

  const sellerInfo = {
    name: "Ahmed Ali",
    rating: 4.9,
    totalSales: 47,
    memberSince: "2023",
    verified: true,
  };

  // Mock seller reviews
  const sellerReviews = [
    {
      id: "1",
      rating: 5,
      comment: "Excellent seller, account exactly as described. Fast delivery and professional communication.",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      reviewer: {
        name: "Sarah M.",
        verified: true,
      },
      order_id: "ORD-001",
      helpful_count: 12,
      user_found_helpful: false,
    },
    {
      id: "2",
      rating: 4,
      comment: "Good account, seller was cooperative. Recommended!",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      reviewer: {
        name: "John D.",
        verified: true,
      },
      order_id: "ORD-002",
      helpful_count: 8,
      user_found_helpful: true,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(280,70%,15%)] via-[hsl(300,60%,25%)] to-[hsl(280,70%,15%)]" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <BackButton className="text-white/80 hover:text-white" fallbackPath="/marketplace" />
        
        <Breadcrumb 
          items={[
            { label: language === 'ar' ? "الرئيسية" : "Home", href: "/" },
            { label: language === 'ar' ? "السوق" : "Marketplace", href: "/marketplace" },
            { label: language === 'ar' ? "تفاصيل الحساب" : "Account Details" }
          ]}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Header */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={tiktokLogo} 
                    alt="TikTok" 
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-white">{accountData.username}</h1>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {language === 'ar' ? 'موثق' : 'Verified Seller'}
                      </Badge>
                    </div>
                    <p className="text-white/60 mb-3">{accountData.platform} Account</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4" />
                        <span className="font-semibold">{accountData.stats.followers.toLocaleString()}</span>
                        <span className="text-white/60 text-sm">{language === 'ar' ? 'متابع' : 'Followers'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Heart className="h-4 w-4" />
                        <span className="font-semibold">{accountData.stats.likes.toLocaleString()}</span>
                        <span className="text-white/60 text-sm">{language === 'ar' ? 'إعجاب' : 'Likes'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Eye className="h-4 w-4" />
                        <span className="font-semibold">{accountData.stats.views.toLocaleString()}</span>
                        <span className="text-white/60 text-sm">{language === 'ar' ? 'مشاهدة' : 'Views'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm mb-1">{language === 'ar' ? 'السعر' : 'Price'}</p>
                      <p className="text-3xl font-bold text-primary">${accountData.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm mb-1">{language === 'ar' ? 'معدل التفاعل' : 'Engagement'}</p>
                      <p className="text-2xl font-bold text-white">{accountData.engagementRate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{language === 'ar' ? 'وصف الحساب' : 'Account Description'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">{accountData.description}</p>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{language === 'ar' ? 'تفاصيل الحساب' : 'Account Details'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-white/60 text-sm">{language === 'ar' ? 'البريد الأساسي' : 'Primary Email'}</p>
                      <p className="text-white font-medium">
                        {accountData.hasPrimaryEmail ? (language === 'ar' ? 'متوفر' : 'Included') : (language === 'ar' ? 'غير متوفر' : 'Not Included')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-white/60 text-sm">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</p>
                      <p className="text-white font-medium">
                        {accountData.hasPhoneNumber ? (language === 'ar' ? 'مرتبط' : 'Linked') : (language === 'ar' ? 'غير مرتبط' : 'Not Linked')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Video className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-white/60 text-sm">{language === 'ar' ? 'النيش' : 'Niche'}</p>
                      <p className="text-white font-medium">{accountData.niche}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Eye className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-white/60 text-sm">{language === 'ar' ? 'متوسط المشاهدات' : 'Avg. Views'}</p>
                      <p className="text-white font-medium">{accountData.avgViews}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Reviews */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  {language === 'ar' ? 'تقييمات البائع' : 'Seller Reviews'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sellerReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Seller & Purchase */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-white/60 text-sm mb-2">{language === 'ar' ? 'السعر الإجمالي' : 'Total Price'}</p>
                  <p className="text-4xl font-bold text-primary mb-4">${accountData.price}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
                    {language === 'ar' ? 'شراء الآن' : 'Buy Now'}
                  </Button>
                  <Link to="/checkout">
                    <Button variant="outline" className="w-full mt-3 border-white/20 text-white hover:bg-white/10">
                      {language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>{language === 'ar' ? 'حماية المشتري' : 'Buyer Protection'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{language === 'ar' ? 'تسليم فوري' : 'Instant Delivery'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{language === 'ar' ? 'دعم 24/7' : '24/7 Support'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info Card */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">{language === 'ar' ? 'معلومات البائع' : 'Seller Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {sellerInfo.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{sellerInfo.name}</p>
                      {sellerInfo.verified && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={sellerInfo.rating} size="sm" />
                      <span className="text-white/60 text-sm">({sellerInfo.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-white/60 text-xs mb-1">{language === 'ar' ? 'المبيعات' : 'Sales'}</p>
                    <p className="text-white font-semibold">{sellerInfo.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">{language === 'ar' ? 'عضو منذ' : 'Member Since'}</p>
                    <p className="text-white font-semibold">{sellerInfo.memberSince}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProductExample;
