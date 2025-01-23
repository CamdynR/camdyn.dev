// SpotifyArtist.js

class SpotifyArtist extends HTMLElement {
  static observedAttributes = ['name', 'art-src', 'art-alt', 'spotify-href'];
  #ELEMS = {};

  constructor() {
    super();

    let markup = document.createElement('template');
    markup.innerHTML = /* HTML */ `
      <a title="Play on Spotify" id="art-link" target="_blank">
        <img id="art" src="" alt="" height="152" width="152" />
      </a>
    `;

    let styles = document.createElement('style');
    styles.innerHTML = /* CSS */ `
      :host {
        background-color: #1f1f1f;
        border-radius: 0.75rem;
        display: grid;
        padding: 1.5rem;
      }

      #art,
      #art-link {
        height: 152px;
        width: 152px;
      }

      #art {
        border-radius: 0.75rem;
        transition: 0.3s ease opacity;
  
        &:hover {
          opacity: 0.8;
          transition: 0.4s ease opacity;
        }
      }
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(styles, ...markup.content.children);

    // Query Elements for Later Reference
    let root = this.shadowRoot;
    this.#ELEMS.art = root.querySelector('#art');
    this.#ELEMS.artLink = root.querySelector('#art-link');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        break;
      case 'art-src':
        this.#ELEMS.art.setAttribute('src', newValue);
        break;
      case 'art-alt':
        this.#ELEMS.art.setAttribute('alt', newValue);
        break;
      case 'spotify-href':
        this.#ELEMS.artLink.setAttribute('href', newValue);
        break;
    }
  }
}

customElements.define('spotify-artist', SpotifyArtist);
