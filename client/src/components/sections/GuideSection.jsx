import BgFood from '../../assets/home-page/bgFood.jpg'

export default function GuideSection() {
  const steps = [
    {
      number: 1,
      description: "Enter the ingredients you have at home",
    },
    {
      number: 2,
      description: "Browse recipes matched to your items",
    },
    {
      number: 3,
      description: "Track ingredient expiry and inventory",
    },
    {
      number: 4,
      description: "Make or plan your meals for the week",
    },
    {
      number: 5,
      description: "Donate excess food to avoid wastage",
    },
  ]

  return (
    <section id="guide" className="w-full bg-white/15 py-12 px-4 md:px-8" style={{backgroundImage: `url(${BgFood})`}}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-orange-500 text-3xl font-bold mb-12">GUIDE</h2>

        <div className="flex flex-wrap justify-center items-center relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center mx-8 mb-8 relative">
              <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-500 text-xl font-bold mb-4 relative z-10 bg-white">
                {step.number}
              </div>
              <div className="text-center max-w-[120px]">
                <p className="text-gray-700 font-medium">{step.description}</p>
              </div>

              {/* Connector line between circles (except after the last one) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-1/2  w-1 md:h-1 bg-orange-500 h-40 md:w-40"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

