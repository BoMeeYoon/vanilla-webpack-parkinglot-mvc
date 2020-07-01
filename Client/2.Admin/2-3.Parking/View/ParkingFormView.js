const log = console.log;

import View from "../../../1.Common/View/View.js";
import {preventEnter, createElement} from "../../../1.Common/View/ElementsHooks.js";

import "../../../src/css/admin/ParkingFormView.css";

export default class ParkingFormView extends View {
    constructor(el) {
        super(el);

        this.parkingBox = createElement('div', 'parking')
        this.searchForm = createElement('form', 'parking__form')

        this.searchBox = createElement('div', 'parking__form-items')
        this.label = createElement('label')
        this.inputEl = createElement('input', 'parking__form-input')
        this.inputEl.name = 'carNumber'
        this.inputEl.type = 'text'
        this.inputEl.placeholder = '차량번호를 입력하세요'
        this.carNumber;

        this.btnsBox = createElement('div', 'parking__form-items')
        this.inBtn = createElement('button', 'parking__form-inBtn')
        this.inBtn.id = 'in'
        this.inBtn.disabled = true
        this.inBtn.textContent = '입차'
        this.outBtn = createElement('button', 'parking__form-outBtn')
        this.outBtn.id = 'out'
        this.outBtn.disabled = true
        this.outBtn.textContent = '출차'

        this.btnsBox.append(this.inBtn, this.outBtn)
        this.searchBox.append(this.label, this.inputEl)
        this.searchForm.append(this.searchBox, this.btnsBox)
        this.parkingBox.append(this.searchForm)
        this.el.append(this.parkingBox);
        this._bindEvents();
        preventEnter();
        this.bindIn();
        this.bindOut();
        return this;
    }
    _bindEvents() {
        this.inputEl.addEventListener("change", e => {
            this.carNumber = e.target.value;
            
            const pattern = `^([0-9]{2}|[0-9]{3})[가-힣]{1}[0-9]{4}$`;
            const check = new RegExp(pattern);
            const _check = check.test(this.carNumber);
            
            this._bindBtnsStyle(_check);
            return _check;
        })
        this.inputEl.addEventListener("click", e => this.emit("@click"))
    }
    _bindBtnsStyle(result) {
        if(result === true) {
            this.inBtn.disabled = false;
            this.outBtn.disabled = false;
        } else {
            //무효한 정보
            this.alertErrorMsg(-2);
            this.inBtn.disabled = true;
            this.outBtn.disabled = false;
        }
    }
    //입차 처리
    bindIn() {
        this.inBtn.addEventListener('click', e => {
            e.preventDefault()
            this.carNumber = this.inputEl.value
            this.emit("@in", {carNumber : this.carNumber})
            
        })
    }
    //출차 처리
    bindOut() {
        this.outBtn.addEventListener('click', e => {
            e.preventDefault()
            this.emit("@search", {carNumber : this.carNumber})
            
        })
    }
    //입차처리 완료
    alertMsg() {
        this._reset()
        alert(`차량번호 : ${this.carNumber} 입차처리 완료`)
        
    }
    //-1, -2, 입력 값에 대한 오류
    //-3, -4, 입차처리 결과에 대한 오류
    alertErrorMsg(result) {
        this._reset()
        switch(result) {
            case -1 : return alert('차량번호를 입력하세요')
            case -2 : return alert('차량번호를 확인하세요')
            case -3 : return alert('입차처리 된 회원 차량입니다')
            case -4 : return alert('입차처리 된 비회원 차량입니다')
            default : throw new Error('Unhandled query-result')
        }
    }

    _reset() {
        this.inputEl.value = '';
    }

    bindRemove() {
        this.el.firstChild && this.parkingBox.remove();
    }
}