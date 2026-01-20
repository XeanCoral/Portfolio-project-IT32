'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Projects from '../src/components/Projects'
import Experience from '../src/components/Experience'
import Contact from '../src/components/Contact'
import Navigation from '../src/components/Navigation'
import Home from '../src/components/Home'

export default function Page() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-background via-background to-blue-50">
      <Navigation isScrolled={isScrolled} />
      <main className="relative">
        <Hero />
        <About />
        <Home />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
