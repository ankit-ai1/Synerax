import { createContext, useContext, useState, ReactNode } from 'react'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  message: string
  createdAt: string
  status: 'new' | 'contacted' | 'closed'
}

interface LeadContextType {
  isOpen: boolean
  defaultService: string
  openLead: (service?: string) => void
  closeLead: () => void
  saveLead: (lead: Lead) => void
  leads: Lead[]
}

const LeadContext = createContext<LeadContextType | null>(null)

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultService, setDefaultService] = useState('')
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('synerax_leads') || '[]')
    } catch {
      return []
    }
  })

  const openLead = (service = '') => {
    setDefaultService(service)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLead = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  const saveLead = (lead: Lead) => {
    const updated = [lead, ...leads]
    setLeads(updated)
    localStorage.setItem('synerax_leads', JSON.stringify(updated))
  }

  return (
    <LeadContext.Provider value={{ isOpen, defaultService, openLead, closeLead, saveLead, leads }}>
      {children}
    </LeadContext.Provider>
  )
}

export function useLead() {
  const ctx = useContext(LeadContext)
  if (!ctx) throw new Error('useLead must be used inside LeadProvider')
  return ctx
}
