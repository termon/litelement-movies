import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js';

export class MovieSearch extends MovieBase {

    static get properties() {
        return {
            search: { type: String },
            disabled: { type: Boolean }
        }
    }
    constructor() {
        super();
        this.search = ''
    }

    render() {
        return html`
        <form id="searchForm">
            <div class="row">
                <input class="col-10 form-input" .value="${this.search}" @keydown="${ (e) => this._search(e) }" placeholder="search....">
                <button type="reset" ?disabled="${this.disabled}" class="btn btn-warning btn-rounded col-1 mx-3" @click="${(e)=> this._dispatchClear(e)}">Clear</button>
            </div> 
            <div class="row mt-2"> 
                <div class="col-2">
                    <input type="radio" name="customSearch" value="popular" @click="${(e) => this._customSearch(e)}"/>
                    <label for="check">Popular</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="top" @click="${(e) => this._customSearch(e)}"/>
                    <label for="check">Top Rated</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="trending" @click="${(e) => this._customSearch(e)}"/>
                    <label for="check"">Trending</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="playing" @click="${(e) => this._customSearch(e)}"/>
                    <label for="check">Now Playing</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="upcoming" @click="${(e) => this._customSearch(e)}"/>
                    <label for="check">Upcoming</label>
                </div>
            </div>  
        </form>
        `;
    }

    _search(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // prevent form from submitting           
            this._dispatchSearch(e.target.value)
            e.target.form.reset(); // reset form (radio button reset - may be better way to do this)
        }
    }
    _customSearch(e) {
        this._dispatchSearch(`:${e.target.value}`)
    }

    _dispatchSearch(search) {
        this.dispatchEvent(new CustomEvent('search', {
            bubbles: true,
            composed: true,
            detail: search
        }));        
    }
    _dispatchClear(e) {
        this.dispatchEvent(new CustomEvent('clear', {
            bubbles: true,
            composed: true
        }));
        // reset form containing target (resets radio inputs - may be better way to do this)
        e.target.form.reset();
    }
}

window.customElements.define('movie-search', MovieSearch);