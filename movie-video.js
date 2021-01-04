import {LitElement, html} from 'https://unpkg.com/lit-element@latest/lit-element.js?module';

class MovieVideo extends LitElement {
    static get properties() {
        return {
            key: { type: String }
        }
    }

    constructor() {
        super();
        this.url = `https://www.youtube.com/embed/`
    }

    createRenderRoot() {
        return this;
    }

    render() {
        console.log('movie-video', this.url, this.key)
        return html`<iframe src="${this.url+this.key}"></iframe>`
    }

}

customElements.define('movie-video', MovieVideo);