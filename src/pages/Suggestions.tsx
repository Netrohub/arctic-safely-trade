import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Suggestion {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  status: "pending" | "approved" | "implemented";
  author: string;
  date: string;
  userVote: "up" | "down" | null;
}

const mockSuggestions: Suggestion[] = [
  {
    id: 1,
    title: "إضافة وضع الليل التلقائي",
    description: "سيكون من الرائع لو كان هناك وضع ليلي يتحول تلقائياً حسب وقت اليوم",
    upvotes: 45,
    downvotes: 3,
    comments: 12,
    status: "pending",
    author: "أحمد محمد",
    date: "2024-01-15",
    userVote: null,
  },
  {
    id: 2,
    title: "تحسين سرعة البحث",
    description: "البحث في المنتجات يأخذ وقت طويل، يحتاج تحسين في الأداء",
    upvotes: 32,
    downvotes: 1,
    comments: 8,
    status: "approved",
    author: "فاطمة علي",
    date: "2024-01-14",
    userVote: "up",
  },
  {
    id: 3,
    title: "إضافة خاصية المقارنة بين المنتجات",
    description: "أود أن أتمكن من مقارنة منتجين أو أكثر جنباً إلى جنب",
    upvotes: 67,
    downvotes: 5,
    comments: 23,
    status: "implemented",
    author: "محمد خالد",
    date: "2024-01-10",
    userVote: null,
  },
];

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleVote = (id: number, voteType: "up" | "down") => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.id === id) {
          const wasUpvoted = suggestion.userVote === "up";
          const wasDownvoted = suggestion.userVote === "down";
          
          let newUpvotes = suggestion.upvotes;
          let newDownvotes = suggestion.downvotes;
          let newUserVote: "up" | "down" | null = voteType;

          if (voteType === "up") {
            if (wasUpvoted) {
              newUpvotes -= 1;
              newUserVote = null;
            } else {
              newUpvotes += 1;
              if (wasDownvoted) newDownvotes -= 1;
            }
          } else {
            if (wasDownvoted) {
              newDownvotes -= 1;
              newUserVote = null;
            } else {
              newDownvotes += 1;
              if (wasUpvoted) newUpvotes -= 1;
            }
          }

          return {
            ...suggestion,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
          };
        }
        return suggestion;
      })
    );
  };

  const handleSubmit = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newSuggestion: Suggestion = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      status: "pending",
      author: "أنت",
      date: new Date().toISOString().split("T")[0],
      userVote: null,
    };

    setSuggestions([newSuggestion, ...suggestions]);
    setNewTitle("");
    setNewDescription("");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: "قيد المراجعة", className: "bg-gaming-gold/20 text-gaming-gold" },
      approved: { label: "تمت الموافقة", className: "bg-success/20 text-success" },
      implemented: { label: "تم التنفيذ", className: "bg-primary/20 text-primary" },
    };
    const variant = variants[status] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const filterSuggestions = () => {
    if (activeTab === "all") return suggestions;
    return suggestions.filter((s) => s.status === activeTab);
  };

  const sortedSuggestions = [...filterSuggestions()].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-arctic bg-clip-text text-transparent">
            مركز الاقتراحات
          </h1>
          <p className="text-muted-foreground">شارك أفكارك وساعدنا في تحسين المنصة</p>
        </div>

        {/* Submit New Suggestion */}
        <Card className="mb-8 border-primary/20 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              اقتراح جديد
            </CardTitle>
            <CardDescription>شاركنا فكرتك لتحسين المنصة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="عنوان الاقتراح"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div>
              <Textarea
                placeholder="وصف الاقتراح بالتفصيل..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={!newTitle.trim() || !newDescription.trim()}
            >
              إرسال الاقتراح
            </Button>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-card">
            <TabsTrigger value="all">الكل ({suggestions.length})</TabsTrigger>
            <TabsTrigger value="pending">
              قيد المراجعة ({suggestions.filter((s) => s.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              موافق عليها ({suggestions.filter((s) => s.status === "approved").length})
            </TabsTrigger>
            <TabsTrigger value="implemented">
              منفذة ({suggestions.filter((s) => s.status === "implemented").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Suggestions List */}
        <div className="space-y-4">
          {sortedSuggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-elegant"
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-2 min-w-[60px]">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote(suggestion.id, "up")}
                      className={`hover:bg-success/20 ${
                        suggestion.userVote === "up"
                          ? "bg-success/20 text-success"
                          : "text-muted-foreground"
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-1 font-bold text-lg">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      {suggestion.upvotes - suggestion.downvotes}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote(suggestion.id, "down")}
                      className={`hover:bg-destructive/20 ${
                        suggestion.userVote === "down"
                          ? "bg-destructive/20 text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-bold">{suggestion.title}</h3>
                      {getStatusBadge(suggestion.status)}
                    </div>
                    <p className="text-muted-foreground mb-4">{suggestion.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{suggestion.author}</span>
                      <span>•</span>
                      <span>{suggestion.date}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {suggestion.comments} تعليق
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedSuggestions.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">لا توجد اقتراحات في هذه الفئة</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
