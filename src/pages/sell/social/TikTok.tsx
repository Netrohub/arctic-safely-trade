import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Video, Users, Heart, Eye } from "lucide-react";
import { z } from "zod";

const tiktokSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(100),
  followers: z.string().trim().min(1, "Followers count is required"),
  price: z.string().trim().min(1, "Price is required"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000),
  verificationStatus: z.enum(["verified", "unverified"]),
});

const TikTok = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    followers: "",
    likes: "",
    views: "",
    price: "",
    description: "",
    verificationStatus: "unverified" as "verified" | "unverified",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      tiktokSchema.parse(formData);
      
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: t('listing.success'),
        description: t('listing.successDescription'),
      });

      navigate("/my-listings");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create listing. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <BackButton />
        
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(0,0%,0%)] to-[hsl(180,100%,50%)] flex items-center justify-center">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{t('sell.social.tiktok.title')}</CardTitle>
                <CardDescription>{t('sell.social.tiktok.subtitle')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">{t('sell.social.tiktok.username')}</Label>
                <Input
                  id="username"
                  placeholder="@username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followers">
                    <Users className="h-4 w-4 inline mr-1" />
                    {t('sell.social.followers')}
                  </Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="10000"
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="likes">
                    <Heart className="h-4 w-4 inline mr-1" />
                    {t('sell.social.likes')}
                  </Label>
                  <Input
                    id="likes"
                    type="number"
                    placeholder="50000"
                    value={formData.likes}
                    onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="views">
                    <Eye className="h-4 w-4 inline mr-1" />
                    {t('sell.social.views')}
                  </Label>
                  <Input
                    id="views"
                    type="number"
                    placeholder="100000"
                    value={formData.views}
                    onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                  />
                </div>
              </div>

              {/* Verification Status */}
              <div className="space-y-2">
                <Label>{t('sell.social.verification')}</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      value="verified"
                      checked={formData.verificationStatus === "verified"}
                      onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value as "verified" })}
                      className="w-4 h-4"
                    />
                    <span>{t('sell.social.verified')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="verification"
                      value="unverified"
                      checked={formData.verificationStatus === "unverified"}
                      onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value as "unverified" })}
                      className="w-4 h-4"
                    />
                    <span>{t('sell.social.unverified')}</span>
                  </label>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">{t('sell.price')}</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="100"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t('sell.description')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('sell.social.tiktok.descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  maxLength={1000}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.description.length}/1000
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('listing.creating') : t('listing.create')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TikTok;
