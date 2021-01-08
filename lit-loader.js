import { css, html, LitElement } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';

export class LitSpinner extends LitElement {
  
  static get properties() {
    return { 
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = false;  
  }

  static get styles() {
    return css`
      .dot-pulse {
          position: relative;
          left: -9999px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          box-shadow: 9999px 0 0 -5px #9880ff;
          animation: dotPulse 1.5s infinite linear;
          animation-delay: .25s;
        }

        .dot-pulse::before, .dot-pulse::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
        }

        .dot-pulse::before {
          box-shadow: 9984px 0 0 -5px #9880ff;
          animation: dotPulseBefore 1.5s infinite linear;
          animation-delay: 0s;
        }

        .dot-pulse::after {
          box-shadow: 10014px 0 0 -5px #9880ff;
          animation: dotPulseAfter 1.5s infinite linear;
          animation-delay: .5s;
        }

        @keyframes dotPulseBefore {
          0% {
            box-shadow: 9984px 0 0 -5px #9880ff;
          }
          30% {
            box-shadow: 9984px 0 0 2px #9880ff;
          }
          60%,
          100% {
            box-shadow: 9984px 0 0 -5px #9880ff;
          }
        }

        @keyframes dotPulse {
          0% {
            box-shadow: 9999px 0 0 -5px #9880ff;
          }
          30% {
            box-shadow: 9999px 0 0 2px #9880ff;
          }
          60%,
          100% {
            box-shadow: 9999px 0 0 -5px #9880ff;
          }
        }

        @keyframes dotPulseAfter {
          0% {
            box-shadow: 10014px 0 0 -5px #9880ff;
          }
          30% {
            box-shadow: 10014px 0 0 2px #9880ff;
          }
          60%,
          100% {
            box-shadow: 10014px 0 0 -5px #9880ff;
          }
        }
    `
  }

  render() {
    return this.loading ? html`<div class="dot-pulse"></div>` : html``;
  }
}

window.customElements.define('lit-spinner', LitSpinner);


export class LitLoader extends LitElement {
  
  static get properties() {
    return { 
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = false;  
  }

  static get styles() {
    return css`
      .loader,
      .loader:before,
      .loader:after {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation: load7 1.8s infinite ease-in-out;
        animation: load7 1.8s infinite ease-in-out;
      }
      .loader {
        color: grey;
        font-size: 10px;
        margin: 80px auto;
        position: relative;
        text-indent: -9999em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
      .loader:before,
      .loader:after {
        content: '';
        position: absolute;
        top: 0;
      }
      .loader:before {
        left: -3.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      .loader:after {
        left: 3.5em;
      }
      @-webkit-keyframes load7 {
        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
          box-shadow: 0 2.5em 0 0;
        }
      }
      @keyframes load7 {
        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
          box-shadow: 0 2.5em 0 0;
        }
      }
    `
  }

  render() {
    return this.loading ? html`<div class="loader"></div>` : html``;
  }
}

window.customElements.define('lit-loader', LitLoader);

