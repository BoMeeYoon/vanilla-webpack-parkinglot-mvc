const log = console.log;
const tag = '[ParkingOutView.js]';
import View from "../../../1.Common/View/View.js";
import {$, preventEnter} from "../../../1.Common/View/ElementsHooks.js"
import "../../../src/css/admin/ParkingOutView.css";

export default class ParkingOutView extends View {
    constructor (el) {
        super(el);
        this.data;
        preventEnter();
        return this;
    }
    // 출차처리에 대한 오류 값
    alertErrorMsg(result) {   
        switch(result.result) {
            case -1 : return alert('이미 출차 처리 된 차량입니다')
            case -2 : return alert('입차되지 않은 차량입니다')
            default : alert('차량정보가 없습니다')
        }
        this.bindRemove()
        this._reset()
    }
    //검색 창 정리
    _reset() {
        $('[name="carNumber"]').value = ''
    }
    //검색 된 정보 마운팅
    bindResultsRender(data) {
        
        this.data=data;
        
        this.el.innerHTML = this._getResultsHtml(data)
        this._reset()   
        this.bindParkingOut() 
    }
    
    _getResultsHtml() {
        let key = 0;
        
        return Array.from(this.data).reduce( (html, info) => {
        
            html += this._getResultHtml(info, key)
            key++;
            return html
        }, `<table class="parking__table">
        <thead class="parking__table-head">
            <tr>
                <th>차량번호</th>
                <th>입차시간</th>
                <th>출차시간</th>
                <th>회원</th>
                <th>정산</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="addResult" class="parking__table-body">`) + `</tbody></table>` 
    }
    _getResultHtml(info, key) {
        
        let type 
        let pay 
        
        info.memberId === 1 ? type = "비회원" : type = "회원"
        info.paid === 1 ? pay = "정산" : pay="미정산"
        !info.exitTime ? info.exitTime = '' : info.exitTime
        return `
        <tr>
            <td class="carnumber" data-carnumber = ${info.carNumber}>${info.carNumber}</td>
            <td class="time">${info.entryTime}</td>
            <td class="exit" id="exitTime">${info.exitTime}</td>
            <td class="type">${type}</td>
            <td>${pay}</td>
            <td><button class="out" id="${key}">출차</button></td>
        </tr>
        `
    }
    bindParkingOut() {
        this.outBtns = this.el.querySelectorAll(".out")
        
        Array.from(this.outBtns).forEach( btn => btn.addEventListener( 'click', e => {
            e.preventDefault();           
            this._checkExitTime(this.data[e.target.id])
        })
        )
        
    }
    _checkExitTime = (data) => {
        const {carNumber, entryTime, exitTime, memberId, paid, userId} = data;
        log(data, carNumber, entryTime, exitTime, memberId, paid, userId)
        this.userId = userId;
        if(exitTime) return this.alertErrorMsg({result:-1});
        this.emit("@out", {userId, carNumber, entryTime})        
    }
    alertMsg() {
        alert('출차가 완료되었습니다')
        $('input[name=carNumber]').value = '';
    
    }

    exitTimeRender(time, userData) {
        const {userId} = userData;
        const _exitTime = time[0].exitTime;
        
        this.data = this.data.map(info => info.userId === userId ? {...info, exitTime : _exitTime} : info )
        
        this.bindResultsRender(this.data)
    }

    _bindRemove() {
        while(this.el.firstChild) {
            this.el.removeChild(this.el.firstChild)
        }
    }

}