import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(query)}`);
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden md:flex gap-2 text-muted-foreground hover:text-foreground hover:bg-muted"
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">بحث...</span>
        <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          /
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-nav-highlight" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن حسابات، أعضاء، أو مواضيع..."
                className="pr-10 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground text-lg h-12"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="arctic" className="flex-1">
                <Search className="h-4 w-4 ml-2" />
                بحث
              </Button>
              <Button 
                type="button" 
                variant="arctic-ghost" 
                onClick={() => setOpen(false)}
              >
                إلغاء
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              اضغط ESC للإغلاق • اضغط / للبحث السريع
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
