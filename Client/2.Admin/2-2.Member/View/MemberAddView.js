const log = console.log
import View from '../../../1.Common/View/View.js';
import "../../../src/css/admin/MemberForm.css";

export default class MemberAddView extends View {
    constructor(el) {
        super(el);
        this.show()
        this._initRender()
        this._initBind()
        return this;
    }
    _initRender() {
        this.el.innerHTML = `
        <div class="add modal">
            <form class="add__form">
                <div class="add__form-data">
                    <h1 class="add__form-title">
                        회원정보를 입력하세요
                    </h1>
                    <div class="add__form-inputs">
                        <div class="add__form-inputData">
                            <label for="carNumber">차량번호</label>
                                <input class="add__form-input" type="text" name="carNumber" placeholder="12가1234" required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="name">회원명</label>
                                <input class="add__form-input" type="text" name="name" placeholder="코린이" disabled=true required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="mobile">연락처</label>
                                <input class="add__form-input" type="text" name="mobile" placeholder="010-2222-1111" disabled=true required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="startDate">계약일</label>
                                <input class="add__form-input" type="date" name="startDate" disabled=true required>
                        </div>
                        <div class="add__form-inputData">
                            <label for="expireDate">만료일</label>
                                <input class="add__form-input" type="date" name="expireDate" disabled=true required>
                        </div>
                    </div>
                </div>
                <div class="add__form-btns">
                    <button class="add__form_btn" type="submit" id="submit" disabled=true>등록</button>
                    <button class="add__form_btn" type="reset" id="reset">취소</button>
                    <button class="add__form_btn" type="button" id="back">뒤로</button>
                </div>
            </form>
        </div>`
    }
    _initBind() {
        this.inputEls = this.el.querySelectorAll('.add__form-input');
    
        this.carNumber = this.el.querySelector('[name="carNumber"]');
        this.name = this.el.querySelector('[name="name"]');
        this.mobile = this.el.querySelector('[name="mobile"]');
        this.startDate = this.el.querySelector('[name="startDate"]');
        this.expireDate = this.el.querySelector('[name="expireDate"]');
    
        this.submitBtn = this.el.querySelector('#submit');
        this.resetBtn = this.el.querySelector('#reset');
        this.backBtn = this.el.querySelector('#back');

        this._bindEvents()
        return this;
    }

    _bindEvents() {
        Array.from(this.inputEls).forEach( el => {
            el.addEventListener('click', e => this.onChangeStyle(e.target))
            el.addEventListener('change', e => this.onChangeEvent(e))
        })
        this.submitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.onSubmitEvent()
        })
        this.backBtn.addEventListener('click', e => this.goBack())
        this.resetBtn.addEventListener('click', e => this.onResetEvent())
    }

    
    onChangeEvent (e) {
        const {name, value} = e.target
    
        this.emit('@verify', {[name]:value})
    }

    onSubmitEvent () {
        this.emit('@submit', {method : 'POST'})
    }

    onResetEvent () {
        Array.from(this.inputEls).filter( e => e.name !== 'carNumber' ? e.disabled = true : e.disabled = false)

        this.carNumber.placeholder ="12가1234"
        this.name.placeholder ="코린이"
        this.mobile.placeholder ="010-0000-0000"
    }

    goBack () {
        this.hide()
        this.onResetEvent()
    }

    errorMsg = function (result) {
   
        switch(Object.keys(result)[0]) {
            case 'carNumber' : return '차량번호를 다시 입력하세요'
            case 'name' : return '두 글자 이상 입력하세요'
            case 'mobile' : return '핸드폰 번호를 다시 입력하세요'
            case 'startDate' : return '계약일은 오늘 날짜 이후 부터 선택하세요'
            case 'expireDate' : return '만료일을 확인하세요'
            case 'submit' : return '정보를 모두 입력하세요'
            case 'result' : return '이미 가입된 차량번호 입니다.'
            default : return new Error('입력폼 에러 메세지 확인 요망')
        }
    }

    alertErrorMsg (result) {
        log(result)
        alert(this.errorMsg(result))
    }

    onChangeStyle (el) {
        
        el.placeholder = ''
    }

    onFocusStyle (result) {
    
        switch(Object.keys(result)[0]) {
            case 'carNumber' : return this.carNumber.focus()
            case 'name' : return this.name.focus()
            case 'mobile' : return this.mobile.focus()
            case 'startDate' : return this.startDate.focus()
            case 'expireDate' : return this.expireDate.focus()
            default : return new Error('입력폼 포커스 확인 요망')
        }
    }

    disabledStyle (result) {
        switch(Object.keys(result)[0]) {
            case 'carNumber' :
                this.name.placeholder = ''
                this.name.disabled = false
                this.name.focus()
                break;
            case 'name' : 
                this.mobile.placeholder = ''
                this.mobile.disabled = false
                this.mobile.focus()
                break;
            case 'mobile' : 
                this.startDate.disabled = false
                this.startDate.focus()
                break;
            case 'startDate' : 
                this.expireDate.disabled = false
                this.expireDate.focus()
                break;
            default : return new Error('입력폼 비활성화 확인 요망')
        }
    }

    isValid () {
        this.submitBtn.disabled = false
        this.submitBtn.style.background = 'crimson'
        this.submitBtn.style.color = 'white'
    }
}