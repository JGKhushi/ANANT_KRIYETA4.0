import { useState } from "react"
import { LuChevronDown, LuChevronUp } from "react-icons/lu"
import BgFood2 from '../../assets/home-page/bgFood2.jpg'

export default function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does the recipe generator work?",
      answer: "It matches your inputted ingredients with our recipe database and offers each in 5 options.",
    },
    {
      question: "How often do you update the recipe database?",
      answer: "We update our recipe database weekly with new seasonal recipes and based on user feedback.",
    },
    {
      question: "Is the app free to use?",
      answer: "Yes, ZeroBite is completely free and accessible to everyone.",
    },
    {
      question: "How does the expiry tracker work?",
      answer: "You input your groceries, their purchase date, and the system reminds you of the expiration periods.",
    },
    {
      question: "Can I access content food using the platform?",
      answer: "Yes! ZeroBite enables you to locate nearby food banks, they fund their own member portals.",
    },
  ]

  const toggleFaq = (index) => {
    setOpenIndex(index === openIndex ? -1 : index)
  }

  return (
    <section
      id="faqs"
      className="w-full py-16 md:py-24 px-4 md:px-8 relative"
      style={{
        backgroundImage: `url(${BgFood2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-0 h-full w-full absolute bg-orange-500/80 left-0 top-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-orange-500 text-3xl font-bold mb-10">FAQs</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 hover:cursor-pointer transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="font-semibold text-gray-900">Q: {faq.question}</h3>
                {openIndex === index ? (
                  <LuChevronUp className="text-orange-500 flex-shrink-0" />
                ) : (
                  <LuChevronDown className="text-orange-500 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600">A: {faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

