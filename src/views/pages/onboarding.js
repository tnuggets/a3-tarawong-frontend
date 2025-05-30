import App from "../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "../../Router"
import Auth from "../../Auth"
import Utils from "../../Utils"
import UserAPI from "../../UserAPI"

class OnboardingView {
  // new users will be redirected to this page
  init() {
    document.title = "Onboarding"
    this.render()
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  // When new user clicks on the "Okay got it!" button, update newUser to false
  async updateCurrentUser() {
    try {
      const updatedUser = await UserAPI.updateUser(
        Auth.currentUser._id,
        { newUser: false },
        "json"
      )
      console.log("user updated")
      console.log(updatedUser)
    } catch (err) {
      Toast.show(err, "error")
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="Onboarding"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content calign">
        <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
        <p>
          This is a quick tour to teach you the basics of using Haircuts ...
        </p>

        <div class="guide-step">
          <h4>Search Hairdressers</h4>
          <img
            src="https://plchldr.co/i/500x300?&bg=dddddd&fc=666666&text=IMAGE"
          />
        </div>

        <div class="guide-step">
          <h4>Find a haircut</h4>
          <img
            src="https://plchldr.co/i/500x300?&bg=dddddd&fc=666666&text=IMAGE"
          />
        </div>

        <div class="guide-step">
          <h4>Save haircuts to favourites</h4>
          <img
            src="https://plchldr.co/i/500x300?&bg=dddddd&fc=666666&text=IMAGE"
          />
        </div>

        <sl-button variant="primary" @click=${() => gotoRoute("/")}
          >Okay got it!</sl-button
        >
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new OnboardingView()
