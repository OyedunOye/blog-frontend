import Profile from "@/components/Profile/Profile";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

export default async function Page() {
  return (
    <div className="flex justify-center flex-col relative w-full">
      <div className="bg-[#F3F4F6] dark:bg-black/99 space-y-2 w-full text-center pt-15 pb-20">
        <div className="flex items-center justify-center gap-x-3">
          <Settings className="h-12 w-12" />
          <h3 className={cn("font-semibold text-5xl", poppins.className)}>
            Dashboard
          </h3>
        </div>
        <p className="text-gray-500">
          Manage your blog posts and profile information here
        </p>
      </div>
      <Profile />
    </div>
  );
}
