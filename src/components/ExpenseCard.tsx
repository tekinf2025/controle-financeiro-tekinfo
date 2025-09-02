import { Card, CardContent } from "@/components/ui/card";

interface ExpenseCardProps {
  title: string;
  value: string;
  description: string;
  variant: "income" | "expense" | "balance";
}

const ExpenseCard = ({ title, value, description, variant }: ExpenseCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "income":
        return "text-success";
      case "expense":
        return "text-destructive";
      case "balance":
        return value.startsWith("-") ? "text-destructive" : "text-success";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`text-2xl font-bold ${getVariantStyles()}`}>
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;