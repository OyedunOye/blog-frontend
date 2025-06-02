"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Book,
  LayoutDashboard,
  LockIcon,
  MenuIcon,
  Settings,
  User2,
} from "lucide-react";
import Dashboard from "./Dashboard";
import Posts from "./Posts";
import EditProfile from "./EditProfile";
import Security from "./Security";
import DeleteAccount from "./DeleteAccount";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<
    "DASHBOARD" | "POSTS" | "PROFILE" | "SECURITY" | "DELETE"
  >("DASHBOARD");
  const [dashboardMenu, setDashboardMenu] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="min-h-[600px] w-[90%] border gap-8 max-md:gap-2 bg-white rounded-lg shadow-md max-w-[1366px] -mt-12 flex gap-x-12 p-8 max-md:p-2 mb-12">
        <div
          className={`w-[220px] max-md:w-40 flex flex-col gap-y-2 border-0 transition-all ${
            activeTab !== "DASHBOARD" && dashboardMenu === false
              ? "max-md:hidden"
              : null
          }`}
        >
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
            onClick={() => {
              setActiveTab("POSTS");
              setDashboardMenu(false);
            }}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "POSTS" && "bg-gray-200"
            )}
          >
            <Book />
            <span className="font-semibold text-sm">Posts</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("PROFILE");
              setDashboardMenu(false);
            }}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "PROFILE" && "bg-gray-200"
            )}
          >
            <User2 />
            <span className="font-semibold text-sm">Edit Profile</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("SECURITY");
              setDashboardMenu(false);
            }}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "SECURITY" && "bg-gray-200"
            )}
          >
            <LockIcon />
            <span className="font-semibold text-sm">Security</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("DELETE");
              setDashboardMenu(false);
            }}
            className={cn(
              "flex items-center gap-x-5 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200",
              activeTab === "DELETE" && "bg-gray-200"
            )}
          >
            <Settings />
            <span className="font-semibold text-sm">Management</span>
          </button>
        </div>
        <div className="w-full max-md:hidden">
          {activeTab === "DASHBOARD" && <Dashboard />}
          {activeTab === "POSTS" && <Posts />}
          {activeTab === "PROFILE" && <EditProfile />}
          {activeTab === "SECURITY" && <Security />}
          {activeTab === "DELETE" && <DeleteAccount />}
        </div>

        <div className="w-full max-md:flex flex-col max-2xl:hidden xl:hidden">
          {/* <div className=""></div> */}
          <button
            className={`flex my-2 bg-transparent py-auto gap-1 text-xl font-bold ${
              activeTab !== "DASHBOARD" && !dashboardMenu
                ? "max-md:flex content-center"
                : "max-md:hidden"
            } ${dashboardMenu ? "md:hidden" : null}`}
            onClick={() => setDashboardMenu(true)}
          >
            <MenuIcon size={30} />
            <p className="flex">Dashboard Menu</p>
          </button>
          {/* {activeTab !== "DASHBOARD" ? (
          ) : null} */}
          {activeTab === "DASHBOARD" && <Dashboard />}
          {activeTab === "POSTS" && !dashboardMenu ? <Posts /> : null}
          {activeTab === "PROFILE" && !dashboardMenu ? <EditProfile /> : null}
          {activeTab === "SECURITY" && !dashboardMenu ? <Security /> : null}
          {activeTab === "DELETE" && !dashboardMenu ? <DeleteAccount /> : null}
          {!dashboardMenu && null}
        </div>
      </div>
      {/* <div className="w-full max-md:flex">

          {activeTab === "DASHBOARD" && <Dashboard />}
          {activeTab === "POSTS" && <Posts />}
          {activeTab === "PROFILE" && <EditProfile />}
          {activeTab === "SECURITY" && <Security />}
          {activeTab === "DELETE" && <DeleteAccount />}
        </div> */}
    </div>
  );
};

export default Profile;
