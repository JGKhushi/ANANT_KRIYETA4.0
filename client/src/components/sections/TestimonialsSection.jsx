import UserIcon from '../../assets/home-page/userIcon.webp'

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Recipe Generator has transformed how I cook! I no longer waste food and always have delicious meals.",
      author: "Sarah M.",
      icon: UserIcon,
    },
    {
      text: "Recipe Generator helps me plan my meals efficiently and save money on groceries.",
      author: "Michael T.",
      icon: UserIcon,
    },
    {
      text: "Recipe Generator makes cooking fun again! I've discovered so many new recipes.",
      author: "Jessica L.",
      icon: UserIcon,
    },
  ]

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 mb-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-orange-500 text-3xl font-bold mb-10">TESTIMONIALS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-orange-500 rounded-lg p-6 text-white">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white overflow-hidden border-2 border-white">
                  <img
                    src={testimonial.icon}
                    alt={`${testimonial.author} avatar`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">Recipe Generator</h3>
              <p className="mb-4">{testimonial.text}</p>
              <p className="font-medium text-center">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

