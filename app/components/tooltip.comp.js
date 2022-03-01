export class TooltipComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowDom = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowDom.innerHTML = this.render();
    this.tooltip = this.shadowDom.querySelector('.notify-container');
    this.alert = this.shadowDom.querySelector('.alert');
    this.cancel = this.shadowDom.querySelector('.cancel');

    this.applyCustomStyling();

    this.shadowDom.querySelector('.alert').addEventListener('click', () => {
      this.expandTooltip();
    });

    this.shadowDom.querySelector('.cancel').addEventListener('click', () => {
      this.closeTooltip();
    });
  }

  applyCustomStyling() {
    if (this.getAttribute('background')) {
      this.tooltip.style.background = this.getAttribute('background');
    }

    if (this.getAttribute('color')) {
      this.tooltip.style.color = this.getAttribute('color');
    }
  }

  expandTooltip() {
    this.tooltip.style.transform = 'scale(1)';
    this.alert.style.display = 'none';
    this.cancel.style.display = 'block';
    this.expanded = true;
  }

  closeTooltip() {
    this.tooltip.style.transform = 'scale(0)';
    this.alert.style.display = 'block';
    this.cancel.style.display = 'none';
    this.expanded = false;
  }

  render() {
    return `
    <style>
        .tooltip-container {
          display: inline-block;
          position: relative;
          z-index: 2;
        }

        .alert, .cancel {
          cursor: pointer;
        }
      
        .cancel {
          display: none;
        }
    
        .notify-container {
          position: absolute;
          bottom: 125%;
          z-index: 9;
          width: 300px;
          background: white;
          box-shadow: 5px 5px 10px rgba(0,0,0,.1);
          font-size: .8em;
          border-radius: 0.5em;
          padding: 1em;
          transform: scale(0);
          trasform-origin: bottom left;
          transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }
      </style>
      <div class="tooltip-container">
        <div class="alert">X</div>
        <div class="cancel">X</div>
        <div class="notify-container">
          <slot name="message" />
        </div>
      </div>
    `;
  }
}