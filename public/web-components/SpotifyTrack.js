// SpotifyTrack.js

class SpotifyTrack extends HTMLElement {
  static observedAttributes = [
    'title',
    'artists',
    'album-art-src',
    'album-art-alt',
    'preview-src',
    'spotify-href'
  ];
  #ELEMS = {};

  constructor() {
    super();

    let markup = document.createElement('template');
    markup.innerHTML = /* HTML */ `
      <a title="Play on Spotify" id="album-art-link" target="_blank">
        <img id="album-art" src="" alt="" height="120" width="120" />
      </a>
      <track-metadata>
        <a id="track-title" href="" title="Play on Spotify" target="blank"></a>
        <p id="artists-wrapper">
          <span id="preview" class="tag">Preview</span>
          <span id="artists"></span>
        </p>
        <a href="" id="save-on-spotify" target="_blank">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height="24"
            width="24"
          >
            <path
              d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
            ></path>
            <path
              d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"
            ></path>
          </svg>
          <span>Save on Spotify</span>
        </a>
      </track-metadata>
      <a href="" id="play-on-spotify" title="Play on Spotify" target="_blank">
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 24 24"
          height="24"
          width="24"
        >
          <path
            d="M12.438 1.009C6.368.769 1.251 5.494 1.008 11.565c-.24 6.07 4.485 11.186 10.556 11.426 6.07.242 11.185-4.484 11.427-10.554.242-6.07-4.484-11.186-10.553-11.428Zm4.644 16.114a.657.657 0 0 1-.897.246 13.22 13.22 0 0 0-4.71-1.602 13.197 13.197 0 0 0-4.968.242.658.658 0 0 1-.31-1.278 14.497 14.497 0 0 1 5.46-.265c1.837.257 3.579.851 5.177 1.76.315.178.425.58.246.896l.002.002Zm1.445-2.887a.853.853 0 0 1-1.158.344 16.214 16.214 0 0 0-5.475-1.797 16.188 16.188 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.852.852 0 0 1 .65-1.018 17.92 17.92 0 0 1 6.362-.241 17.87 17.87 0 0 1 6.049 1.985c.415.224.57.743.344 1.158h.004Zm1.602-3.255a1.052 1.052 0 0 1-1.418.448 19.673 19.673 0 0 0-6.341-2.025 19.642 19.642 0 0 0-6.655.199 1.05 1.05 0 1 1-.417-2.06 21.725 21.725 0 0 1 7.364-.22 21.72 21.72 0 0 1 7.019 2.24c.515.268.715.903.448 1.418Z"
          ></path>
        </svg>
      </a>
      <button id="more-btn" title="More">
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 24 24"
          height="24"
          width="24"
        >
          <path
            d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
          ></path>
        </svg>
      </button>
      <button id="play-preview-btn" title="Play Preview">
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          id="play-svg"
          viewBox="0 0 24 24"
          height="32"
          width="32"
        >
          <path
            d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.75-4.567a.5.5 0 0 0-.75.433v8.268a.5.5 0 0 0 .75.433l7.161-4.134a.5.5 0 0 0 0-.866L9.75 7.433z"
          ></path>
        </svg>
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          id="pause-svg"
          viewBox="0 0 24 24"
          height="32"
          width="32"
          hidden
        >
          <path
            d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
          ></path>
        </svg>
      </button>
      <audio id="preview-audio" src="" hidden></audio>
      <more-menu-overlay hidden>
        <ul id="more-options">
          <li>
            <a href="" target="_blank" id="more-play-on-spotify">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path
                  d="M12.438 1.009C6.368.769 1.251 5.494 1.008 11.565c-.24 6.07 4.485 11.186 10.556 11.426 6.07.242 11.185-4.484 11.427-10.554.242-6.07-4.484-11.186-10.553-11.428Zm4.644 16.114a.657.657 0 0 1-.897.246 13.22 13.22 0 0 0-4.71-1.602 13.197 13.197 0 0 0-4.968.242.658.658 0 0 1-.31-1.278 14.497 14.497 0 0 1 5.46-.265c1.837.257 3.579.851 5.177 1.76.315.178.425.58.246.896l.002.002Zm1.445-2.887a.853.853 0 0 1-1.158.344 16.214 16.214 0 0 0-5.475-1.797 16.188 16.188 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.852.852 0 0 1 .65-1.018 17.92 17.92 0 0 1 6.362-.241 17.87 17.87 0 0 1 6.049 1.985c.415.224.57.743.344 1.158h.004Zm1.602-3.255a1.052 1.052 0 0 1-1.418.448 19.673 19.673 0 0 0-6.341-2.025 19.642 19.642 0 0 0-6.655.199 1.05 1.05 0 1 1-.417-2.06 21.725 21.725 0 0 1 7.364-.22 21.72 21.72 0 0 1 7.019 2.24c.515.268.715.903.448 1.418Z"
                ></path>
              </svg>
              <span>Play on Spotify</span>
            </a>
          </li>
          <li>
            <a href="" target="_blank" id="more-save-on-spotify">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path
                  d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
                ></path>
                <path
                  d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"
                ></path>
              </svg>
              <span>Save on Spotify</span>
            </a>
          </li>
          <li>
            <button id="more-copy-link-btn">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path
                  d="M18.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM15 5.5a3.5 3.5 0 1 1 1.006 2.455L9 12l7.006 4.045a3.5 3.5 0 1 1-.938 1.768l-6.67-3.85a3.5 3.5 0 1 1 0-3.924l6.67-3.852A3.513 3.513 0 0 1 15 5.5zm-9.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm13 6.5a1.5 1.5 0 1 0-.001 3 1.5 1.5 0 0 0 .001-3z"
                ></path>
              </svg>
              <span>Copy Link</span>
            </button>
          </li>
        </ul>
        <ul id="terms-and-privacy">
          <li>
            <a
              href="https://www.spotify.com/us/legal/privacy-policy/"
              target="_blank"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a
              href="https://www.spotify.com/us/legal/end-user-agreement/"
              target="_blank"
              >Terms &amp; Conditions</a
            >
          </li>
        </ul>
        <button id="close-more-menu" title="Close Options">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            class="Svg-sc-ytk21e-0 bneLcE e-9541-icon"
            viewBox="0 0 24 24"
            height="24"
            width="24"
          >
            <path
              d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414z"
            ></path>
          </svg>
        </button>
      </more-menu-overlay>
    `;

    let styles = document.createElement('style');
    styles.innerHTML = /* CSS */ `
      :host {
        align-items: center;
        background-color: #1f1f1f;
        border-radius: 0.75rem;
        display: grid;
        font-family: sans-serif;
        gap: 1rem;
        grid-template-columns: auto 1fr;
        padding: 1rem;
        position: relative;
      }

      #play-on-spotify,
      #more-btn,
      #play-preview-btn {
        cursor: pointer;
        position: absolute;
      }

      #play-on-spotify svg,
      #more-btn svg,
      #play-preview-btn svg {
        fill: white;
      }

      #play-on-spotify {
        right: 1rem;
        top: 1rem;
      }

      #play-preview-btn {
        bottom: 0.5rem;
        right: 1rem;
        padding: 0;
        transition: 33ms ease transform;
      }

      #play-preview-btn:hover {
        transform: scale(1.04);
        transition: 33ms ease transform;
      }

      #more-btn {
        bottom: 0.75rem;
        opacity: 0.7;
        right: 3.5rem;
      }

      #album-art-link {
        height: 120px;
      }

      #album-art {
        border-radius: 0.5rem;
        transition: 0.3s ease opacity;
      }

      #album-art:hover {
        opacity: 0.8;
        transition: 0.4s ease opacity;
      }

      #track-title {
        color: white;
        font-size: 0.875rem;
        font-weight: 700;
        text-decoration: none;
      }

      #track-title:hover {
        text-decoration: underline;
      }

      #artists {
        color: #b3b3b3;
        font-size: 0.875rem;
        line-height: 1;
        opacity: 0.7;
      }

      #artists-wrapper {
        align-items: center;
        display: flex;
        gap: 0.5ch;
        height: fit-content;
      }

      #save-on-spotify {
        align-items: center;
        color: white;
        cursor: pointer;
        display: flex;
        font-size: 0.75rem;
        gap: 0.25rem;
        margin: 0.4rem 0 0 0;
        opacity: 0.7;
        padding: 0;
        text-decoration: none;
        transition: transform 0.3s ease-in-out;
        width: fit-content;
      }

      #save-on-spotify:hover {
        transform: scale(1.04);
        transition: transform 0.3s ease-in-out;
      }

      #save-on-spotify span {
        margin-top: 2px;
      }

      #save-on-spotify svg {
        fill: white;
      }

      button {
        background: transparent;
        border: none;
      }

      p {
        margin: 0;
      }

      track-metadata {
        height: fit-content;
      }

      .tag {
        background-color: #ffffffb3;
        border-radius: 0.125rem;
        color: #121212;
        font-size: 0.5625rem;
        font-weight: 700;
        padding: 0.05rem 0.3rem;
      }

      [hidden] {
        display: none !important;
      }

      more-menu-overlay {
        background-color: #1c1c1c;
        border-radius: 0.75rem;
        display: grid;
        height: 100%;
        font-size: 0.875rem;
        padding-top: 1rem;
        place-items: center;
        position: absolute;
        width: 100%;
        z-index: 2;
      }

      more-menu-overlay ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      more-menu-overlay ul a,
      more-menu-overlay ul button {
        color: white;
        font-size: inherit;
        text-decoration: none;
      }

      more-menu-overlay ul a:hover,
      more-menu-overlay ul button:hover {
        text-decoration: underline;
      }

      more-menu-overlay #more-options {
        display: grid;
        gap: 0.25rem;
        margin-bottom: 0.25rem;
        width: 50%;
      }

      more-menu-overlay #more-options li {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0.25rem;
        height: 2rem;
        padding: 0 0.5rem;
      }

      more-menu-overlay #more-options li a,
      more-menu-overlay #more-options li button {
        align-items: center;
        color: white;
        cursor: pointer;
        display: flex;
        gap: 0.75rem;
        height: 2rem;
        padding: 0;
      }

      more-menu-overlay #more-options li a svg,
      more-menu-overlay #more-options li button svg {
        fill: white;
      }

      more-menu-overlay #terms-and-privacy {
        color: #b3b3b3;
        display: flex;
        font-size: 0.6875rem;
        gap: 0.5rem;
        opacity: 0.7;
      }

      more-menu-overlay #close-more-menu {
        cursor: pointer;
        padding: 0.75rem;
        position: absolute;
        right: 0;
        top: 0rem;
        transition: transform 33ms linear;
      }

      more-menu-overlay #close-more-menu:hover {
        transform: scale(1.04);
        transition: transform 33ms linear;
      }

      more-menu-overlay #close-more-menu svg {
        fill: white;
      }

      @media (max-width: 541px) {
        #album-art,
        #album-art-link {
          height: 96px;
          width: 96px;
        }

        more-menu-overlay {
          padding: 0;
        }

        more-menu-overlay #more-options {
          margin-bottom: 0;
        }

        more-menu-overlay #terms-and-privacy {
          display: none;
        }
      }
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(styles, ...markup.content.children);

    // Query Elements for Later Reference
    let root = this.shadowRoot;
    this.#ELEMS.albumArt = root.querySelector('#album-art');
    this.#ELEMS.albumArtLink = root.querySelector('#album-art-link');
    this.#ELEMS.trackTitle = root.querySelector('#track-title');
    this.#ELEMS.artists = root.querySelector('#artists');
    this.#ELEMS.playOnSpotify = root.querySelector('#play-on-spotify');
    this.#ELEMS.saveOnSpotify = root.querySelector('#save-on-spotify');
    this.#ELEMS.moreBtn = root.querySelector('#more-btn');
    this.#ELEMS.playPreview = root.querySelector('#play-preview-btn');
    this.#ELEMS.playSVG = root.querySelector('#play-svg');
    this.#ELEMS.pauseSVG = root.querySelector('#pause-svg');
    this.#ELEMS.previewAudio = root.querySelector('#preview-audio');
    this.#ELEMS.moreMenu = root.querySelector('more-menu-overlay');
    this.#ELEMS.morePlayOnSpotify = root.querySelector('#more-play-on-spotify');
    this.#ELEMS.moreSaveOnSpotify = root.querySelector('#more-save-on-spotify');
    this.#ELEMS.moreCopyLinkBtn = root.querySelector('#more-copy-link-btn');
    this.#ELEMS.moreCopyLinkBtnText = root.querySelector(
      '#more-copy-link-btn span'
    );
    this.#ELEMS.closeMoreMenu = root.querySelector('#close-more-menu');

    this.#attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.#ELEMS.trackTitle.innerText = newValue;
        break;
      case 'artists':
        this.#ELEMS.artists.innerHTML = newValue;
        break;
      case 'album-art-src':
        this.#ELEMS.albumArt.setAttribute('src', newValue);
        break;
      case 'album-art-alt':
        this.#ELEMS.albumArt.setAttribute('alt', newValue);
        break;
      case 'spotify-href':
        this.#ELEMS.trackTitle.setAttribute('href', newValue);
        this.#ELEMS.playOnSpotify.setAttribute('href', newValue);
        this.#ELEMS.morePlayOnSpotify.setAttribute('href', newValue);
        this.#ELEMS.albumArtLink.setAttribute('href', newValue);
        this.#ELEMS.moreCopyLinkBtn.setAttribute('data-href', newValue);
        // Save Track
        let saveTrack = newValue + '?intent=1';
        this.#ELEMS.saveOnSpotify.setAttribute('href', saveTrack);
        this.#ELEMS.moreSaveOnSpotify.setAttribute('href', saveTrack);
        break;
      case 'preview-src':
        this.#ELEMS.previewAudio.setAttribute('src', newValue);
        break;
    }
  }

  #attachEventListeners() {
    this.#ELEMS.playPreview.addEventListener('click', () => {
      this.#ELEMS.playSVG.toggleAttribute('hidden');
      this.#ELEMS.pauseSVG.toggleAttribute('hidden');

      if (this.#ELEMS.playSVG.hasAttribute('hidden')) {
        this.#ELEMS.previewAudio.play();
      } else {
        this.#ELEMS.previewAudio.pause();
      }
    });

    this.#ELEMS.moreBtn.addEventListener('click', () => {
      this.#ELEMS.moreMenu.removeAttribute('hidden');
    });

    this.#ELEMS.closeMoreMenu.addEventListener('click', () => {
      this.#ELEMS.moreMenu.setAttribute('hidden', '');
    });

    this.#ELEMS.moreCopyLinkBtn.addEventListener('click', () => {
      let link = this.#ELEMS.moreCopyLinkBtn.dataset.href;
      navigator.clipboard.writeText(link);
      this.#ELEMS.moreCopyLinkBtnText.innerText = 'Copied to clipboard';

      setTimeout(() => {
        this.#ELEMS.moreCopyLinkBtnText.innerText = 'Copy Link';
      }, 2000);
    });

    this.#ELEMS.previewAudio.addEventListener('ended', () => {
      this.#ELEMS.previewAudio.currentTime = 0;
      this.#ELEMS.playSVG.removeAttribute('hidden');
      this.#ELEMS.pauseSVG.setAttribute('hidden', '');
    });
  }
}

customElements.define('spotify-track', SpotifyTrack);
