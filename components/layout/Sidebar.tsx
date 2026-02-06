"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuthStore } from "@/lib/stores/auth.store";

export default function Sidebar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-56 flex-col bg-[#1a1a2e] text-white">
      {/* Logo */}
      <div className="flex items-center justify-center px-6 py-6">
        <Image
          src="/images/logo.jpg"
          alt="SEEK"
          width={120}
          height={40}
          className="rounded-full"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-3">
        <a
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium transition-colors"
        >
          <MdDashboard size={20} />
          Dashboard
        </a>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mb-6 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 cursor-pointer"
        >
          <HiOutlineLogout size={20} />
          Salir
        </button>
      </nav>
    </aside>
  );
}
