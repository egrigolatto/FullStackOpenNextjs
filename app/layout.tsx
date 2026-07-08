import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     {/*} <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"/>
      </head>
      */}
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}