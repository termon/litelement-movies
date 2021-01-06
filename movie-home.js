import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js';

export class MovieHome extends MovieBase {

  render() {
    return html`
          <h3 class="mt-4 mb-4">The Movie Database Browser</h3>
          <div class="card text-white bg-dark" >
          <div class="card-body">
            <h5 class="card-title">Web Components Using LitElement </h5>
            <p class="card-text">
              Built using
              <ul>
                <li>LitElement</li>
                <li>MobX</li>
                <li>lit-mobx</li>
                <li>vaadin router</li>
                <li>The Movie Database Web API</li>
                <li>ES Module imports (no npm or local bundler required)
              </ul>
            </p>         
          </div>
        </div>
    `;
  }

}

window.customElements.define('movie-home', MovieHome);