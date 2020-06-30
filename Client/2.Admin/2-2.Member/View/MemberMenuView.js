const log = console.log;
import View from "../../../1.Common/View/View.js";
import "../../../src/css/admin/MemberMenu.css";
export default class Menuview extends View {
    constructor(el) {
        super(el);
        this._initRender();
        this._bindElements();

        this.errorMsg = {
            NO_SELECT : `검색 조건을 선택하세요`,
            NO_KEYWORD : `검색어를 입력하세요`,
            mobile : `핸드폰 번호를 다시 입력하세요`,
            name : `회원명을 다시 입력하세요`,
            carNumber : `차량번호를 다시 입력하세요`,
            query : `회원정보가 없습니다`
        }
        this.show()
        return this;
    }
    _initRender() {
        return this.el.innerHTML = `
        <div class="menu">
            <button class="menu__add-btn">+ ADD MEMBER</button>
            <div class="menu__search">
                <div class="menu__search-items">
                    <div class="menu__search-select">
                        <select name="condition" id="menu__search-select">
                            <option value="" selected>검색</option>
                            <option value="mobile">연락처</option>
                            <option value="carNumber">차량번호</option>
                            <option value="name">회원명</option>
                        </select>
                    </div>
                    <input id="menu__search-input" type="text" placeholder="정보를 입력하세요">
                </div>
                <button id="menu__search-btn"><i class="fas fa-search"></i></button>
            </div>
        </div>`    
    }
    _bindElements() {
        this.addBtn = this.el.querySelector('.menu__add-btn');
        log(this.addBtn)
        this.selectEl = this.el.querySelector('#menu__search-select');
        this.searchEl = this.el.querySelector('#menu__search-input');
        this.searchBtn = this.el.querySelector('#menu__search-btn')
        this.options;
        this._bindChange();
        this._bindEvents();
        return this;
    }
    _bindChange() {
        this.selectEl.addEventListener('change', e => this.options = e.target.value)
    }
    _bindEvents() {
        this.addBtn.addEventListener("click" , () => this.emit("@addMember"));
        log(this.addBtn)
        this.searchBtn.addEventListener("click", e => {
            if(!this.selectEl.value.length) {
                this.alertErrorMsg("NO_SELECT");
            } else if(!this.searchEl.value.length) {
                this.alertErrorMsg("NO_KEYWORD");
            } else {
                const option = this.options;
                log(option)
                const inputData = this.searchEl.value;
                this.emit("@search", {option, inputData})
                this.reset();
            }
        })
    }
    alertErrorMsg(error) {
        alert(this.errorMsg[error])
        this.reset();
    }
    reset() {
        this.searchEl.value="";
    }

}