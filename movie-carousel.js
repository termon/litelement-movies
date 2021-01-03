import {LitElement, html} from 'https://unpkg.com/lit-element@latest/lit-element.js?module';

class MovieCarousel extends LitElement {
    static get properties() {
        return {
            posters: { type: String },  
            count: { type: Number }       
        }
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
        this.posters = [];
        this.count = 3;
        this.imgPath = 'https://image.tmdb.org/t/p/';
    }

    /* 
        render component in LightDOM to allow global styles defined by bootstrap
        to be accessed in the component. Removing this method means component is
        rendered in shadow dom and global styles defined outside component don't apply
    */
    createRenderRoot() {
        return this;
    }

    posterUrl(poster, size='original') {
        const p =  this.imgPath + size + poster
        console.log('poster', p)
        return p
      }

    /**
     * Implement to describe the element's DOM using lit-html.
     * Use the element current props to return a lit-html template result
     * to render into the element.
     */
    render() {
        return this._carousel();
    }

    _carousel() {
        return html`
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                    ${this.posters.slice(0,this.count).map((p,i) => html`
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ></li>                
                    `)}          
                </ol>
                <div class="carousel-inner">
                    ${this.posters.slice(0,this.count).map((p,i) => html`
                        <div class="carousel-item ${i==0?'active':''}">
                            <img src="${this.posterUrl(p.file_path)}" class="d-block w-100" alt="...">
                        </div>`
                    )}                       
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </a>
                </div>
        `;
    }

}

customElements.define('movie-carousel', MovieCarousel);