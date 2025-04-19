import { LuFacebook, LuTwitter, LuInstagram, LuYoutube, LuLinkedin } from "react-icons/lu"
import ZeroBiteLogo from "../shared/ZeroBiteLogo"

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] text-gray-300 pt-12 pb-4 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <ZeroBiteLogo />
          <p className="text-gray-200 mt-3">Making sustainable cooking accessible and enjoyable for everyone.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Recipes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Meal Planning
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Donate Food
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-4">Have questions or feedback? Reach out to our team.</p>
          <div className="flex space-x-4 mb-4">
            <a href="#" aria-label="Facebook">
              <LuFacebook className="w-6 h-6 hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Twitter">
              <LuTwitter className="w-6 h-6 hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Instagram">
              <LuInstagram className="w-6 h-6 hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="YouTube">
              <LuYoutube className="w-6 h-6 hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LuLinkedin className="w-6 h-6 hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} ZeroBite. All rights reserved.</p>
      </div>
    </footer>
  )
}

