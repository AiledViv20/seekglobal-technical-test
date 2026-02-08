"use client";

import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useAuth } from "@/modules/auth/hooks/useAuth";

interface HeaderProps {
  onMenuClick?: () => void;
}

/** App header. Displays name, email and avatar of the authenticated user. Includes a mobile menu button. */
export default function Header({ onMenuClick }: HeaderProps) {
  const user = useAuth((state) => state.user);

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 bg-white relative z-10 border-b border-gray-200 shadow-[0_2px_4px_0_rgba(0,0,0,0.06)]">
      <button
        onClick={onMenuClick}
        className="cursor-pointer text-gray-600 hover:text-gray-900 lg:hidden"
      >
        <HiOutlineMenuAlt2 size={24} />
      </button>

      <div className="ml-auto flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <Image
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
    </header>
  );
}
