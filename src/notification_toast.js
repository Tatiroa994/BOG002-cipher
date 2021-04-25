export class NotificacionToast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["class"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this[atrr] = newValue;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="${this.class}" id="cont-toast">
      <slot name="image"></slot>
      <div class="container-content">
        <h2>
         <slot name="title"></slot>
        </h2>
        <span class="message">
          <slot></slot>
        </span>
      </div>
      <span class="close">X</span>
    </div>      
      ${NotificacionToast.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Original+Surfer&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      } 

      #cont-toast {
        display: flex;
        visibility: hidden;        
        color: #333;
        border-radius: 1px 8px 8px 1px;        
        position: fixed;
        z-index: 1; 
        right: 2%; 
        bottom: 5%;
        box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
        font-family: 'Original Surfer', cursive;
        width: 90%;
        max-width: 320px;
        padding: 7px;
      }

      .container-content{
        margin-left: 10px;
      }

      div.container-content h2{
        margin-bottom: 0.5rem;
      }

      .error{
        border-left: solid 10px #fe0404;        
        background-color: #f6cfcb;
      }

      .done{
        border-left: solid 10px #4b761f;
        background-color: #d1e7dd;
      }

      .warn{
        border-left: solid 10px #fbbc05;  
        background-color: #fff3cd;
      }

      div#cont-toast.show {
        visibility: visible;                
        -webkit-animation: fadein 0.5s;
        animation: fadein 0.5s;
      }
      
        @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 5%; opacity: 1;}
      }
      
      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 5%; opacity: 1;}
      }
      
      .close{
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 13px;
        font-weight: bold;
      }       
    </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const container = this.shadowRoot.querySelector("#cont-toast");
    const close = this.shadowRoot.querySelector(".close");
    close.addEventListener("click", () => {
      container.classList.remove("show");
    });
  }

  connectedCallback() {
    this.render();
  }
}
