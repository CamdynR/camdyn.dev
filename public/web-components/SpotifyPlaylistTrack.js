// SpotifyPlaylistTrack.js

class SpotifyPlaylistTrack extends HTMLElement {
  static observedAttributes = ['title', 'artists', 'preview-src', 'duration'];
  #ELEMS = {};

  constructor() {
    super();

    let markup = document.createElement('template');
    markup.innerHTML = /* HTML */ `
      <p id="ordinal">
        <svg
          id="play-icon"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          data-testid="play-icon"
          viewBox="0 0 16 16"
          height="16"
          width="16"
        >
          <path
            d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
          ></path>
        </svg>
        <svg
          id="pause-icon"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          data-testid="pause-icon"
          viewBox="0 0 16 16"
          height="16"
          width="16"
        >
          <path
            d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
          ></path>
        </svg>
        <span id="ordinal-text"></span>
      </p>
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
        align-items: center;
        background-color: transparent;
        border-radius: 0.25rem;
        cursor: default;
        display: grid;
        grid-template-columns: 32px 1fr max-content;
        padding: 0.5rem 0;
      }

      :host(.active) {
        background-color: rgba(0, 0, 0, 0.2) !important;

        #title {
          font-weight: bold;
        }

        #play-icon {
          display: block !important;
        }

        #pause-icon,
        #ordinal-text {
          display: none !important;
        }
      }

      :host(.active.playing) {
        #pause-icon {
          display: block !important;
        }

        #play-icon,
        #ordinal-text {
          display: none !important;
        }
      }

      :host(:hover) {
        background-color: #ffffff1a !important;

        #ordinal {
          #play-icon {
            display: block;
          }

          #ordinal-text {
            display: none;
          }
        }
      }

      :host([explicit]) #explicit-tag {
        display: block !important;
      }

      p {
        margin: 0;
      }

      #ordinal {
        font-size: 0.875rem;
        font-weight: 200;
        opacity: 0.6;
        place-self: center;

        #play-icon,
        #pause-icon {
          display: none;
          fill: white;
        }
      }

      song-metadata {
        #title {
          font-size: 0.875rem;
          line-height: 1.3;
          text-overflow: ellipsis;
          text-wrap: nowrap;
        }
  
        #artists-wrapper {
          align-items: center;
          display: flex;
          opacity: 0.6;

          #explicit-tag {
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 0.125rem;
            color: #121212;
            display: none;
            font-size: 0.5625rem;
            font-weight: 600;
            margin-right: 0.65ch;
            padding: 0.04rem 0.325rem;
          }

          #artists {
            color: #b3b3b3;
            font-size: 0.6875rem;
          }
        }
      }

      #duration {
        font-family: monospace;
        font-size: 0.875rem;
        font-weight: 200;
        opacity: 0.6;
        padding: 0 1rem 0 0.5rem;
      }
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(styles, ...markup.content.children);

    // Query Elements for Later Reference
    let root = this.shadowRoot;
    this.#ELEMS.ordinalText = root.querySelector('#ordinal-text');
    this.#ELEMS.playIcon = root.querySelector('#play-icon');
    this.#ELEMS.songTitle = root.querySelector('#title');
    this.#ELEMS.artists = root.querySelector('#artists');
    this.#ELEMS.duration = root.querySelector('#duration');
    this.#ELEMS.previewAudio = root.querySelector('#preview-audio');

    this.#attachEventListeners();
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
    this.#ELEMS.ordinalText.innerText = ordinal;
  }

  #attachEventListeners() {
    this.addEventListener('click', () => {
      this.classList.add('active');
      this.classList.toggle('playing');

      if (this.classList.contains('playing')) {
        this.#ELEMS.previewAudio.play();
      } else {
        this.#ELEMS.previewAudio.pause();
      }

      let event = new CustomEvent('spotify-playlist-track-active', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
    window.addEventListener('spotify-playlist-track-active', (e) => {
      if (e.target === this) return;
      this.classList.remove('active');
      this.classList.remove('playing');
      this.classList.remove('paused');
      this.#ELEMS.previewAudio.pause();
    });
  }
}

customElements.define('spotify-playlist-track', SpotifyPlaylistTrack);
