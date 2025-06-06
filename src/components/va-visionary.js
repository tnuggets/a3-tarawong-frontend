import { LitElement, html, render } from "lit"
import { anchorRoute, gotoRoute } from "./../Router"
import Auth from "./../Auth"
import App from "./../App"
import UserAPI from "./../UserAPI"
import Toast from "./../Toast"

customElements.define(
  "va-visionary",
  class Visionary extends LitElement {
    constructor() {
      super()
    }

    static get properties() {
      return {
        user: {
          type: Object,
        },
      }
    }

    firstUpdated() {
      super.firstUpdated()
    }

    async moreInfoHandler() {
      // create sl-dialog
      const dialogEl = document.createElement("sl-dialog")
      // add className
      dialogEl.className = "project-dialog"
      // sl-dialog content
      const dialogContent = html`
        <style>
          .wrap {
            display: flex;
          }
          .image {
            width: 50%;
          }
          .image img {
            width: 100%;
          }
          .content {
            padding-left: 1em;
          }
          .gender span,
          .length span {
            text-transform: uppercase;
            font-weight: bold;
          }
          .price {
            font-size: 1.5em;
            color: var(--brand-color);
          }
        </style>
        <div class="wrap">
          <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
          </div>
          <div class="content">
            <h1>${this.name}</h1>
            <p>${this.overview}</p>
            <p class="price">$${this.price}</p>
            <p class="gender">Gender: <span>${this.gender}</span></p>
            <p class="length">Length: <span>${this.length}</span></p>

            <sl-button @click=${this.addFavHandler.bind(this)}>
              <sl-icon slot="prefix" name="heart-fill"></sl-icon>
              Add to Favourites
            </sl-button>
          </div>
        </div>
      `
      // (where's the HTML you want to render, what element are you inserting it into)
      render(dialogContent, dialogEl)

      // append to document.body
      await document.body.append(dialogEl)
      // show dialog
      dialogEl.show()

      // on hide delete dialogEl
      dialogEl.addEventListener("sl-after-hide", () => {
        dialogEl.remove()
      })
    }

    render() {
      return html`
        <style>
          :host {
            display: block;
            height: 100%;
          }
          sl-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          img[slot="image"] {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 0.5em 0.5em 0 0;
          }
          .author {
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
          }
        </style>
        <sl-card>
          <img slot="image" src="${App.apiBase}/images/${this.image}" />
          <h3>${this.name}</h3>
          <h3>$${this.price}</h3>
          <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
          <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
          <sl-icon-button
            name="heart-fill"
            label="Add to favourites"
            @click=${this.addFavHandler.bind(this)}
          ></sl-icon-button>
        </sl-card>
      `
    }
  }
)
