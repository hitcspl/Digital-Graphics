import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Navbar } from "./components/layout/Navbar.tsx"
import { Footer } from "./components/layout/Footer.tsx"
import { BrowserRouter } from "react-router-dom"
import { NavigationProvider } from "./navigation/NavigationEngine.tsx"
import { ScrollManager } from "./components/ScrollManager.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <NavigationProvider>
          <ScrollManager />
          <Navbar />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
          >
            Skip to main content
          </a>
          <main id="main-content" className="relative">
            <noscript>
              <div className="mx-auto max-w-3xl px-6 py-12 text-sm text-muted-foreground">
                JavaScript is disabled. The site is still available, but some
                interactive animations may be unavailable.
              </div>
            </noscript>
            <App />
          </main>
          <Footer />
        </NavigationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
