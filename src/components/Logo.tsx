import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-wide">
        TEKINFORMÁTICA
      </h1>
      <p className="text-sm md:text-base text-muted-foreground font-medium tracking-wider">
        CEO RICARDO MORAES
      </p>
    </div>
  );
};

export default Logo;