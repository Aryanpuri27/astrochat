import { SpaceBackground } from "@/components/space-background"
import { AstronomyChat } from "@/components/astronomy-chat"
import { SpaceHeader } from "@/components/space-header"
import { SolarSystem } from "@/components/solar-system"
import { SpaceFacts } from "@/components/space-facts"
import { SpaceQuiz } from "@/components/space-quiz"
import { GenerativeAstronomy } from "@/components/generative-astronomy"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <SpaceHeader />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Explore Our Solar System
          </h1>

          <div className="mb-8">
            <SolarSystem />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <GenerativeAstronomy />
            <AstronomyChat />
          </div>

          <div className="mb-8">
            <SpaceQuiz />
          </div>

          <div className="mb-8">
            <SpaceFacts />
          </div>
        </div>
      </div>
    </main>
  )
}

