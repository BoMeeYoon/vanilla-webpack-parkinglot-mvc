const log = console.log;
import View from '../../../1.Common/View/View.js';
import {modalView} from '../../../1.Common/View/Modal.js';
import {$} from '../../../1.Common/View/ElementsHooks.js';
import "../../../src/css/admin/MemberLists.css"

export default class MemberListsView extends View {
    constructor(el) {
        log('ListsView')
        super(el);
        this._initRender();
        return this;
    }
    _initRender() {
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
    mountLists(data) {
        log(data)
        this.listsEl = this.el.querySelector(".lists__table-body");
        this.listsEl.innerHTML = this._getListsHtml(data);
        this._bindEvents()
        return this;
    }
    _getListsHtml(data) {
        let count = 1;
       
        return data.reduce( (html, info) => {
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
            <td><button class="lists__table-editBtn" data-member=${JSON.stringify(info)}>수정</button></td>
            <td><button class="lists__table-deleteBtn" data-member=${JSON.stringify(info)}>삭제</button></td>
        </tr>
    `
    }
    _bindEvents() {
        this.editBtns = this.el.querySelectorAll(".lists__table-editBtn");
        this.deleteBtns = this.el.querySelectorAll("lists__table-deleteBtn");

        Array.from(this.editBtns).forEach(btn => btn.addEventListener("click", e => {
            e.preventDefault();
            const _memberData = e.target.dataset.member
            const memberData = JSON.parse(_memberData);
            this.on("@edit", {memberData});
        }));

        Array.from(this.deleteBtns).forEach(btn => btn.addEventListener("click", e => {
            e.preventDefault();
            const _memberData = e.target.dataset.member
            const memberData = JSON.parse(_memberData);
            const {name, carNumber} = memberData;
            this.on("@delete", {name, carNumber})
        }))
    }
    // _deleteModalMount(name, carNumber) {
    //     const title = `${name}님의 정보를 삭제하시겠습니까?`
    //     const text = `삭제한 정보는 복구할 수 없습니다`
    //     modalView(this.modalEl, title, text);
    //     this.yesBtn = $('.modal__confirm-yes');
    //     this.noBtn = $('.modal__confirm-no');

    //     this.yesBtn.addEventListener("click", e => {
    //         e.preventDefault();
    //         this.emit("@delete", {carNumber});
    //         this._modalHide()
    //     });
    //     this.noBtn.addEventListener("click", () => this._modalHide())
    // }
    // _modalHide() {
    //     this.modalEl.display.style="none";
    // }
}