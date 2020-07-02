const log = console.log;
import View from '../../../1.Common/View/View.js';
import "../../../src/css/admin/MemberLists.css"

export default class MemberListsView extends View {
    constructor(el) {
        super(el);
        this.data
        return this;
    }
    init(data) {
        this.data = data;
        this._moundListsHeader();
        this._mountListsBody();
    }
    _moundListsHeader() {
        return this.el.innerHTML = `
        <div class="lists">
            <table class="lists__table">
                <thead class="lists__table-head">
                    <tr>
                        <th></th>
                        <th>차량번호</th>
                        <th>회원명</th>
                        <th>연락처</th>
                        <th>계약일</th>
                        <th>만료일</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="lists__table-body"></tbody>
            </table>                
        </div>
        `   
    }
    _mountListsBody() {

        this.listsEl = this.el.querySelector(".lists__table-body");
        this.listsEl.innerHTML = this._getListsHtml();
        this._bindEvents()
        return this;
    }
    _getListsHtml() {
        let count = 1;
       
        return this.data.reduce( (html, info) => {
            html += this._getListHtml(count, info);
            count++;
            return html
        }, '')
    }
    _getListHtml(count, info) {
        return `
        <tr class="lists__table-tr">
            <th>${count}</th>
            <td>${info.carNumber}</td>
            <td>${info.name}</td>
            <td>${info.mobile}</td>
            <td>${info.startDate}</td>
            <td>${info.expireDate}</td>
            <td><button class="lists__table-editBtn" id=${count-1}>수정</button></td>
            <td><button class="lists__table-deleteBtn" id=${count-1}>삭제</button></td>
        </tr>
    `
    }
    _bindEvents() {
        this.editBtns = this.el.querySelectorAll(".lists__table-editBtn");
        this.deleteBtns = this.el.querySelectorAll(".lists__table-deleteBtn");
        
        Array.from(this.editBtns).forEach(btn => 
            btn.addEventListener("click", e => 
               { e.preventDefault();
                 e.stopPropagation();
                 const memberData = this.data[e.target.id];
                 this.emit("@edit", memberData);
        }));

        Array.from(this.deleteBtns).forEach(btn => btn.addEventListener("click", e => {
            e.preventDefault();
            const memberData = this.data[e.target.id];
            const {memberId, name} = memberData;
            
            this.emit("@delete", {memberId, name})
        }))
    }
    bindRemove() {
        const lists = this.el.querySelector(".lists")
        lists && lists.remove()
        
    }
}