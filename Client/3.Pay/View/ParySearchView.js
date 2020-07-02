const log = console.log;
import View from "../../1.Common/View/View.js";
import {preventEnter} from "../../1.Common/View/ElementsHooks.js";
import "../../src/css/pay/PaySearchView.css";

export default class PaySearchView extends View {
    constructor(el) {
        super(el);
        this.display1El = this.el.querySelector("#display-1");
        this.display2El = this.el.querySelector("#display-2");
        preventEnter();
        this._initMount();
        this._bindElements();
        return this;
    }
    _initMount() {

        this.display1El.innerHTML = `
        <div class="pay__display1">
            <div class="pay__display1-titles">
                <h1>차량번호 뒷 4자리를</h1>
                <h1>입력하세요</h1> 
            </div>
            <label for="carNumber"></label>
                <input class="pay__search-input" type="text" name="carNumber" placeholder="예) 1234">
        </div>
        `

        this.display2El.innerHTML = `
        <table class="pay__search-keypad">
            <tr>
                <td><input class="button numbers" type="button" value="1"></td>
                <td><input class="button numbers" type="button" value="2"></td>
                <td><input class="button numbers" type="button" value="3"></td>
            </tr>
            <tr>
                <td><input class="button numbers" type="button" value="4"></td>
                <td><input class="button numbers" type="button" value="5"></td>
                <td><input class="button numbers" type="button" value="6"></td>
            </tr>
            <tr>
                <td><input class="button numbers" type="button" value="7"></td>
                <td><input class="button numbers" type="button" value="8"></td>
                <td><input class="button numbers" type="button" value="9"></td>
            </tr>
            <tr>
                <td><input class="button" id="ok" type="submit" disabled = true value="확인"></td>
                <td><input class="button numbers" type="button" value="0"></td>
                <td><input class="button" id="no" type="reset" value="취소"></td>
            </tr>
        </table>
        `
    }
    _bindElements() {
        
        this.inputEl = this.el.querySelector('[name="carNumber"]');
        this.numberEls = this.el.querySelectorAll('.numbers');
        this.submitBtn = this.el.querySelector('#ok');
        this.resetBtn = this.el.querySelector('#no');
        
        this._bindEvents();
        return this;
    }

    _bindEvents() {
        Array.from(this.numberEls).forEach(btn => {
        
            btn.addEventListener('click', e => this._onClickEvent(e));
        })
        this.submitBtn.addEventListener('click', e=> {
            this._onSubmit(e);
        })
        this.resetBtn.addEventListener('click', () => this._reset());
    }

    _onClickEvent(e) {
        this.inputEl.value += e.target.value;

        this.inputEl.value.length > 0 && this._onChangeEvent(this.inputEl.value);
    }

    _onChangeEvent(value) {
       
        this.emit('@change', {carNumber : value});
    }

    _onSubmit() {
        this.emit('@submit', {carNumber : this.inputEl.value});
    }

    _reset() {
        this.inputEl.value = '';
    }

    isValid(result) {
        this.submitBtn.disabled = false;
        this.submitBtn.style.background = 'var(--color-dark-pink)';
        this.submitBtn.style.color = 'var(--color-white)';
       
    }

    alertErrorMsg(result) {
        switch(result.result) {
            case -1 : alert('차량번호가 없습니다');
                break;
            case -2 : alert('차량번호가 없습니다'); //정산처리된 회원 차
                break;
            default : new Error('Paysearchform alertError msg error');
        }
        this._reset();
    }
}