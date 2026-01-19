import React from 'react'
import { useState } from 'react'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { ThemeProvider } from './components/theme-provider'
import './globals.css'

export default function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home />
      case 'hero':
        return <Hero />
      case 'about':
        return <About />
      case 'experience':
        return <Experience />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
        <Navigation onNavigate={setCurrentSection} currentSection={currentSection} />
        <main className="pt-20">
          {renderSection()}
        </main>
      </div>
    </ThemeProvider>
  )
}

