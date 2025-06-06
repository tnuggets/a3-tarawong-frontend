import App from "./../../App"
import { html, render } from "lit"
import { anchorRoute, gotoRoute } from "./../../Router"
import Auth from "./../../Auth"
import Utils from "./../../Utils"

class SignInView {
  init() {
    console.log("SignInView.init")
    document.title = "Sign In"
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const submitBtn = document.querySelector(".submit-btn")
    submitBtn.setAttribute("loading", "")

    // sign in using Auth
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute("loading")
    })
  }

  render() {
    const template = html`
      <div class="page-content page-centered signinup-page">
        <img class="signinup-logo" src="/images/logo.svg" />
        <div class="signinup-box">
          <div style="font-size: 2em;">
            <sl-icon name="box-arrow-in-right"></sl-icon>
          </div>
          <h2>Log in with email</h2>
          <form class="input-validation-required" @submit="${this.signInSubmitHandler}">
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required> ></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>
            <sl-button type="submit" variant="primary" class="submit-btn" style="width: 100%;">Sign In!</sl-button>
          </form>
          <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new SignInView()
