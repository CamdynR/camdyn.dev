// SpotifyPlaylistTrack.js

class SpotifyPlaylistTrack extends HTMLElement {
  static observedAttributes = ['title', 'artists', 'preview-src', 'duration'];
  #ELEMS = {};

  constructor() {
    super();

    let markup = document.createElement('template');
    markup.innerHTML = /* HTML */ `
      <p id="ordinal"></p>
      <song-metadata>
        <p id="title"></p>
        <p id="artists-wrapper">
          <span id="explicit-tag">E</span>
          <span id="artists"></span>
        </p>
      </song-metadata>
      <time id="duration"></time>
      <audio id="preview-audio" src="" hidden></audio>
    `;

    let styles = document.createElement('style');
    styles.innerHTML = /* CSS */ `
      :host {
        background-color: transparent;
        display: grid;
        grid-template-columns: 32px 1fr max-content;
      }

      :host([explicit]) #explicit-tag {
        display: block !important;
      }

      p {
        margin: 0;
      }

      #ordinal {
        font-size: 0.875rem;
        opacity: 0.7;
        place-self: center;
      }

      song-metadata {
        #title {
          font-size: 0.875rem;
        }
  
        #artists-wrapper {
          align-items: center;
          display: flex;

          #explicit-tag {
            display: none;
            font-size: 0.5625rem;
          }
  
          #artists {
            font-size: 0.6875rem;
          }
        }
      }

      #duration {
        font-size: 0.875rem;
      }
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(styles, ...markup.content.children);

    // Query Elements for Later Reference
    let root = this.shadowRoot;
    this.#ELEMS.ordinal = root.querySelector('#ordinal');
    this.#ELEMS.songTitle = root.querySelector('#title');
    this.#ELEMS.artists = root.querySelector('#artists');
    this.#ELEMS.duration = root.querySelector('#duration');
    this.#ELEMS.previewAudio = root.querySelector('#preview-audio');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.#ELEMS.songTitle.innerText = newValue;
        break;
      case 'artists':
        this.#ELEMS.artists.innerText = newValue;
        break;
      case 'preview-src':
        this.#ELEMS.previewAudio.setAttribute('src', newValue);
        break;
      case 'duration':
        let time = newValue.split(':');
        if (time[0][0] === '0') time[0] = time[0].slice(1);
        let duration = `PT${time[0]}M${time[1]}S`;
        this.#ELEMS.duration.innerText = newValue;
        this.#ELEMS.duration.setAttribute('datetime', duration);
        break;
    }
  }

  connectedCallback() {
    let childList = [...this.parentElement.children];
    let ordinal = childList.indexOf(this) + 1;
    this.#ELEMS.ordinal.innerText = ordinal;
  }

  #attachEventListeners() {}
}

customElements.define('spotify-playlist-track', SpotifyPlaylistTrack);
