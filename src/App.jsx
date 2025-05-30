import React from 'react'
import NavBar from './components/NavBar';
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import LogoShowcase from './sections/LogoShowcase'
import FeatureCards from './sections/FeatureCards'
import Experience from './sections/Experience'
import TechStack from './sections/TechStack'
import Works from './sections/Works'
// import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { useMediaQuery } from 'react-responsive';
const App = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });
  return (
   <>
   <NavBar/>
   <Hero/>
   <Projects />
   <LogoShowcase />
   <FeatureCards />
   <Experience />
   {isDesktop && (
   <TechStack />
   )}
   <Works />
   {/* <Testimonials /> */}
    <Contact />
    <Footer />
   </>
  )
}

export default App