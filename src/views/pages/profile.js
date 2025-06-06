import App from "./../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "./../../Router"
import Auth from "./../../Auth"
//import Utils from "./../../Utils"
import Utils, { roleMap } from "./../../Utils"
import moment from "moment"

class ProfileView {
  init() {
    console.log("ProfileView.init")
    document.title = "Profile"
    this.render()
    Utils.pageIntroAnim()
  }

  render() {
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <div class="profile-page-flex">
          <div class="profile-info-container">
            <div class="profile-avatar-group">
              ${Auth.currentUser && Auth.currentUser.avatar
                ? html`
                    <sl-avatar
                      style="--size: 200px; margin-bottom: 1em;"
                      image=${Auth.currentUser && Auth.currentUser.avatar
                        ? `${App.apiBase}/images/${Auth.currentUser.avatar}`
                        : ""}
                    ></sl-avatar>
                  `
                : html` <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar> `}
              <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
              <h5>${Auth.currentUser.pronouns}</h5>
            </div>
            <div class="personal-info-group">
              <h4>PERSONAL INFO</h4>
              <sl-divider></sl-divider>
              <p><sl-icon name="geo-alt"></sl-icon> ${Auth.currentUser.location}</p>
              <p><sl-icon name="envelope"></sl-icon> ${Auth.currentUser.email}</p>
            </div>
          </div>
          <div class="profile-role-container">
            <h2>${roleMap[String(Auth.currentUser.role)] || "Unknown"}</h2>
            ${Auth.currentUser.bio
              ? html`<h4>BIO</h4>
                  <sl-divider></sl-divider>
                  <p>${Auth.currentUser.bio}</p>`
              : html`<p>Bio not set</p>`}
          </div>
        </div>

        <sl-button @click=${() => gotoRoute("/editProfile")}>Edit Profile</sl-button>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new ProfileView()
