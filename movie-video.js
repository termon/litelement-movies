import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js'

export class MovieVideo extends MovieBase {
    static get properties() {
        return {
            key: { type: String }
        }
    }

    constructor() {
        super();
        this.url = `https://www.youtube.com/embed/`
    }

    render() {        
        return html`<iframe src="${this.url+this.key}"></iframe>`
    }

}

window.customElements.define('movie-video', MovieVideo);