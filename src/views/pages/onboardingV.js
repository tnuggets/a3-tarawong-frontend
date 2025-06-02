import App from "../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "../../Router"
import Auth from "../../Auth"
import Utils from "../../Utils"

class OnboardingVView {
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
        <h1>What type of project will you be working on?</h1>
        <div class="input-group">
          <sl-select placeholder="Select project type..." @sl-change=${(e) => this.handleSelectChange(e)}>
            <sl-option value="option-1">Advertisement</sl-option>
            <sl-option value="option-2">Film</sl-option>
            <sl-option value="option-3">Photoshoot</sl-option>
            <sl-option value="option-4">Portfolio</sl-option>
            <sl-option value="option-5">Social Media</sl-option>
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

export default new OnboardingVView()
