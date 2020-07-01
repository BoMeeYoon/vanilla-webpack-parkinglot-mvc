const log = console.log
const tag = '[PayListsView.js]'
import {$} from '../../1.Common/View/ElementHooks.js'
import View from '../../1.Common/View/View.js';

export default class PayListsView extends View {
    constructor(el) {
        super(el);
        return this
    }
    init(result) {
        this.result = result;
        this.display1El = this.el.querySelector("#display-1")
        this.display2El = this.el.querySelector("#display-2")
        
        this._initRender();
        this._bindrenderLists();

        return this;
    }
    _initRender() {
        
        this.display1El.innerHTML = `
        <div class="pay__display1">
            <div class="pay__display1-titles">
                <h1>차량정보 확인 후</h1>
                <h1>본인의 차량을 선택하세요</h1>
            </div>
            <div class="pay__display1-btns">
                <button class="reSearchBtn">재조회</button>
                <button class="homeBtn">처음</button>
            </div>
        </div>
        `
        this.display2El.innerHTML = `
        <div class="pay__display2">
            <table class="pay__lists-table">
                <thead class="pay__table-head">
                    <tr>
                        <th>번호</th>
                        <th>차량번호</th>
                        <th>입차시간</th>
                    </tr>
                </thead>
                <tbody class="pay__table-body"></tbody>
            </table>
        </div>
        `
    }
    _bindrenderLists() {
        
        this.resultEl = this.el.querySelector('.pay__table-body');
        this.resultEl.innerHTML = this._getListsHtml()
        this._bindListsEvent()
        
    }
    _getListsHtml() {
        let count = 1;
        return Array.from(this.result).reduce( (html, info) => {
            html += this._getListHtml(info, count)
            count++
            return html
        }, '')
    }
    _getListHtml(info, count) {
        
        return `
        <tr class="pay__table-tr" data-id=${info.memberId}>
            <th>${count}</th>
            <td class="carnumber" data-carnumber = ${info.carNumber}>${info.carNumber}</td>
            <td class="time" data-time=${JSON.stringify(info.entryTime)}>${info.entryTime}</td>
        </tr>
        ` 
    }
    _bindListsEvent() {
        this.trEls = this.el.querySelectorAll('.pay__table-tr');
        Array.from(this.trEls).forEach( tr => tr.addEventListener('click', e => {
            e.preventDefault();
            const carNumber = tr.querySelector('.carnumber').dataset.carnumber;
            const entryTime = tr.querySelector('.time').dataset.time;
            const memberId = tr.dataset.id;
            log(carNumber, entryTime, memberId);
            const data = {carNumber, entryTime, memberId};

            this.emit('@click', {data})
        }))
        this.reSearchBtn = this.el.querySelector('.reSearchBtn')
        this.homeBtn = this.el.querySelector('.homeBtn')

        this.homeBtn.addEventListener('click', () => location.assign('/pay'))
        this.reSearchBtn.addEventListener('click', () => location.assign('/pay'))
        return this
    }
}