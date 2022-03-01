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
      
        .cancel {
          display: none;
        }
    
        svg {
          width: 1em;
          cursor: pointer;
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
        <svg version="1.1" class="alert" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 504 504" xml:space="preserve">
            <polygon style="fill:#DF5C4E;" points="152.4,500 10,353.6 10,148.8 152.4,4 357.2,4 502,148.8 502,353.6 357.2,500 "/>
            <g>
            <path style="fill:#F4EFEF;" d="M254,325.6c-10.8,0-20-8.8-20-19.6V133.2c0-10.8,9.2-19.6,20-19.6s20,8.8,20,19.6V306
              C274,316.8,264.8,325.6,254,325.6z"/>
            <path style="fill:#F4EFEF;" d="M254,388.4c-5.2,0-10.4-2-14-5.6s-5.6-8.8-5.6-14s2-10.4,5.6-14s8.8-5.6,14-5.6s10.4,2,14,5.6
              s5.6,8.8,5.6,14s-2,10.4-5.6,14S259.2,388.4,254,388.4z"/>
            </g>
            <path d="M250,329.6c-13.2,0-24-10.8-24-23.6V133.2c0-13.2,10.8-23.6,24-23.6s24,10.8,24,23.6V306C274,319.2,263.2,329.6,250,329.6z
              M250,117.6c-8.8,0-16,7.2-16,15.6V306c0,8.4,7.2,15.6,16,15.6s16-7.2,16-15.6V133.2C266,124.8,258.8,117.6,250,117.6z"/>
            <path d="M250,392.4c-6.4,0-12.4-2.4-16.8-6.8c-4.4-4.4-6.8-10.4-6.8-16.8s2.4-12.4,6.8-16.8c4.4-4.4,10.4-6.8,16.8-6.8
            c6,0,12.4,2.4,16.8,6.8c4.4,4.4,6.8,10.4,6.8,16.8s-2.4,12.4-6.8,16.8S256.4,392.4,250,392.4z M250,353.2c-4,0-8,1.6-11.2,4.8
            c-2.8,2.8-4.4,6.8-4.4,11.2c0,4,1.6,8,4.4,11.2c2.8,2.8,6.8,4.4,11.2,4.4c4,0,8-1.6,11.2-4.4c2.8-2.8,4.4-6.8,4.4-11.2
            c0-4-1.6-8-4.4-11.2C258,354.8,254,353.2,250,353.2z"/>
            <path d="M357.2,504H152.4c-1.2,0-2-0.4-2.8-1.2L3.2,356.4c-0.8-0.8-1.2-1.6-1.2-2.8V148.8c0-1.2,0.4-2,1.2-2.8L149.6,1.2
            c0.8-0.8,1.6-1.2,2.8-1.2h204.8c1.2,0,2,0.4,2.8,1.2L500.8,146c0.8,0.8,1.2,1.6,1.2,2.8v204.8c0,1.2-0.4,2-1.2,2.8L360,502.8
            C359.2,503.6,358.4,504,357.2,504z M154,496h201.6L494,352V150.4L355.6,8H154L10,150.4V352L154,496z"/>
          </svg>
    
          <svg version="1.1" class="cancel" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 512 512" xml:space="preserve">
            <circle style="fill:#FF6643;" cx="256" cy="256" r="256"/>
            <path style="fill:#FF4F19;" d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z"/>
            <polygon style="fill:#F2F2F4;" points="365.904,184.885 327.115,146.096 256,217.211 184.885,146.096 146.096,184.885 217.211,256 
              146.096,327.115 184.885,365.904 256,294.789 327.115,365.904 365.904,327.115 294.789,256 "/>
            <polygon style="fill:#DFDFE1;" points="365.904,184.885 327.115,146.096 256,217.211 256,294.789 327.115,365.904 365.904,327.115 
              294.789,256 "/>
          </svg>
    
          <div class="notify-container">
            <slot name="message" />
          </div>
      </div>
    `;
  }
}