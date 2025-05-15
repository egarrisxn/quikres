import { Loader2 } from "lucide-react";

export function Spinner({ className = "size-6" }: { className?: string }) {
  return <Loader2 className={`${className} text-foreground animate-spin`} />;
}
