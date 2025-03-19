'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TrendingUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHistoryPage = pathname.startsWith('/history');
  
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full fixed top-0 left-0 right-0 z-50 px-2">
      <div className=" flex h-14 items-center">
        <div 
          className="flex items-center gap-2 font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>TiktokConsult</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button 
              variant={isHistoryPage ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push('/history')}
              className="hidden sm:flex"
            >
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-9 px-0 sm:hidden"
              onClick={() => router.push('/history')}
            >
              <History className="h-5 w-5" />
              <span className="sr-only">History</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  About
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  TiktokConsult helps create viral TikTok content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}