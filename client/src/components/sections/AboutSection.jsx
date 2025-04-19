import FoodCollage from '../../assets/home-page/collage.png'

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 px-4 md:px-8 mb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={FoodCollage}
            alt="Food platform illustration"
            width={600}
            height={450}

            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 text-lg">
          <p className="text-gray-800 mb-6">
            At ZeroBite, we believe that every ingredient has a purpose and no food should go to waste. Our platform empowers users to make the most of what they already have by generating smart, tasty recipes using leftover ingredients. Whether it’s a half onion, some cooked rice, or overripe bananas — we help you turn them into something delicious.
          </p>
          <p className="text-gray-800 mb-6">
            But our mission goes beyond the kitchen. ZeroBite also connects users with verified food donation centers, enabling them to share excess food with those in need. By combining smart cooking with social impact, we aim to build a more sustainable and compassionate food system — one bite at a time.
          </p>
          <div className="flex justify-start">
            <a
              href="#"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

