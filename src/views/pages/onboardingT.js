import App from "../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "../../Router"
import Auth from "../../Auth"
import Utils from "../../Utils"

class OnboardingTView {
  constructor() {
    this.selectedDiscipline = null
  }

  init() {
    document.title = "Template"
    this.render()
    Utils.pageIntroAnim()
  }

  handleSelectChange(e) {
    this.selectedDiscipline = e.target.value
    this.render()
  }

  render() {
    const template = html`
      <div class="page-content">
        <h1>What is your primary creative discipline?</h1>
        <div class="input-group">
          <sl-select placeholder="I am a..." @sl-change=${(e) => this.handleSelectChange(e)}>
            <sl-option value="Actor">Actor</sl-option>
            <sl-option value="Model">Model</sl-option>
            <sl-option value="Makeup Artist">Makeup Artist</sl-option>
            <sl-option value="Photographer">Photographer</sl-option>
            <sl-option value="Set Designer">Set Designer</sl-option>
            <sl-option value="Sound Designer">Sound Designer</sl-option>
          </sl-select>
        </div>
        <div class="continue-btn-wrapper">
          <sl-button ?disabled=${!this.selectedDiscipline} @click=${() => gotoRoute("/onboarding3")}>
            Continue
          </sl-button>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new OnboardingTView()
