import App from "../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "../../Router"
import Auth from "../../Auth"
import Utils from "../../Utils"
import Toast from "../../Toast"
import UserAPI from "../../UserAPI"

class FavouriteProjectsView {
  init() {
    document.title = "Favourite Projects"
    this.favProjects = null
    this.render()
    Utils.pageIntroAnim()
    this.getFavProjects()
  }

  async getFavProjects() {
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favProjects = currentUser.favouriteProjects
      console.log(this.favProjects)
      this.render()
    } catch (err) {
      Toast.show(err, "error")
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="Profile"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <h1>Favourite Projects</h1>
        <div class="projects-grid">
          ${this.favProjects == null
            ? html` <sl-spinner></sl-spinner> `
            : html`
                ${this.favProjects.map(
                  (project) => html`
                    <va-project
                      class="project-card"
                      id="${project._id}"
                      name="${project.name}"
                      description="${project.description}"
                      price="${project.price}"
                      user="${JSON.stringify(project.user)}"
                      image="${project.image}"
                      gender="${project.gender}"
                      length="${project.length}"
                    >
                    </va-project>
                  `
                )}
              `}
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new FavouriteProjectsView()
