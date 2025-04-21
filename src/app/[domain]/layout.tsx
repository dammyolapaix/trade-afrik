import Footer from '../(marketing)/_components/footer'
import { Providers } from '../providers'
import StoreHeader from './_components/store-header'

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <StoreHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  )
}
