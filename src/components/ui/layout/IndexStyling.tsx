import { ReactNode } from "react";

export default function IndexStyling({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center h-full max-w-4xl p-2 pb-20 md:pb-2">
      {children}
    </div>
  );
}
