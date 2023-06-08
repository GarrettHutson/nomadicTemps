import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { GlobalContextProvider } from "./context/store";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs/app-beta';
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
export const revalidate = 0
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
    <head>
        <title>Nomadic-Temps</title>
      </head>
      <body >

  <Nav />
  <SignIn></SignIn>
  <GlobalContextProvider>
  {children}
  {/* <Analytics /> */}
  </GlobalContextProvider>
      
        <Footer />
 
 
      


    
        </body>
    </html>
    </ClerkProvider>
  )
}



