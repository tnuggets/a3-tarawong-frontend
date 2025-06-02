import App from "./../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "./../../Router"
import Auth from "./../../Auth"
import Utils from "./../../Utils"

class Onboarding1View {
  init() {
    document.title = "Onboarding Step 1"
    this.render()
    Utils.pageIntroAnim()
  }

  render() {
    const template = html`
      <div class="page-content">
        <h1>What best describes you?</h1>
        <p></p>
        <div class="onboarding-buttons">
          <sl-button class="talentOBBtn" @click=${() => gotoRoute("/onboardingT")}>Talent</sl-button>
          <sl-button class="visionaryOBBtn" @click=${() => gotoRoute("/onboardingV")}>Visionary</sl-button>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new Onboarding1View()
