const log = console.log
const tag ='[Modalview.js]'


export function modalView (el, title, text) {
    const modalEl = el;
    return modalEl.innerHTML = `
    <div class="modal__confirm">
        <h1 class="modal__confirm-title">${title}</h1>
        <p class="modal__confirm-text">${text}</p>
        <div class="modal__confirm-btns">
            <button class="modal__confirm-yes">확인</button>
            <button class="modal__confirm-no">취소</button>
        </div>
    </div>
    `
}