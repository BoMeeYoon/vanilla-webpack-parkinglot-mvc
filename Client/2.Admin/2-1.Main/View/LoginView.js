const log = console.log;
const tag = '[LoginView.js]';

import View from "../../../1.Common/View/View.js";
import { createElement } from "../../../1.Common/View/ElementsHooks.js";
import "../../../src/css/admin/LoginView.css";
import "../../../src/css/admin/Modal.css";


export default class LoginView extends View {

    constructor(el) {
        super(el);

        //logo ui
        this.login = createElement('div', 'login');

        this.logo = createElement('p', 'login__logo-title');
        this.logoSpan = createElement('span', 'login__logo-text');
        this.logoSpan2 = createElement('span', 'login__logo-text');
        this.logoSpan3 = createElement('span', 'login__logo-text')
        this.logoSpan.textContent = 'Welcome to';
        this.logoSpan2.textContent = "BOM's";
        this.logoSpan3.textContent = 'Parking Lot System';

        this.logo.append(this.logoSpan, this.logoSpan2, this.logoSpan3);

        // login ui
        this.loginForm = createElement('form', 'login__form');

        this.loginSmallBox1 = createElement('div', 'login__form-items');
        this.loginSmallBox2 = createElement('div', 'login__form-items');

        this.idLabel = createElement('label', 'login__form-label')
        this.id = createElement('div', 'login__form-title');
        this.id.textContent = 'ID';
        this.idInput = createElement('input', 'login__form-input');
        this.idInput.type='text';
        this.idInput.placeholder = '아이디를 입력하세요';
        this.idInput.name = 'id';
        this.idError = createElement('p', 'login__form-error')

        this.pwLabel = createElement('label', 'login__form-label')
        this.pw = createElement('div', 'login__form-title');
        this.pw.textContent = 'PW';
        this.pwInput = createElement('input', 'login__form-input');
        this.pwInput.type ='password';
        this.pwInput.placeholder = '비밀번호를 입력하세요';
        this.pwInput.name = 'pw';
        this.pwError = createElement('p', 'login__form-error')

        this.loginBtn = createElement('button', 'login__form-btn');
        this.loginBtn.textContent = 'LOGIN';

        this.idLabel.append(this.id, this.idInput)
        this.loginSmallBox1.append(this.idLabel, this.idError);
        this.pwLabel.append(this.pw, this.pwInput)
        this.loginSmallBox2.append(this.pwLabel, this.pwError);
        
        this.loginForm.append(this.loginSmallBox1, this.loginSmallBox2, this.loginBtn);
        this.login.append(this.logo, this.loginForm);
        this.el.append(this.login)
        this.el.className = "modal"

        this.errorMsg = {
            BLANK_ID : `아이디를 입력하세요`,
            BLANK_PW : `비밀번호를 입력하세요`
        }
        this._bindEvents();
        
        return this;
    }
    _bindEvents() {
        const inputEls = this.el.querySelectorAll('input');

        this.loginBtn.addEventListener("click", e => {
            e.preventDefault();
            const id = this.idInput;
            const pw = this.pwInput;

            if (!id.value.length) return this._bindError(this.idError, "BLANK_ID", {id});
            if (!pw.value.length) return this._bindError(this.pwError, "BLANK_PW", {pw});
            
            this.emit("@login", {id : id.value, pw: pw.value});    
        });

        Array.from(inputEls).forEach( el => {
            el.addEventListener("click", e => e.target.placeholder="");
        });
    }
    _bindError(errorEl, errorType, data) {
        
        errorEl.style.display = "block";
        errorEl.textContent = this.errorMsg[errorType];
        this._onChange(data);
    }
    _onChange(data) {

        const name = Object.keys(data)[0];
        const input = Object.values(data)[0];
        let errorEl;
        
        name === "id" ? errorEl = this.idError : errorEl = this.pwError

        input.addEventListener("change", () => input.value && this._errorHide(errorEl));
    }

    _errorHide(errorEl) {
        
        errorEl.vlue = "";
        errorEl.style.display = "none";
        return this;
    }
    
    bindRemove() {
        this.login.remove();
        this.el.className="";
    }
}