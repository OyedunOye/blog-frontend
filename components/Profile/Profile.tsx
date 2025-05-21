"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Book, LayoutDashboard, LockIcon, User2 } from "lucide-react";
import Dashboard from "./Dashboard";
import Posts from "./Posts";
import EditProfile from "./EditProfile";
import Security from "./Security";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<
    "DASHBOARD" | "POSTS" | "PROFILE" | "SECURITY"
  >("DASHBOARD");

  return (
    <div className="flex justify-center">
      <div className="min-h-[600px] w-[90%] border gap-8 bg-white rounded-lg shadow-md max-w-[1366px] -mt-12 flex gap-x-12 p-8 mb-12">
        <div className="w-[220px] flex flex-col gap-y-2 border-0 transition-all ">
          <button
            onClick={() => setActiveTab("DASHBOARD")}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "DASHBOARD" && "bg-gray-200"
            )}
          >
            <LayoutDashboard />
            <span className="font-semibold text-sm">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("POSTS")}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "POSTS" && "bg-gray-200"
            )}
          >
            <Book />
            <span className="font-semibold text-sm">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("PROFILE")}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "PROFILE" && "bg-gray-200"
            )}
          >
            <User2 />
            <span className="font-semibold text-sm">Edit Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("SECURITY")}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "SECURITY" && "bg-gray-200"
            )}
          >
            <LockIcon />
            <span className="font-semibold text-sm">Security</span>
          </button>
        </div>
        <div className="w-full">
          {activeTab === "DASHBOARD" && <Dashboard />}
          {activeTab === "POSTS" && <Posts />}
          {activeTab === "PROFILE" && <EditProfile />}
          {activeTab === "SECURITY" && <Security />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
