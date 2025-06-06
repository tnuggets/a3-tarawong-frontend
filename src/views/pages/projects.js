import App from "../../App"
import { html, render } from "lit"
import { gotoRoute, anchorRoute } from "../../Router"
import Auth from "../../Auth"
import Utils from "../../Utils"
import ProjectAPI from "../../ProjectAPI"

class ProjectsView {
  async init() {
    document.title = "Browse Projects"
    this.projects = null
    this.render()
    Utils.pageIntroAnim()
    await this.getProjects()
    // this.filterProjects("price", "10-20")
  }

  async filterProjects(field, match) {
    // validate the field and match
    if (!field || !match) return

    // get fresh copy of the projects
    this.projects = await ProjectAPI.getProjects()

    let filteredProjects

    // gender
    if (field === "gender") {
      filteredProjects = this.projects.filter((project) => project.gender == match)
    }
    // length
    if (field === "length") {
      filteredProjects = this.projects.filter((project) => project.length == match)
    }
    // price
    if (field === "price") {
      // get priceRangeStart and priceRangeEnd from match
      const priceRangeStart = match.split("-")[0]
      const priceRangeEnd = match.split("-")[1]
      filteredProjects = this.projects.filter(
        (project) => project.price >= priceRangeStart && project.price <= priceRangeEnd
      )
    }

    // render
    this.projects = filteredProjects
    this.render()
  }

  // clear all filter buttons active (variant = primary)
  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => btn.removeAttribute("variant"))
  }

  handleFilterBtn(e) {
    // clear all filter buttons active
    this.clearFilterBtns()

    // set button active (variant = primary)
    console.log(e.target)
    e.target.setAttribute("variant", "primary")

    // extract field and match from the button
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")

    // filter projects
    this.filterProjects(field, match)
  }

  clearFilters() {
    // get fresh copy of the projects
    this.getProjects()
    // clear all filter buttons active
    this.clearFilterBtns()
  }

  // declare the getProjects function
  async getProjects() {
    try {
      this.projects = await ProjectAPI.getProjects()
      console.log(this.projects)
      // If the projects are loaded, re-render the page
      this.render()
    } catch (err) {
      Toast.show(err, "error")
    }
  }

  render() {
    const template = html`
      <style>
        .filter-menu {
          display: flex;
          align-items: center;
        }
        .filter-menu > div {
          margin-right: 1em;
        }
      </style>
      <va-app-header title="Browse Projects" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <div class="filter-menu">
          <div>Filter by</div>
          <div>
            <strong>Gender</strong>
            <sl-button
              class="filter-btn"
              size="small"
              data-field="gender"
              data-match="m"
              @click=${this.handleFilterBtn.bind(this)}
              >Male</sl-button
            >
            <sl-button
              class="filter-btn"
              size="small"
              data-field="gender"
              data-match="f"
              @click=${this.handleFilterBtn.bind(this)}
              >Female</sl-button
            >
            <sl-button
              class="filter-btn"
              size="small"
              data-field="gender"
              data-match="u"
              @click=${this.handleFilterBtn.bind(this)}
              >Unisex</sl-button
            >
          </div>
          <div>
            <strong>Length</strong>
            <sl-button
              class="filter-btn"
              size="small"
              data-field="length"
              data-match="s"
              @click=${this.handleFilterBtn.bind(this)}
              >Short</sl-button
            >
            <sl-button
              class="filter-btn"
              size="small"
              data-field="length"
              data-match="m"
              @click=${this.handleFilterBtn.bind(this)}
              >Medium</sl-button
            >
            <sl-button
              class="filter-btn"
              size="small"
              data-field="length"
              data-match="l"
              @click=${this.handleFilterBtn.bind(this)}
              >Long</sl-button
            >
          </div>
          <div>
            <strong>Price</strong>
            <sl-button
              class="filter-btn"
              size="small"
              data-field="price"
              data-match="10-20"
              @click=${this.handleFilterBtn.bind(this)}
              >$10-$20</sl-button
            >
            <sl-button
              class="filter-btn"
              size="small"
              data-field="price"
              data-match="21-30"
              @click=${this.handleFilterBtn.bind(this)}
              >$21-$30</sl-button
            >
            <sl-button
              class="filter-btn"
              size="small"
              data-field="price"
              data-match="31-40"
              @click=${this.handleFilterBtn.bind(this)}
              >$31-$40</sl-button
            >
          </div>
          <div>
            <sl-button size="small" @click=${this.clearFilters.bind(this)}>Clear Filters</sl-button>
          </div>
        </div>

        <div class="projects-grid">
          ${this.projects == null
            ? html` <sl-spinner></sl-spinner> `
            : html`
                ${this.projects.map(
                  (project) => html`
                    <va-project
                      class="project-card"
                      id="${project._id}"
                      name="${project.name}"
                      overview="${project.overview}"
                      price="${project.price}"
                      user=${JSON.stringify(project.user)}
                      image="${project.image}"
                      location="${project.location}"
                      date="${project.date}"
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

export default new ProjectsView()
