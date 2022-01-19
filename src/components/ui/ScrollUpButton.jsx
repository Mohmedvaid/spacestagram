import React, { useState } from "react"
import { FaArrowCircleUp } from "react-icons/fa"

function ScrollButton() {
  const [visible, setVisible] = useState(false)

  /**
   * sets visibility of scroll button
   */
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  /**
   * Scrolls to the top of the page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  window.addEventListener("scroll", toggleVisible)

  return (
    <button type="button" className="scroll-top-btn" aria-label="scroll to top">
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </button>
  )
}

export default ScrollButton
