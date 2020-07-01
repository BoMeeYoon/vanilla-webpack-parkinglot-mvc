import {createElement} from '../../../1.Common/View/ElementsHooks.js';

export default class FooterView {
    constructor(el) {
        this.el = el;
        
        this.footerBox = createElement('div', 'footer');

        this.footerText = createElement('p', 'footer__text');
        this.footerText.textContent = 'Have a Nice Day';
        
        this.footerLogo = createElement('p', 'footer__text');
        this.footerLogo.textContent = "ⓒ Bom's Parking Lot";
        
        this.footerBox.append(this.footerText, this.footerLogo);

        this.el.append(this.footerBox);
        return this
    }
}