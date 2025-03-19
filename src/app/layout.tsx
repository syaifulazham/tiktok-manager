import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'TiktokConsult - AI-powered TikTok Content Creator',
  description: 'Generate creative TikTok content to sell your products effectively',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}