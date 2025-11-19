import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { AuthProvider } from '@/contexts/auth'
import './global.css'
import { ReactQueryProvider } from '@/lib/providers/react-query-provider'
import { ActivePageProvider } from '@/contexts/active-page'


const satoshi = localFont({
  src: [
    { path: '../../public/fonts/Satoshi-Regular.woff2', weight: '400', },
    { path: '../../public/fonts/Satoshi-Medium.woff2', weight: '500', },
    { path: '../../public/fonts/Satoshi-Black.woff2', weight: '600', },
    { path: '../../public/fonts/Satoshi-Bold.woff2', weight: '700', },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '/mylinks',
  description: 'Um link para agregar todos os seus links importantes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${satoshi.className ?? ''}`}>
        <ReactQueryProvider>
          <AuthProvider>
            <ActivePageProvider>
              {children}
            </ActivePageProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
