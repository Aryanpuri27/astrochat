import { SpaceBackground } from "@/components/space-background"
import { SpaceHeader } from "@/components/space-header"
import { PlanetDetail } from "@/components/planet-detail"
import { notFound } from "next/navigation"

// Define the planet data
const planets = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#A9A9A9",
    description:
      "Mercury is the smallest and innermost planet in the Solar System. It's named after the Roman god Mercury, the messenger of the gods.",
    facts: [
      "Mercury is the smallest planet in our solar system!",
      "A day on Mercury is 59 Earth days long.",
      "Mercury has no atmosphere, so it can be very hot during the day and very cold at night.",
      "Mercury is the closest planet to the Sun, orbiting at about 36 million miles away",
      "Mercury has a very thin atmosphere made up mostly of oxygen, sodium, hydrogen, helium, and potassium.",
      "Mercury has no moons or rings.",
      "Mercury has a large iron core that takes up about 75% of the planet's radius.",
    ],
    details: {
      diameter: "3,031 miles (4,878 km)",
      distance: "36 million miles (57.9 million km) from Sun",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      moons: "0",
      temperature: "-290°F to 800°F (-180°C to 430°C)",
      gravity: "38% of Earth's gravity",
      composition: "Rocky planet with a large iron core",
    },
    images: ["/planets/mercury-1.jpg", "/planets/mercury-2.jpg", "/planets/mercury-3.jpg"],
  },
  {
    id: "venus",
    name: "Venus",
    color: "#E6C229",
    description:
      "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's named after the Roman goddess of love and beauty.",
    facts: [
      "Venus is the hottest planet in our solar system!",
      "Venus spins backward compared to other planets.",
      "A day on Venus is longer than a year on Venus!",
      "Venus is sometimes called Earth's sister planet because they are similar in size.",
      "Venus has a thick atmosphere that traps heat, causing a runaway greenhouse effect.",
      "The surface of Venus is covered in volcanoes and lava plains.",
      "Venus has no moons and no rings.",
    ],
    details: {
      diameter: "7,521 miles (12,104 km)",
      distance: "67 million miles (108.2 million km) from Sun",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      moons: "0",
      temperature: "880°F (471°C) average",
      gravity: "91% of Earth's gravity",
      composition: "Rocky planet with thick atmosphere of carbon dioxide",
    },
    images: ["/planets/venus-1.jpg", "/planets/venus-2.jpg", "/planets/venus-3.jpg"],
  },
  {
    id: "earth",
    name: "Earth",
    color: "#4B90E6",
    description:
      "Earth is our home planet and the only place we know of so far that's inhabited by living things. It's the third planet from the Sun.",
    facts: [
      "Earth is the only planet known to have life!",
      "Earth is the third planet from the Sun.",
      "About 71% of Earth is covered in water.",
      "Earth has one natural satellite – the Moon.",
      "Earth's atmosphere is made up of 78% nitrogen, 21% oxygen, and 1% other gases.",
      "Earth is the only planet not named after a god or goddess.",
      "Earth has a magnetic field that protects us from the Sun's harmful radiation.",
    ],
    details: {
      diameter: "7,926 miles (12,756 km)",
      distance: "93 million miles (149.6 million km) from Sun",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      moons: "1",
      temperature: "-88°F to 136°F (-67°C to 58°C)",
      gravity: "1 g (standard)",
      composition: "Rocky planet with nitrogen-oxygen atmosphere",
    },
    images: ["/planets/earth-1.jpg", "/planets/earth-2.jpg", "/planets/earth-3.jpg"],
  },
  {
    id: "mars",
    name: "Mars",
    color: "#E67F4B",
    description:
      "Mars is the fourth planet from the Sun and is known as the Red Planet due to its reddish appearance. It's named after the Roman god of war.",
    facts: [
      "Mars is known as the Red Planet because of its reddish appearance.",
      "Mars has the largest volcano in the solar system called Olympus Mons.",
      "Mars has two small moons named Phobos and Deimos.",
      "Scientists think Mars once had water on its surface!",
      "Mars has seasons like Earth, but they last twice as long.",
      "Mars has the largest dust storms in the solar system.",
      "Mars has polar ice caps made of water and carbon dioxide ice.",
    ],
    details: {
      diameter: "4,220 miles (6,792 km)",
      distance: "142 million miles (228 million km) from Sun",
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      moons: "2",
      temperature: "-195°F to 70°F (-125°C to 20°C)",
      gravity: "38% of Earth's gravity",
      composition: "Rocky planet with thin atmosphere of carbon dioxide",
    },
    images: ["/planets/mars-1.jpg", "/planets/mars-2.jpg", "/planets/mars-3.jpg"],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#E6A54B",
    description:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's named after the Roman king of the gods.",
    facts: [
      "Jupiter is the largest planet in our solar system!",
      "Jupiter has a Giant Red Spot, which is actually a huge storm.",
      "Jupiter has at least 79 moons!",
      "Jupiter is a gas giant made mostly of hydrogen and helium.",
      "Jupiter has the strongest magnetic field of all the planets.",
      "Jupiter rotates faster than any other planet in our solar system.",
      "If Jupiter were hollow, more than 1,300 Earths could fit inside it.",
    ],
    details: {
      diameter: "86,881 miles (139,822 km)",
      distance: "484 million miles (778.5 million km) from Sun",
      dayLength: "10 hours",
      yearLength: "12 Earth years",
      moons: "79+",
      temperature: "-234°F (-145°C) cloud top",
      gravity: "236% of Earth's gravity",
      composition: "Gas giant (hydrogen and helium)",
    },
    images: ["/planets/jupiter-1.jpg", "/planets/jupiter-2.jpg", "/planets/jupiter-3.jpg"],
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#EAD6A6",
    description:
      "Saturn is the sixth planet from the Sun and is famous for its stunning ring system. It's named after the Roman god of agriculture.",
    facts: [
      "Saturn is known for its beautiful rings made of ice and rock!",
      "Saturn is a gas giant like Jupiter, made mostly of hydrogen and helium.",
      "Saturn has at least 82 moons, with Titan being the largest.",
      "Saturn is the least dense planet in our solar system - it would float in water!",
      "Saturn's rings are made up of billions of particles of ice and rock.",
      "A day on Saturn is only about 10.7 hours long.",
      "Saturn's moon Enceladus has geysers that shoot water into space!",
    ],
    details: {
      diameter: "72,367 miles (116,464 km)",
      distance: "886 million miles (1.4 billion km) from Sun",
      dayLength: "10.7 hours",
      yearLength: "29.5 Earth years",
      moons: "82+",
      temperature: "-288°F (-178°C) cloud top",
      gravity: "92% of Earth's gravity",
      composition: "Gas giant (hydrogen and helium) with ring system",
    },
    images: ["/planets/saturn-1.jpg", "/planets/saturn-2.jpg", "/planets/saturn-3.jpg"],
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#73C2FB",
    description:
      "Uranus is the seventh planet from the Sun and was the first planet discovered with a telescope. It's named after the Greek god of the sky.",
    facts: [
      "Uranus rotates on its side, like it's rolling around the Sun!",
      "Uranus is an ice giant, containing water, methane, and ammonia ice.",
      "Uranus has 27 known moons, all named after characters from Shakespeare and Pope.",
      "Uranus appears blue-green because of methane in its atmosphere.",
      "Uranus has 13 faint rings.",
      "Uranus is the coldest planet in our solar system.",
      "A season on Uranus lasts 21 Earth years!",
    ],
    details: {
      diameter: "31,518 miles (50,724 km)",
      distance: "1.8 billion miles (2.9 billion km) from Sun",
      dayLength: "17 hours",
      yearLength: "84 Earth years",
      moons: "27",
      temperature: "-357°F (-216°C) average",
      gravity: "89% of Earth's gravity",
      composition: "Ice giant (water, methane, ammonia ice with hydrogen-helium atmosphere)",
    },
    images: ["/planets/uranus-1.jpg", "/planets/uranus-2.jpg", "/planets/uranus-3.jpg"],
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#3E66F9",
    description:
      "Neptune is the eighth and most distant planet from the Sun. It's named after the Roman god of the sea.",
    facts: [
      "Neptune is the windiest planet, with winds reaching 1,200 miles per hour!",
      "Neptune is an ice giant similar to Uranus.",
      "Neptune has 14 known moons, with Triton being the largest.",
      "Neptune was predicted by mathematics before it was actually observed.",
      "Neptune has a Great Dark Spot, similar to Jupiter's Great Red Spot.",
      "Neptune takes 165 Earth years to orbit the Sun.",
      "Neptune's moon Triton is slowly getting closer to the planet and will eventually break apart.",
    ],
    details: {
      diameter: "30,599 miles (49,244 km)",
      distance: "2.8 billion miles (4.5 billion km) from Sun",
      dayLength: "16 hours",
      yearLength: "165 Earth years",
      moons: "14",
      temperature: "-353°F (-214°C) average",
      gravity: "114% of Earth's gravity",
      composition: "Ice giant (water, methane, ammonia ice with hydrogen-helium atmosphere)",
    },
    images: ["/planets/neptune-1.jpg", "/planets/neptune-2.jpg", "/planets/neptune-3.jpg"],
  },
]

export default function PlanetPage({ params }: { params: { id: string } }) {
  const planet = planets.find((p) => p.id === params.id)

  if (!planet) {
    notFound()
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <SpaceHeader />
        <div className="container mx-auto px-4 py-8">
          <PlanetDetail planet={planet} />
        </div>
      </div>
    </main>
  )
}

