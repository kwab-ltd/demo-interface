'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [imageError, setImageError] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')

  const isActive = (path: string) => {
    return pathname === path ? "text-primary font-bold" : "text-muted-foreground"
  }

  const navItems = [
    { href: '/', label: 'CUD V0.1' },
  ]

  const handleImageError = () => {
    console.error("Failed to load avatar image")
    setImageError(true)
    setDebugInfo('Image failed to load. Check console for more details.')
  }

  useEffect(() => {
    // Log some debug information
    console.log('Current pathname:', pathname)
    console.log('Public folder path:', process.env.PUBLIC_URL)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="font-medium">Hi, Admin</div>
        </div>
        
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href)}`}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Avatar>
            <Image
              src="/favicon.ico"
              alt="Admin Avatar"
              width={30}
              height={30}
              onError={handleImageError}
              className="object-scale-down w-full h-full"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      {(imageError || debugInfo) && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Avatar Image Error</p>
          <p>{debugInfo || 'The avatar image failed to load. Please check the file path and ensure the image exists.'}</p>
        </div>
      )}
    </header>
  )
}