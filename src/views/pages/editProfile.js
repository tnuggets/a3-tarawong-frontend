import App from "./../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "./../../Router"
import Auth from "./../../Auth"
import Utils from "./../../Utils"
import UserAPI from "./../../UserAPI"
import Toast from "../../Toast"
import moment from "moment"

class EditProfileView {
  init() {
    console.log("EditProfileView.init")
    document.title = "Edit Profile"
    this.user = null
    this.render()
    Utils.pageIntroAnim()
    this.getUser()
  }

  async getUser() {
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)
      this.render()
    } catch (err) {
      Toast.show(err, "error")
    }
  }

  async updateProfileSubmitHandler(e) {
    e.preventDefault()
    const submitBtn = document.querySelector(".submit-btn")
    submitBtn.setAttribute("loading", "")
    try {
      const formData = new FormData(e.target)
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)
      delete updatedUser.password
      this.user = updatedUser
      Auth.currentUser = updatedUser
      this.render()
      Toast.show("profile updated")
    } catch (err) {
      Toast.show(err, "error")
    }
    submitBtn.removeAttribute("loading")
  }

  render() {
    const template = html`
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content edit-profile-page light-bg">
        ${this.user == null
          ? html` <sl-spinner></sl-spinner> `
          : html`
              <p>Updated: ${moment(Auth.currentUser.updatedAt).format("MMMM Do YYYY, @ h:mm a")}</p>
              <sl-tab-group placement="start">
                <sl-tab slot="nav" panel="acc-info" class="edit-profile-tabs"> Account Information</sl-tab>
                <sl-tab slot="nav" panel="change-pass" class="edit-profile-tabs">Change Password</sl-tab>
                <sl-tab slot="nav" panel="delete-acc" class="delete-tab edit-profile-tabs">Delete Account</sl-tab>

                <sl-tab-panel name="acc-info">
                  <form
                    class="page-form input-validation-required edit-profile-form"
                    @submit=${this.updateProfileSubmitHandler.bind(this)}
                  >
                    <div class="acc-info-header">
                      <h2>Account Information</h2>
                      <div class="acc-info-header-row">
                        <div class="input-group">
                          <sl-select
                            name="role"
                            label="Role"
                            value="${this.user.role}"
                            placeholder="What is your role?"
                          >
                            <sl-option value="1">Director</sl-option>
                            <sl-option value="2">Creative Director</sl-option>
                            <sl-option value="3">Film Director</sl-option>
                            <sl-option value="4">Photographer</sl-option>
                            <sl-option value="5">Actor</sl-option>
                            <sl-option value="6">Model</sl-option>
                            <sl-option value="7">Make-up artist</sl-option>
                            <sl-option value="8">Sound Designer</sl-option>
                          </sl-select>
                        </div>
                        <div class="input-group edit-avatar">
                          ${this.user.avatar
                            ? html` <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar> `
                            : ""}
                          <input
                            type="file"
                            id="avatar-upload"
                            name="avatar"
                            class="file-btn"
                            @change=${this.showFileName}
                          />
                          <label for="avatar-upload" class="custom-file-btn">Upload new photo</label>
                          <span class="file-name"></span>
                        </div>
                      </div>
                    </div>

                    <div class="basic-info-container">
                      <div class="basic-info-header">
                        <h3>Basic Information</h3>
                      </div>
                      <div class="basic-info-row">
                        <div class="input-group">
                          <sl-input
                            type="text"
                            name="firstName"
                            label="First Name"
                            value="${this.user.firstName}"
                            placeholder="First Name"
                            ><sl-icon name="pencil" slot="suffix"></sl-icon
                          ></sl-input>
                        </div>
                        <div class="input-group">
                          <sl-input
                            type="text"
                            name="lastName"
                            label="Last Name"
                            value="${this.user.lastName}"
                            placeholder="Last Name"
                            ><sl-icon name="pencil" slot="suffix"></sl-icon
                          ></sl-input>
                        </div>
                      </div>
                      <div class="basic-info-row">
                        <div class="input-group">
                          <sl-select
                            name="pronouns"
                            label="Pronouns"
                            value="${this.user.pronouns}"
                            placeholder="What are your pronouns?"
                          >
                            <sl-option value="She/Her">She/Her</sl-option>
                            <sl-option value="He/Him">He/Him</sl-option>
                            <sl-option value="They/Them">They/Them</sl-option>
                            <sl-option value="Ze/Hir">Ze/Hir</sl-option>
                            <sl-option value="Xe/Xem">Xe/Xem</sl-option>
                            <sl-option value="Ver/Vir">Ver/Vir</sl-option>
                            <sl-option value="Te/Tem">Te/Tem</sl-option>
                            <sl-option value="Ey/Em">Ey/Em</sl-option>
                            <sl-option value="Other">Other</sl-option>
                          </sl-select>
                        </div>
                        <div class="input-group">
                          <sl-input
                            type="text"
                            name="email"
                            label="Email"
                            value="${this.user.email}"
                            placeholder="Email Address"
                            ><sl-icon name="pencil" slot="suffix"></sl-icon
                          ></sl-input>
                        </div>
                      </div>
                      <div class="input-group basic-info-row-2">
                        <sl-input
                          type="text"
                          name="location"
                          label="Location"
                          value="${this.user.location}"
                          placeholder="Where are you based?"
                          ><sl-icon name="pencil" slot="suffix"></sl-icon
                        ></sl-input>
                      </div>
                      <div class="input-group basic-info-row-2">
                        <sl-textarea
                          name="bio"
                          rows="4"
                          label="Bio"
                          placeholder="Introduce yourself..."
                          value="${this.user.bio}"
                        ></sl-textarea>
                      </div>
                    </div>
                    <div class="form-actions">
                      <sl-button variant="primary" type="submit" class="submit-btn">Update Profile</sl-button>
                    </div>
                  </form></sl-tab-panel
                >
                <sl-tab-panel name="change-pass">Maybe get rid of this tab</sl-tab-panel>
                <sl-tab-panel name="delete-acc">Add a delete account button</sl-tab-panel>
              </sl-tab-group>
            `}
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()
