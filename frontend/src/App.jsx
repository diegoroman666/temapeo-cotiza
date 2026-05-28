import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WordAssistant from './components/WordAssistant'
import HomeView from './views/HomeView'
import FleetView from './views/FleetView'
import SimulatorView from './views/SimulatorView'
import DashboardView from './views/DashboardView'
import AcademyView from './views/AcademyView'
import AboutView from './views/AboutView'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const navigateTo = (viewId) => {
    setCurrentView(viewId)
    window.scrollTo(0, 0)
  }

  const views = {
    home: <HomeView navigateTo={navigateTo} />,
    fleet: <FleetView />,
    simulator: <SimulatorView />,
    dashboard: <DashboardView />,
    academy: <AcademyView />,
    about: <AboutView navigateTo={navigateTo} />,
  }

  return (
    <div className="bg-slate-50 font-sans text-slate-900 min-h-screen flex flex-col">
      <Navbar navigateTo={navigateTo} />
      <main className="w-full flex-grow">
        {views[currentView]}
      </main>
      <Footer navigateTo={navigateTo} />
      <WordAssistant />
    </div>
  )
}

export default App
