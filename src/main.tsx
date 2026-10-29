import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LeadProvider } from './context/LeadContext'
import App from './App'
import './index.css'
import './theme-factory.css'
import './layout-factory.css'
import './visuals-factory.css'
import './polish-factory.css'
import './factory-tone.css'
import './hero-dash.css'
import './platform-chart.css'
import './stick-section.css'
import './showcase-compact.css'
import './stories-industries.css'
import './brand.css'
import './data-card.css'
import './aws-architecture.css'
import './contact-console.css'
import './typography-unify.css'
import './palette-unify.css'
import './light-theme.css'
import './responsive.css'
import './type-apply.css'
import './brand-blue.css'
import './type-scale.css'
import './hero-command.css'
import './ecosystem.css'
import './service-stack.css'
import './ai-hub.css'
import './knowledge-base.css'
import './industry-explorer.css'
import './careers-banner.css'
import './footer.css'
import './techstrip.css'
import './nav-mega.css'
import './testimonials-premium.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LeadProvider>
        <App />
      </LeadProvider>
    </BrowserRouter>
  </React.StrictMode>
)
