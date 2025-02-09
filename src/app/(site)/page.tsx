import Header from "@/components/layout/header"
import Hero from "@/components/layout/hero"
import Features from "@/components/layout/features"
import Testimonials from "@/components/layout/testimonials"
import CTA from "@/components/layout/cta"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
