// SpotifyArtist.js

class SpotifyArtist extends HTMLElement {
  static observedAttributes = ['name', 'art-src', 'art-alt', 'spotify-href'];
  #ELEMS = {};
  currActive;

  constructor() {
    super();

    let markup = document.createElement('template');
    markup.innerHTML = /* HTML */ `
      <artist-controls>
        <a title="Play on Spotify" id="art-link" target="_blank">
          <img id="art" src="" alt="" height="152" width="152" />
        </a>
        <artist-metadata>
          <a
            id="artist-name"
            href=""
            title="Play on Spotify"
            target="_blank"
          ></a>
          <p id="top-tracks-wrapper">
            <span id="preview" class="tag">Preview</span>
            <a id="top-tracks" href="" target="_blank">Top tracks</a>
          </p>
          <a id="follow-btn" href="" target="_blank">Follow</a>
        </artist-metadata>
        <a id="play-on-spotify" href="" title="Play on Spotify" target="_blank">
          <svg
            data-encore-id="icon"
            role="img"
            viewBox="0 0 24 24"
            height="24"
            width="24"
          >
            <path
              d="M12.438 1.009C6.368.769 1.251 5.494 1.008 11.565c-.24 6.07 4.485 11.186 10.556 11.426 6.07.242 11.185-4.484 11.427-10.554.242-6.07-4.484-11.186-10.553-11.428Zm4.644 16.114a.657.657 0 0 1-.897.246 13.22 13.22 0 0 0-4.71-1.602 13.197 13.197 0 0 0-4.968.242.658.658 0 0 1-.31-1.278 14.497 14.497 0 0 1 5.46-.265c1.837.257 3.579.851 5.177 1.76.315.178.425.58.246.896l.002.002Zm1.445-2.887a.853.853 0 0 1-1.158.344 16.214 16.214 0 0 0-5.475-1.797 16.188 16.188 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.852.852 0 0 1 .65-1.018 17.92 17.92 0 0 1 6.362-.241 17.87 17.87 0 0 1 6.049 1.985c.415.224.57.743.344 1.158h.004Zm1.602-3.255a1.052 1.052 0 0 1-1.418.448 19.673 19.673 0 0 0-6.341-2.025 19.642 19.642 0 0 0-6.655.199 1.05 1.05 0 1 1-.417-2.06 21.725 21.725 0 0 1 7.364-.22 21.72 21.72 0 0 1 7.019 2.24c.515.268.715.903.448 1.418Z"
            ></path>
          </svg>
        </a>
        <track-controls>
          <button id="prev-track" disabled>
            <svg
              data-encore-id="icon"
              role="img"
              viewBox="0 0 16 16"
              height="16"
              width="16"
            >
              <path
                d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"
              ></path>
            </svg>
          </button>
          <button id="next-track" disabled>
            <svg
              data-encore-id="icon"
              role="img"
              viewBox="0 0 16 16"
              height="16"
              width="16"
            >
              <path
                d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"
              ></path>
            </svg>
          </button>
        </track-controls>
        <button id="more-btn" title="More">
          <svg
            data-encore-id="icon"
            role="img"
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
            id="play-svg"
            viewBox="0 0 24 24"
            height="48"
            width="48"
          >
            <path
              d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.75-4.567a.5.5 0 0 0-.75.433v8.268a.5.5 0 0 0 .75.433l7.161-4.134a.5.5 0 0 0 0-.866L9.75 7.433z"
            ></path>
          </svg>
          <svg
            data-encore-id="icon"
            role="img"
            id="pause-svg"
            viewBox="0 0 24 24"
            height="32"
            width="32"
          >
            <path
              d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
            ></path>
          </svg>
        </button>
      </artist-controls>
      <track-list-wrapper>
        <track-list>
          <slot></slot>
        </track-list>
      </track-list-wrapper>
    `;

    let styles = document.createElement('style');
    styles.innerHTML = /* CSS */ `
      artist-controls {
        align-items: center;
        background-color: #1f1f1f;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: auto 1fr;
        padding: 1.5rem;
        position: relative;
      }

      track-list-wrapper {
        background-color: #121212;
        border-bottom-left-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
        display: block;

        track-list {
          display: grid;
          height: 152px;
          margin: 0 0.5rem 0 0;
          overflow-y: scroll;
          padding: 0.5rem 0 0.5rem 0.5rem;
          scrollbar-color: #0000004d #0000;
  
          ::slotted(spotify-playlist-track) {
            background-color: transparent;
            box-sizing: border-box;
            margin-right: 0.5rem;
            width: calc(100% - 0.5rem);
          }
        }
      }

      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      button {
        background: transparent;
        border: none;
      }

      p {
        margin: 0;
      }

      artist-metadata {
        align-self: center;
        display: grid;
        gap: 0.75rem;
        height: fit-content;
        line-height: 1;
      }

      track-controls {
        bottom: 2rem;
        display: flex;
        gap: 1rem;
        height: fit-content;
        position: absolute;
        right: 8.5rem;

        button {
          cursor: pointer;
          height: 16px;
          opacity: 0.7;
          padding: 0;
          width: 16px;
        }

        button[disabled] {
          cursor: not-allowed;
          opacity: 0.3;
        }

        svg {
          fill: white;
        }
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

      #artist-name {
        font-size: 1.5rem;
        font-weight: 400;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        overflow: hidden;
      }

      #top-tracks {
        color: #b3b3b3;
        font-size: 1rem;
        font-weight: 450;
        opacity: 0.7;
      }

      #top-tracks-wrapper {
        align-items: center;
        display: flex;
        gap: 0.5ch;
      }

      #follow-btn {
        border: 1px solid #ffffff4d;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.125rem 1rem;
        transition: transform .3s ease-in-out;
        width: fit-content;

        &:hover {
          text-decoration: none;
          transform: scale(1.04);
          transition: transform .3s ease-in-out;
        }
      }

      #play-on-spotify,
      #more-btn,
      #play-preview-btn {
        cursor: pointer;
        position: absolute;

        svg {
          fill: white;
        }
      }

      #play-on-spotify {
        right: 1.5rem;
        top: 1.5rem;
      }

      #more-btn {
        bottom: 1.5rem;
        opacity: 0.7;
        right: 5.5rem;
      }

      #play-preview-btn {
        bottom: 1.5rem;
        display: grid;
        height: 48px;
        padding: 0;
        place-items: center;
        right: 1.5rem;
        transition: 33ms ease transform;
        width: 48px;

        &:hover {
          transform: scale(1.04);
          transition: 33ms ease transform;
        }

        #play-svg {
          display: block;
        }

        #pause-svg {
          display: none;
        }
      }

      :host(.playing) {
        #play-svg {
          display: none !important;
        }

        #pause-svg {
          display: block !important;
        }
      }

      .tag {
        background-color: #ffffffb3;
        border-radius: 0.125rem;
        color: #121212;
        font-size: 0.5625rem;
        font-weight: 700;
        padding: 0.1875rem 0.3125rem;
      }

      [hidden] {
        display: none !important;
      }

      @media (max-width: 540px) {
        #art,
        #art-link {
          height: 112px;
          width: 112px;
        }

        #follow-btn {
          display: block;
          margin-top: 3px;
          width: fit-content;
        }

        #more-btn {
          bottom: 0.75rem;
          right: 5rem;
        }

        #preview.tag {
          bottom: 1rem;
          left: 1rem;
          position: absolute;
        }

        #play-preview-btn {
          bottom: 1rem;
          right: 1rem;
        }

        track-controls {
          bottom: 1.25rem;
          right: 8rem;
        }

        artist-metadata {
          align-self: flex-end;
          display: grid;
          gap: 0.5rem;
          line-height: 1;
        }

        artist-controls {
          gap: 1rem;
          padding: 1rem 1rem 4.5rem;
        }
      }
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(styles, ...markup.content.children);

    // Query Elements for Later Reference
    let root = this.shadowRoot;
    this.#ELEMS.art = root.querySelector('#art');
    this.#ELEMS.artLink = root.querySelector('#art-link');
    this.#ELEMS.artistName = root.querySelector('#artist-name');
    this.#ELEMS.topTracks = root.querySelector('#top-tracks');
    this.#ELEMS.followBtn = root.querySelector('#follow-btn');
    this.#ELEMS.playOnSpotify = root.querySelector('#play-on-spotify');
    this.#ELEMS.trackList = root.querySelector('track-list');
    this.#ELEMS.nextTrack = root.querySelector('#next-track');
    this.#ELEMS.prevTrack = root.querySelector('#prev-track');
    this.#ELEMS.moreBtn = root.querySelector('#more-btn');
    this.#ELEMS.playPreviewBtn = root.querySelector('#play-preview-btn');
    this.#ELEMS.playSVG = root.querySelector('#play-svg');
    this.#ELEMS.pauseSVG = root.querySelector('#pause-svg');

    this.#attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.#ELEMS.artistName.innerText = newValue;
        break;
      case 'art-src':
        this.#ELEMS.art.setAttribute('src', newValue);
        break;
      case 'art-alt':
        this.#ELEMS.art.setAttribute('alt', newValue);
        break;
      case 'spotify-href':
        this.#ELEMS.artLink.setAttribute('href', newValue);
        this.#ELEMS.artistName.setAttribute('href', newValue);
        this.#ELEMS.topTracks.setAttribute('href', newValue);
        this.#ELEMS.playOnSpotify.setAttribute('href', newValue);
        // Set follow link
        let followLink = newValue + '?intent=1';
        this.#ELEMS.followBtn.setAttribute('href', followLink);
        break;
    }
  }

  #attachEventListeners() {
    this.#ELEMS.playPreviewBtn.addEventListener('click', () => {
      if (!this.classList.contains('playing')) {
        this.playTrack();
      } else {
        this.pauseTrack();
      }
    });

    this.#ELEMS.nextTrack.addEventListener('click', () => {
      let next = this.currActive.nextElementSibling;
      if (!next) next = this.children[0];
      next.playTrack();

      let offset = next.offsetTop - this.#ELEMS.trackList.offsetTop;
      offset -= this.#ELEMS.trackList.clientHeight;
      offset += next.offsetHeight;
      this.#ELEMS.trackList.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });

    this.#ELEMS.prevTrack.addEventListener('click', () => {
      let prev = this.currActive.previousElementSibling;
      if (!prev) prev = [...this.children].at(-1);
      prev.playTrack();
      prev.scrollIntoView();
    });

    this.addEventListener('spotify-playlist-track-active', (e) => {
      this.currActive = e.target;
      this.#ELEMS.nextTrack.removeAttribute('disabled');
      this.#ELEMS.prevTrack.removeAttribute('disabled');
    });

    this.addEventListener('spotify-playlist-track-playing', (e) => {
      this.classList.add('playing');
    });

    this.addEventListener('spotify-playlist-track-paused', (e) => {
      this.classList.remove('playing');
    });

    this.addEventListener('spotify-playlist-track-ended', (e) => {
      this.classList.remove('playing');
    });
  }

  playTrack() {
    if (this.currActive) this.currActive.playTrack();
    else this.children[0]?.playTrack();
  }

  pauseTrack() {
    this.currActive.pauseTrack();
  }
}

customElements.define('spotify-artist', SpotifyArtist);
