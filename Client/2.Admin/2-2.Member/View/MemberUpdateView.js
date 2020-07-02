const log = console.log;
const tag = '[MemberUpdateView.js]'
import View from "../../../1.Common/View/View.js";
import {preventEnter} from "../../../1.Common/View/ElementsHooks.js";

export default class MemberUpdateView extends View {
    constructor(el) {
        super(el);
        this.errorMsg = {
            carNumber : `🚩차량번호를 다시 입력하세요🚩`,
            name : `🚩두 글자 이상 입력하세요🚩`,
            mobile : `🚩핸드폰 번호를 다시 입력하세요🚩`,
            startDate : `🚩계약일은 오늘 날짜 이후 부터 선택하세요🚩`,
            expireDate : `🚩만료일을 확인하세요🚩`,
            submit : `🚩정보를 모두 입력하세요🚩`,
            query : `🚩등록되지 않은 회원입니다🚩`
        }
        this.data;
        return this;
    }
    init(data) {
        this.data = data;
        preventEnter();
        this._initMount();
        this._initBind();
    }
    _initMount = () => {
        this.el.innerHTML = `
        <div class="add modal">
            <form class="add__form">
                <div class="add__form-data">
                    <h1 class="add__form-title">
                    ❮ 📝${this.data.name}님의 정보를 수정하세요 ❯
                    </h1>
                    <div class="add__form-inputs">
                        <div class="add__form-inputData">
                            <label for="carNumber">차량번호</label>
                                <input class="add__form-input" type="text" name="carNumber" value=${this.data.carNumber} readonly>
                        </div>
                        <div class="add__form-inputData">
                            <label for="name">회원명</label>
                                <input class="add__form-input" type="text" name="name" value=${this.data.name} required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="mobile">연락처</label>
                                <input class="add__form-input" type="text" name="mobile" value=${this.data.mobile} required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="startDate">계약일</label>
                                <input class="add__form-input" type="date" name="startDate" value=${this.data.startDate} required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="expireDate">만료일</label>
                                <input class="add__form-input" type="date" name="expireDate" value=${this.data.expireDate} required>
                        </div>
                    </div>
                </div>
                <div class="add__form-btns">
                    <button class="add__form_btn" type="submit" id="update">수정</button>
                    <button class="add__form_btn" type="reset" id="reset">취소</button>
                    <button class="add__form_btn" type="button" id="back">뒤로</button>
                </div>
            </form>
        </div>
        `
    }
    _initBind() {
        this.updateEl = this.el.querySelector('.add')

        this.inputEls = this.el.querySelectorAll('.add__form-input');
        
        this.carNumber = this.el.querySelector('[name="carNumber"]');
        this.name = this.el.querySelector('[name="name"]');
        this.mobile = this.el.querySelector('[name="mobile"]');
        this.startDate = this.el.querySelector('[name="startDate"]');
        this.expireDate = this.el.querySelector('[name="expireDate"]');
    
        this.updateBtn = this.el.querySelector('#update');
        this.resetBtn = this.el.querySelector('#reset');
        this.backBtn = this.el.querySelector('#back');

        this._bindInputEls();
        this._bindBtns();
        return this;
    }
    _bindInputEls() {
        Array.from(this.inputEls).forEach( input => {
            input.addEventListener('change', e => {
                const {name, value} = e.target;
                this.emit("@change", {[name] : value})
            })
        })
    }
    _bindBtns() {

        this.updateBtn.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            
            if(Array.from(this.inputEls).some(data => !data.value.length)) return this.sendErrorMsg("submit");
            
            const result = this._isValid();
            const inputData = {};
            Array.from(this.inputEls).map(data => inputData[data.name] = data.value);
            if(result !== true) return this.sendErrorMsg("submit");

            this.emit("@update", {memberId:this.data.memberId, ...inputData}); 
        })

        this.backBtn.addEventListener('click', () => this.goBack())
    }
    _isValid() {
        return this.carNumber.value.length && this.name.value.length && this.mobile.value.length && this.startDate.value.length && this.expireDate.value.length > 1 ? true : false
    }
    sendErrorMsg (name) {
        alert(this.errorMsg[name])
    }
    goBack () {
        this.el.querySelector('.add').remove()
    }
   
}
