import gsap from "gsap"

export const roleMap = {
  1: "Director",
  2: "Creative Director",
  3: "Film Director",
  4: "Photographer",
  5: "Actor",
  6: "Model",
  7: "Make-up artist",
  8: "Sound Designer",
}

class Utils {
  isMobile() {
    let viewportWidth = window.innerWidth
    if (viewportWidth <= 768) {
      return true
    } else {
      return false
    }
  }

  pageIntroAnim() {
    const pageContent = document.querySelector(".page-content")
    if (!pageContent) return
    gsap.fromTo(pageContent, { opacity: 0, y: -12 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 })
  }
}

export default new Utils()
