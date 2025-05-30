import App from "../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "../../Router"
import Auth from "../../Auth"
import Utils from "../../Utils"
import ProjectAPI from "../../ProjectAPI"
import Toast from "../../Toast"

class newProjectView {
  init() {
    document.title = "New Project"
    this.render()
    Utils.pageIntroAnim()
  }

  async newProjectSubmitHandler(e) {
    e.preventDefault()
    const submitBtn = document.querySelector(".submit-btn")
    submitBtn.setAttribute("loading", "")
    const formData = new FormData(e.target)

    try {
      await ProjectAPI.newProject(formData)
      Toast.show("Project added successfully!!")
      submitBtn.removeAttribute("loading")

      // reset the form
      // reset text + textarea inputs
      const textInputs = document.querySelectorAll("sl-input, sl-textarea")
      if (textInputs)
        textInputs.forEach((textInput) => (textInput.value = null))
      // reset radio inputs
      const radioInputs = document.querySelectorAll("sl-radio-group")
      if (radioInputs)
        radioInputs.forEach((radioInput) => (radioInput.value = null))
      // reset file input
      const fileInput = document.querySelector("input[type=file]")
      if (fileInput) fileInput.value = null
    } catch (err) {
      Toast.show(err, "error")
      // remove loading state from submit button
      submitBtn.removeAttribute("loading")
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="New Project"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <h1>New Project</h1>
        <form class="page-form" @submit=${this.newProjectSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input
              name="name"
              type="text"
              placeholder="Project Name"
              required
            ></sl-input>
          </div>
          <div class="input-group">
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea
              name="description"
              rows="3"
              placeholder="Description"
            ></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br />
            <input type="file" name="image" />
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-radio-group name="gender" label="Gender">
              <sl-radio value="m">Male</sl-radio>
              <sl-radio value="f">Female</sl-radio>
              <sl-radio value="u">Unisex</sl-radio>
            </sl-radio-group>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-radio-group name="length" label="Length">
              <sl-radio value="s">Short</sl-radio>
              <sl-radio value="m">Medium</sl-radio>
              <sl-radio value="l">Long</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button variant="primary" type="submit" class="submit-btn"
            >Add Project</sl-button
          >
        </form>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new newProjectView()
