'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useToast } from '../hooks/use-toast'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
    tech: ['React', 'Next.js', 'Stripe', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics',
    description: 'Advanced analytics platform leveraging machine learning for predictive insights and data visualization.',
    tech: ['TypeScript', 'React', 'AI/ML', 'D3.js'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Design System',
    description: 'Comprehensive component library and design tokens for enterprise applications with accessibility first approach.',
    tech: ['Storybook', 'TypeScript', 'Tailwind CSS', 'Figma'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Real-time Chat App',
    description: 'WebSocket-based chat application with encryption, file sharing, and presence indicators.',
    tech: ['Next.js', 'WebSocket', 'Socket.io', 'PostgreSQL'],
    color: 'from-green-500 to-teal-500'
  }
]

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [open, setOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const { toast } = useToast()

  function openProject(projectId: number) {
    setSelectedProject(projectId)
    setOpen(true)
  }

  function closeProject() {
    setOpen(false)
    setSelectedProject(null)
    setName('')
    setEmail('')
    setMessage('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast({ title: 'Missing fields', description: 'Please provide a name and email.' })
      return
    }

    const proj = projects.find((p) => p.id === selectedProject)
    toast({ title: 'Request sent', description: `You requested info for ${proj?.title ?? 'project'}.` })
    closeProject()
  }

  return (
    <section id="projects" ref={ref} className="relative py-20 px-6 bg-foreground/2">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ translateY: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="group relative bg-card/50 backdrop-blur border border-border rounded-2xl p-8 overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => openProject(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openProject(project.id)
              }}
              role="button"
              tabIndex={0}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${project.color} mb-6 flex items-center justify-center`}>
                  <div className="w-6 h-6 border-2 border-white rounded" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-6 border-t border-border">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open('#', '_blank')
                    }}
                  >
                    Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open('#', '_blank')
                    }}
                  >
                    View Code
                    <Github className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Dialog for project interaction */}
        <Dialog open={open} onOpenChange={(val) => (val ? setOpen(true) : closeProject())}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{projects.find((p) => p.id === selectedProject)?.title ?? 'Project'}</DialogTitle>
              <DialogDescription>
                {projects.find((p) => p.id === selectedProject)?.description}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Message</label>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Optional message" />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={closeProject} type="button">Close</Button>
                </DialogClose>
                <Button type="submit">Send Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

