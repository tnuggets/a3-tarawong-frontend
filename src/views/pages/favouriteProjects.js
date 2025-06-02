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
    const isTalent = Auth.currentUser.accessLevel == 1
    const isVisionary = Auth.currentUser.accessLevel == 2

    const template = html`
      <va-app-header title="Dashboard" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}!</h1>
        ${isTalent
          ? html`
              <p>Looks like you haven't saved any projects yet</p>
              <sl-button class="anim-in" @click=${() => gotoRoute("/browseProjects")}>
                Check out more projects
              </sl-button>
            `
          : ""}
        ${isVisionary
          ? html`
              <p>Looks like you haven't saved any talents yet</p>
              <sl-button class="anim-in" @click=${() => gotoRoute("/browseProjects")}>
                Check out more projects
              </sl-button>
            `
          : ""}
        <p>&nbsp;</p>
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
                      overview="${project.overview}"
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
