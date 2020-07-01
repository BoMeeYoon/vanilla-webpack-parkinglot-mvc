const log = console.log;
import {$, preventEnter} from "../../1.Common/View/ElementsHooks.js"
import View from "../../1.Common/View/View.js"
export default class PayPaymentView extends View {
    constructor(el) {
        super(el)
        return this
    }
    init() {
        preventEnter();
        this._initMount();
        return this;
    }
    _initMount() {
        this.el.innerHTML = `
        <div class="modal-pay">
            <h1>현금을 투입하세요</h1>
            <input name="money" type="number" placeholder="10,000">
            <div class="btns-box">
                <button class="exit">취소</button>
                <button class="topay">결제</button>
            </div>
        </div>
        `
        this._bindModalEvents();
    }
    _bindModalEvents() {
        this.moneyEl = this.el.querySelector('[name="money"]')
        this.topayBtn = this.el.querySelector('.topay');
        this.exitBtn = this.el.querySelector('.exit');

        this.topayBtn.addEventListener('click', e => {
            
            e.preventDefault();
            const money = this.moneyEl.value;
            console.log(!money.length)
            !money.length ? this.alertErrorMsg(-1) : this.emit("@pay", {money})
        })
        this.exitBtn.addEventListener('click', () => this._bindRemove())
    }
    
    alertErrorMsg(error, money = null) {
        switch(error) {
            case -1 : alert('금액을 입력하세요')
            break
            case -2 : alert('숫자를 입력하세요')
            break
            case -3 : alert(`${money.toLocaleString()}원이 부족합니다`)
            default : new Error ('paymodalview alertErrormsg error ')
        }
    }
    _alertMsg() {
        alert('기본 무료 주차 시간입니다')
        alert('정산이 완료되었습니다. 안전 운전 하세요!')
        changeCss('#modalCss', '')
    }
    alertMsg(money) {
        money === 0 ? 
            alert('정산이 완료 되었습니다') : 
            alert(`정산이 완료 되었습니다.
                잔액은 ${money.toLocaleString()}원 입니다`)
        
        
        this.moneyEl.value = ''
        location.href = '/pay'
    }
    _bindRemove() {
        const modalEl = $('#modal')
        while(modalEl.firstChild) {
            modalEl.removeChild(modalEl.firstChild);
        }

        
    }
}