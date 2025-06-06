import { LitElement, html, css } from "lit"
import { anchorRoute, gotoRoute } from "./../Router"
import Auth from "./../Auth"
import App from "./../App"

customElements.define(
  "va-app-header",
  class AppHeader extends LitElement {
    constructor() {
      super()
    }

    static get properties() {
      return {
        title: { type: String },
        user: { type: Object },
      }
    }

    firstUpdated() {
      super.firstUpdated()
      this.navActiveLinks()
    }

    // highlight active links in the navigation
    navActiveLinks() {
      const currentPath = window.location.pathname
      const navLinks = this.querySelectorAll(".app-top-nav a, .app-side-menu-items a")
      navLinks.forEach((navLink) => {
        if (navLink.href.slice(-1) === "#") return
        if (navLink.pathname === currentPath) {
          navLink.classList.add("active")
        }
      })
    }

    hamburgerClick() {
      const appMenu = this.querySelector(".app-side-menu")
      appMenu.show()
    }

    menuClick(e) {
      e.preventDefault()
      const pathname = e.target.closest("a").pathname
      const appSideMenu = this.querySelector(".app-side-menu")
      appSideMenu.hide()
      appSideMenu.addEventListener(
        "sl-after-hide",
        () => {
          gotoRoute(pathname)
        },
        { once: true }
      )
    }

    createRenderRoot() {
      return this
    }

    // Render navigation items
    /**
     * @param {boolean} isSideMenu - If true, renders for side menu; otherwise, renders for top nav.
     * @returns {TemplateResult} The rendered navigation items.
     */
    renderNavItems(isSideMenu = false) {
      return html`
        <a href="/" @click=${isSideMenu ? this.menuClick : anchorRoute}>${isSideMenu ? "Dashboard" : "Home"}</a>
        ${this.user && this.user.accessLevel == 2
          ? html`<a href="/newProject" @click=${isSideMenu ? this.menuClick : anchorRoute}>Add Project</a>`
          : ""}
        <a href="/browseProjects" @click=${isSideMenu ? this.menuClick : anchorRoute}>Browse Projects</a>
        <a href="/messages" @click=${isSideMenu ? this.menuClick : anchorRoute}>Messages</a>
        <a href="/favouriteProjects" @click=${isSideMenu ? this.menuClick : anchorRoute}>Favourite Projects</a>
        <a
          href="/profile"
          @click=${isSideMenu ? this.menuClick : anchorRoute}
          style="display:${isSideMenu ? "block" : "none"}"
          >Profile</a
        >
        <a href="#" @click=${() => Auth.signOut()} style="display:${isSideMenu ? "block" : "none"}">Sign Out</a>
      `
    }

    render() {
      return html`
        <style>
          * {
            box-sizing: border-box;
          }
          .app-header {
            background: var(--body-bg);
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            height: var(--app-header-height);
            color: #fff;
            display: flex;
            z-index: 9;
            box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.2);
            align-items: center;
          }

          .app-header-main {
            flex-grow: 1;
            display: flex;
            align-items: center;
          }

          .app-header-main::slotted(h1) {
            color: #fff;
          }

          /app-logo {
            display: flex;
            align-items: center;
            margin-right: 1em;
          }

          .app-logo a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2em;
            padding: 0.6em;
            display: inline-block;
          }

          .app-logo img {
            width: 90px;
            height: auto;
          }

          .hamburger-btn::part(base) {
            color: #fff;
          }

          .app-top-nav {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            /* Remove old height:100% and align-items:center if they cause layout issues */
          }

          .nav-links {
            display: flex;
            gap: 0.5em; /* adjust spacing between links */
          }

          .app-top-nav sl-dropdown {
            margin-left: auto;
            /* Ensures avatar stays at the far right */
          }

          .app-top-nav a {
            display: inline-block;
            padding: 0.8em;
            text-decoration: none;
            color: #fff;
          }

          .app-side-menu-items a {
            display: block;
            padding: 0.5em;
            text-decoration: none;
            font-size: 1.3em;
            color: #333;
          }

          .app-side-menu-logo {
            width: 80px;
            margin-bottom: 1em;
            position: static;
            display: block;
            top: 2em;
            left: 1.5em;
          }

          .page-title {
            color: var(--app-header-txt-color);
            margin-right: 0.5em;
            margin-bottom: 0em;
            font-size: var(--app-header-title-font-size);
          }

          /* active nav links */
          .app-top-nav a.active,
          .app-side-menu-items a.active {
            font-weight: bold;
            text-decoration: underline;
          }

          /* Hide hamburger and side menu by default (desktop) */
          .hamburger-btn,
          .app-side-menu {
            display: none !important;
          }

          /* Show top nav by default */
          .app-top-nav {
            display: flex !important;
          }

          /* On mobile: show hamburger and side menu, hide top nav */
          @media all and (max-width: 768px) {
            .app-top-nav {
              display: none !important;
            }
            .hamburger-btn,
            .app-side-menu {
              display: block !important;
            }

            .app-logo {
              display: none;
            }
          }
        </style>

        <header class="app-header">
          <div class="app-logo">
            <a href="/"><img src="/images/logo-white.svg" alt="Logo" /></a>
          </div>
          <sl-icon-button
            class="hamburger-btn"
            name="list"
            @click="${this.hamburgerClick}"
            style="font-size: 1.5em;"
          ></sl-icon-button>

          <div class="app-header-main">
            ${this.title ? html`<h1 class="page-title">${this.title}</h1>` : ``}
            <slot></slot>
          </div>

          <nav class="app-top-nav">
            <div class="nav-links">${this.renderNavItems(false)}</div>
            <sl-dropdown>
              <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
                <sl-avatar
                  style="--size: 24px;"
                  image=${this.user && this.user.avatar ? `${App.apiBase}/images/${this.user.avatar}` : ""}
                ></sl-avatar>
                ${this.user && this.user.firstName}
              </a>
              <sl-menu>
                <sl-menu-item @click="${() => gotoRoute("/profile")}">Profile</sl-menu-item>
                <sl-menu-item @click="${() => gotoRoute("/editProfile")}">Edit Profile</sl-menu-item>
                <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
              </sl-menu>
            </sl-dropdown>
          </nav>
        </header>

        <sl-drawer class="app-side-menu" placement="start">
          <img class="app-side-menu-logo" src="/images/logo.svg" />
          <nav class="app-side-menu-items">${this.renderNavItems(true)}</nav>
        </sl-drawer>
      `
    }
  }
)
