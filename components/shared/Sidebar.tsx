"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { useAuth } from "@/modules/auth/hooks/useAuth";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const router = useRouter();
  const logout = useAuth((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <>
      {/* Overlay - solo visible en <lg cuando el drawer está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-56 flex-col bg-[#1a1a2e] text-white
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botón cerrar drawer */}
        <div className="flex justify-end px-4 pt-4 lg:hidden">
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-300 hover:text-white"
          >
            <IoChevronBack size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center px-6 py-6 lg:pt-6">
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
            onClick={handleNavClick}
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
    </>
  );
}
