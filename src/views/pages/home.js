import App from "./../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "./../../Router"
import Auth from "./../../Auth"
import Utils from "./../../Utils"

class HomeView {
  init() {
    console.log("HomeView.init")
    document.title = "Dashboard"
    this.render()
    Utils.pageIntroAnim()
  }

  render() {
    const template = html`
      <va-app-header title="Dashboard" user=${JSON.stringify(Auth.currentUser)}></va-app-header>

      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}!</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute("/profile")}>View Profile</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>
        <p></p>
        <sl-button @click=${() => gotoRoute("/test")}>Test</sl-button>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()
