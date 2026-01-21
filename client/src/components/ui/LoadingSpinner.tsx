import { Loader2 } from "lucide-react";

export default function LoadingSpinner(){
return (
      <div className="flex flex-col w-full items-center justify-center h-full">
        <Loader2 className="animate-spin stroke-primary" />
      </div>
    );}