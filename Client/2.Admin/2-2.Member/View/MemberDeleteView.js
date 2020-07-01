const log = console.log;
import View from '../../../1.Common/View/View.js';
import {modalView} from '../../../1.Common/View/Modal.js';
import {preventEnter} from '../../../1.Common/View/ElementsHooks.js';
import "../../../src/css/admin/MemberDelete.css";

export default class MemberDeleteView extends View {
    constructor(el) {
        super(el);
        this.data;
        
        return this;
    }
    init(data) {
        this.data = data;
        const title = `"${data.name}"님의 정보를<br/> 삭제하시겠습니까?`;
        const text = `삭제한 정보는 복구할 수 없습니다`;
        modalView(this.el, title, text);
        this._bindEvents();
        preventEnter();
    }
    _bindEvents() {
        this.yesBtn = this.el.querySelector('.modal__confirm-yes');
        this.noBtn = this.el.querySelector('.modal__confirm-no');

        this.yesBtn.addEventListener("click", e => {
            e.preventDefault();
            this.emit("@delete", this.data);
            this._modalHide()
        });
        this.noBtn.addEventListener("click", () => this._modalHide())
    }
    _modalHide() {
        this.el.querySelector('.modal__confirm').remove();
    }
    sendMsg(name){
        log(name)
        return alert(`${name}님의 정보가 삭제되었습니다`)
    }
}