import View from '../View/DefaultView.js'
import {$, preventEnter} from '../../1.Common/View/ElementHooks.js'
export default class PayFeeView extends View {
    constructor(el) {
        log(data)
        super(el);
        
        return this
    }
    init(data) {
        this.data = data;
        this.display1El = this.el.querySelector("#display-1");
        this.display2El = this.el.querySelector("#display-2");
        this.carNumber = data.carNumber;
        this.entryTime = data.entryTime;
        this.time = data.time;
        this.fee = data.fee;

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
                    <td name="carNumber">${this.carNumber}</td>
                </tr>
                <tr>
                    <td>입차시간</td>
                    <td name="entryTime">${this.entryTime}</td>
                </tr>
                <tr>
                    <td>주차시간</td>
                    <td name="time">${this.time}</td>
                </tr>
                <tr>
                    <td>정산요금</td>
                    <td name="fee">${this.fee}원</td>
                </tr>
            </table>
        </div>
        `
    }

    _bindEvents() {
        this.payBtn = this.el.querySelector('.pay')
        this.homeBtn = this.el.querySelector('.homeBtn')
        this.payBtn.addEventListener('click', e => this.emit('@checkFee'))
        this.homeBtn.addEventListener('click', () => location.assign('/pay'))
    }
}