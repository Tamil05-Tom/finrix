import React, { useEffect, useState, useRef } from 'react'
import { Search, Bell, User,ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimate } from 'framer-motion'
import { logout } from '../auth/firebase'

function Navbar() {
  const [scope, animate] = useAnimate()
  const navigate=useNavigate();
  const [isExpanded, setIsExpanded] = useState(false)
  const [placeholderText, setPlaceholderText] = useState("")
  const fullPlaceholder = "Search by date, client, or invoice ID"
  const [isHovered, setIsHovered] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showLogout, setShowLogout] = useState(false)

  // Separate refs for dropdown and logout
  const dropdownRef = useRef(null)
  const logoutRef = useRef(null)
  const bellButtonRef = useRef(null)
  const logoutButtonRef = useRef(null)

  const iconVariants = {
    idle: { rotate: 0 },
    shake: {
      rotate: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: isHovered ? Infinity : 0,
        repeatDelay: 2,
      },
    },
  }

  useEffect(() => {
    const animationSequence = async () => {
      await animate(scope.current, { opacity: 1 }, { duration: 0.3 })
      await animate('input', { width: 384, opacity: 1 }, { duration: 0.5 })
      setIsExpanded(true)

      for (let i = 0; i <= fullPlaceholder.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setPlaceholderText(fullPlaceholder.slice(0, i))
      }
    }

    animationSequence()
  }, [animate, scope])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (!dropdownRef.current || !dropdownRef.current.contains(event.target)) &&
        (!bellButtonRef.current || !bellButtonRef.current.contains(event.target)) &&
        (!logoutRef.current || !logoutRef.current.contains(event.target)) &&
        (!logoutButtonRef.current || !logoutButtonRef.current.contains(event.target))
      ) {
        setShowDropdown(false)
        setShowLogout(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <nav className="bg-[#000000] p-4">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <motion.div 
            ref={scope}
            className="relative flex items-center"
            initial={{ opacity: 0 }}
          >
            <Search className="absolute left-3 text-[#9CA3AF] h-5 w-5 z-10" />
            <motion.input
              type="text"
              placeholder={placeholderText}
              className="bg-[#1c1c1e] text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 placeholder-opacity-60"
              initial={{ width: 40, opacity: 0 }}
            />
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
        <div className="relative">
        <button
          className="text-gray-300 hover:text-white focus:outline-none bg-[#363434] p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
          onClick={()=>{navigate("/overview")}}
        >
          <ArrowRight size={20} />
        </button>
      </div>
          <div className="relative">
            <button
              ref={bellButtonRef}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-[#363434] p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <motion.div
                variants={iconVariants}
                initial="idle"
                animate={isHovered ? "shake" : "idle"}
              >
                <Bell size={20} />
              </motion.div>
            </button>

            {showDropdown && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-[#1c1c1e] text-white shadow-lg rounded-lg p-4 z-20">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="p-2 border-b last:border-none">
                      {notification}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No messages to read
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              ref={logoutButtonRef}
              className="text-gray-300 hover:text-white focus:outline-none bg-[#363434] p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
              onClick={() => setShowLogout(!showLogout)}
            >
              <User size={20} />
            </button>

            {showLogout && (
              <div ref={logoutRef} className="absolute right-0 mt-2 w-48 bg-[#1c1c1e] text-white shadow-lg rounded-lg p-4 z-20">
                <button
                  className="text-gray-300 hover:text-white focus:outline-none w-full text-left"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar