const log = console.log
const tag = '[HeaderView.js]';

import View from "../../../1.Common/View/View.js";
import {createElement} from '../../../1.Common/View/ElementsHooks.js';
import "../../../src/css/admin/AdminApp.css"

export default class HeaderView extends View {

    constructor(el, adminMenu, logState) {

        super(el);
        
        this.adminMenu = adminMenu;
        this.logState = logState;

        this.header = createElement('nav', 'header');

        this.logoBox = createElement('div', 'header__logo');
        this.logo = createElement('p', 'header__logo-text');
        this.logo.textContent = "Bom's"
        this.logoText = createElement('p', 'header__logo-text');
        this.logoText.textContent = "Parking Lot System"

        this.logoBox.append(this.logo, this.logoText);
        
        this.navMenuBox = createElement('div', 'header__nav');
        this.navAdminMenuBtn = createElement('button', 'header__nav-btns');
        this.navAdminMenuBtn.textContent = adminMenu;
        this.navLogoutBtn = createElement('button', 'header__nav-btns');
        this.navLogoutBtn.textContent = logState

        this.navMenuBox.append(this.navAdminMenuBtn, this.navLogoutBtn)

        this.header.append(this.logoBox, this.navMenuBox);
        this.el.append(this.header);

        this._bindEvents()
        return this;
    };

    _bindEvents() {
        
        this.navAdminMenuBtn.addEventListener('click', () => {
            this.adminMenu === "회원관리" ? 
                this.emit("@changePage", {changePage : "goMember"}) 
                : 
                this.emit("@changePage", {changePage : "goParking"});
        });

        this.navLogoutBtn.addEventListener('click', () => this.emit("@logout"))

        return this;
    };

    bindRemove() {
        this.header.remove();
    }

}