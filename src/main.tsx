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
          <main className="relative">
            <App />
          </main>
          <Footer />
        </NavigationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
