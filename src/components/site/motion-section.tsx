import { cn } from "@/lib/utils";

type MotionSectionProps = React.PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function MotionSection({ children, className }: MotionSectionProps) {
  return <section className={cn(className)}>{children}</section>;
}
