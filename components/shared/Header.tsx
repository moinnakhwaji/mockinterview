"use client"

import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  const path = usePathname()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navigation items array
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upgrade', path: '/upgrade' },
    { name: 'How It Works', path: '/how' },

  ]

  // Function to determine if the link is active based on the current path
  const getLinkClass = (linkPath: string) => {
    return path === linkPath
      ? 'text-purple-500 cursor-pointer transition-all duration-300 font-bold'
      : 'hover:text-purple-400 cursor-pointer transition-all duration-200 ease-in-out'
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="bg-[#25232a] shadow-lg text-[#6a6a75] py-3 px-6 flex items-center justify-between relative">
      {/* Logo and Title */}
      <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 hover:cursor-pointer transition-all duration-300 ease-in-out">
        GrandLine Prep
      </h1>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center" onClick={toggleMobileMenu}>
        <button className="text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul className={`md:flex gap-8 text-base font-medium ${isMobileMenuOpen ? 'flex-col absolute bg-[#25232a] top-16 right-0 w-full p-4 space-y-4' : 'hidden'}`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className={getLinkClass(item.path)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Button */}
      <div className="flex items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButton: 'w-10 h-10 rounded-full border-2 border-purple-400 hover:bg-purple-200 transition-all duration-200 ease-in-out',
            },
          }}
        />
      </div>
    </div>
  )
}

export default Header
