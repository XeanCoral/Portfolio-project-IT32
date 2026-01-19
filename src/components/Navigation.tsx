'use client'

import { motion } from 'framer-motion'

interface NavigationProps {
  isScrolled?: boolean
  onNavigate?: (section: string) => void
  currentSection?: string
}

const navItems = ['about', 'projects', 'experience', 'contact']

export default function Navigation({ isScrolled = false, onNavigate, currentSection = '' }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate?.('home')}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
        >
          Portfolio
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => onNavigate?.(item)}
              whileHover={{ scale: 1.05, color: '#3b82f6' }}
              className={`text-sm font-medium transition-colors ${
                currentSection === item 
                  ? 'text-primary' 
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.button>
          ))}
          <motion.button
            onClick={() => onNavigate?.('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Get In Touch
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

