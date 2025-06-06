import App from "./../../App"
import Auth from "./../../Auth"
import { html, render } from "lit"
import { anchorRoute, gotoRoute } from "./../../Router"
import Utils from "./../../Utils"

class SignUpView {
  init() {
    console.log("SignUpView.init")
    document.title = "Sign In"
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e) {
    e.preventDefault()
    const submitBtn = document.querySelector(".submit-btn")
    submitBtn.setAttribute("loading", "")
    const formData = new FormData(e.target)

    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute("loading")
    })
  }

  render() {
    const template = html`
      <div class="page-content page-centered signinup-page">
        <img class="signinup-logo" src="/images/logo.svg" />
        <div class="signinup-box">
          <h1>Sign Up</h1>
          <form class="input-validation-required" @submit="${this.signUpSubmitHandler}">
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>
            <div class="input-group">
              <sl-select name="accessLevel" placeholder="I am a...">
                <sl-option value="1">Visionary</sl-option>
                <sl-option value="2">Talent</sl-option>
              </sl-select>
            </div>
            <sl-button variant="primary" type="submit" class="submit-btn" style="width: 100%;">Sign me up!</sl-button>
          </form>
          <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new SignUpView()
