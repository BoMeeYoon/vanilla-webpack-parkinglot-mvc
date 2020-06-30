const log = console.log;
import View from '../../2-1.Main/View/View.js';
import {modalView} from '../../../1.Common/View/Modal.js';
import {$} from '../../../1.Common/View/ElementsHooks.js';

export default class MemberDeleteView extends View {
    constructor(el, name) {
        super(el);
        this.name = name;
        this.title = `${name}님의 정보를 삭제하시겠습니까?`;
        this.text = `삭제한 정보는 복구할 수 없습니다`
        this.modalView = modalView(this.el, this.title, name);
        this._bindEvents()
        return this;
    }
    _bindEvents() {
        this.yesBtn = this.el.querySelector('.modal__confirm-yes');
        this.noBtn = this.el.querySelector('.modal__confirm-no');

        this.yesBtn.addEventListener("click", e => {
            e.preventDefault();
            this.emit("@delete");
            this._modalHide()
        });
        this.noBtn.addEventListener("click", () => this._modalHide())
    }
    _modalHide() {
        this.modalEl.display.style="none";
    }
    alertMsg(){
        return alert(`${this.name}님의 정보가 삭제되었습니다`)
    }
}