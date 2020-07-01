const log = console.log;
import View from "../../1.Common/View/View.js"
import {preventEnter} from "../../1.Common/View/ElementsHooks.js"
export default class PayFeeView extends View {
    constructor(el) {
        
        super(el);
        preventEnter();
        return this
    }
    init(data) {
        this.data = data;
        this.display1El = this.el.querySelector("#display-1");
        this.display2El = this.el.querySelector("#display-2");
        
        this.payBtn;

        this._initRender()
        this._bindEvents()
        
    }
    _initRender() {
        this.display1El.innerHTML = `
        <div class="pay__display1">
            <div class="pay__display1-titles">
                <h1>요금 확인 후</h1>
                <h1>결제 버튼을 누르세요</h1>
            </div>
            <div class="pay__display1-btns">
                <button class="homeBtn">처음</button>
                <button class="pay">결제</button>
            </div>
        </div>
        `
        this.display2El.innerHTML = `
        <div class="pay__display2">
            <table class="fee__lists-table">
                <tr>
                    <td>차량번호</td>
                    <td name="carNumber">${this.data.carNumber}</td>
                </tr>
                <tr>
                    <td>입차시간</td>
                    <td name="entryTime">${this.data.entryTime}</td>
                </tr>
                <tr>
                    <td>주차시간</td>
                    <td name="time">${this.data.timer}</td>
                </tr>
                <tr>
                    <td>정산요금</td>
                    <td name="fee">${this.data.fee}</td>
                </tr>
            </table>
        </div>
        `
    }

    _bindEvents() {
        this.payBtn = this.el.querySelector('.pay')
        this.homeBtn = this.el.querySelector('.homeBtn')
        this.payBtn.addEventListener('click', e => this.emit("@checkFee", this.data))
        this.homeBtn.addEventListener('click', () => location.assign('/pay'))
    }
}