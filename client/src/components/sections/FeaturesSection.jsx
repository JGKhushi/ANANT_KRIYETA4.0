import { useState, useEffect } from 'react'
import {
  LuChefHat,
  LuCalendarClock,
  LuTimer,
  LuHeartHandshake,
  LuShoppingCart,
  LuChevronLeft,
  LuChevronRight
} from 'react-icons/lu'

export default function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(2); // 6 features with 4 visible at a time = 2 possible positions (0, 1, 2)
  const [slidRatio, setSlideRatio] = useState(25);

    useEffect(() => {
      const handleResize = () => {
        const innerWidth = window.innerWidth;
        setMaxIndex(innerWidth >= 768 ? 2 : 5); // Tailwind's md = 768px
        setSlideRatio(innerWidth >= 768 ? 25 : 100)
      };
  
      handleResize(); 
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const features = [
    {
      icon: <LuHeartHandshake className="w-12 h-12 text-purple-600" />,
      title: "Food Donation",
      description: "Donate excess food to charity organizations",
      link: "#"
    },
    {
      icon: <LuChefHat className="w-12 h-12 text-purple-600" />,
      title: "Recipe Generator",
      description: "Generate recipes from ingredients you already have",
      link: "#"
    },
    {
      icon: <LuCalendarClock className="w-12 h-12 text-purple-600" />,
      title: "Meal Planner",
      description: "Plan your meals for the week and save time",
      link: "#"
    },
    {
      icon: <LuTimer className="w-12 h-12 text-purple-600" />,
      title: "Expiry Tracker",
      description: "Track expiry dates of your groceries to reduce waste",
      link: "#"
    },
    {
      icon: <LuShoppingCart className="w-12 h-12 text-purple-600" />,
      title: "Donation Request Portal",
      description: "NGOs can post urgent food requirements or campaigns, helping donors respond faster.",
      link: "#"
    },
    {
      icon: <LuTimer className="w-12 h-12 text-purple-600" />,
      title: "Verified Donor Access",
      description: "View details of donors, donation history, and manage regular contributors.",
      link: "#"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : prev))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <section id="features" className="w-full bg-orange-500 py-8 px-9 relative">
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`md:hidden absolute top-1/2 left-0.5 md:-left-8 md:top-1/2 md:-translate-y-8 md:-translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
        aria-label="Previous features"
      >
        <LuChevronLeft className="w-6 h-6 text-orange-500" />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
        className={`md:hidden absolute top-1/2 right-0.5 md:-right-8 md:top-1/2 md:-translate-y-8 md:translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
        aria-label="Next features"
      >
        <LuChevronRight className="w-6 h-6 text-orange-500" />
      </button>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-white text-3xl font-bold mb-10">OUR FEATURES</h2>

        <div className="relative">

          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`hidden md:block absolute top-1/2 left-0 md:-left-8 md:top-1/2 md:-translate-y-8 md:-translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
            aria-label="Previous features"
          >
            <LuChevronLeft className="w-6 h-6 text-orange-500" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`hidden md:block absolute top-1/2 -right-7 -translate-y-1/2 md:-right-8 md:top-1/2 md:-translate-y-8 md:translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
            aria-label="Next features"
          >
            <LuChevronRight className="w-6 h-6 text-orange-500" />
          </button>

          {/* Features Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * slidRatio}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3">
                  <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center h-full">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <a
                      href={feature.link}
                      className="mt-auto bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-1.5 px-4 rounded-md transition-colors"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

