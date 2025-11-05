import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  success: {
    className: "bg-status-success/20 text-status-success border-status-success/30",
    icon: CheckCircle2,
  },
  warning: {
    className: "bg-status-warning/20 text-status-warning border-status-warning/30",
    icon: AlertCircle,
  },
  error: {
    className: "bg-status-error/20 text-status-error border-status-error/30",
    icon: XCircle,
  },
  info: {
    className: "bg-status-info/20 text-status-info border-status-info/30",
    icon: Info,
  },
  pending: {
    className: "bg-status-pending/20 text-status-pending border-status-pending/30",
    icon: Clock,
  },
};

export const StatusBadge = ({ 
  status, 
  label, 
  showIcon = true, 
  className 
}: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={cn(config.className, className)}>
      {showIcon && <Icon className="h-3 w-3 ml-1" />}
      {label}
    </Badge>
  );
};
