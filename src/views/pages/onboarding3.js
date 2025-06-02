import App from "./../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "./../../Router"
import Auth from "./../../Auth"
import Utils from "./../../Utils"

class Onboarding3View {
  constructor() {
    this.selectedLocation = null
  }

  init() {
    document.title = "Onboarding Step 3"
    this.render()
    Utils.pageIntroAnim()
  }

  selectLocation(location) {
    this.selectedLocation = location
    this.render()
  }

  render() {
    const locations = ["New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"]

    const template = html`
      <div class="page-content">
        <h1>Where are you based?</h1>
        <p></p>
        <div class="onboarding-locations">
          ${locations.map(
            (location) => html`
              <sl-button
                class="locationOBBtn ${this.selectedLocation === location ? "selected" : ""}"
                @click=${() => this.selectLocation(location)}
                >${location}</sl-button
              >
            `
          )}
        </div>
        <div class="continue-btn-wrapper">
          <sl-button ?disabled=${!this.selectedLocation} @click=${() => gotoRoute("/")}> Continue </sl-button>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new Onboarding3View()
