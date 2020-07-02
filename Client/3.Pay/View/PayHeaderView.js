const log = console.log
const tag = '[PayHeaderView]'
import "../../src/css/Default.css";
import "../../src/css/pay/PayApp.css";
import "../../src/css/pay/PayHeaderView.css";

export default {
    init(headerEl, navEl, footerEl) {

        headerEl.innerHTML = `
        <h1 class="header__logo">BOM's <p>Parking Lot</p></h1>
        <ul class="header__nav">
            <li class="header__nav-btns"><a href="/pay">HOME</a></li>
            <li class="header__nav-btns"><a href="/">ADMIN</a></li>
            <li class="header__nav-btns"><a href="/">PARKING</a></li>
        </ul>
        `
        navEl.innerHTML = `
        <ul class="nav__menu">
            <li class="nav__menu-items"><a href="#a">사전정산</a></li>
            <li class="nav__menu-items"><a href="#a">차량조회</a></li>
            <li class="nav__menu-items"><a href="#a">요금계산</a></li>
            <li class="nav__menu-items"><a href="#a">처리완료</a></li>
        </ul>
        `
        footerEl.innerHTML = `
        <h3>Have a Nice Day</h3>
        <h3>ⓒ Bom's Parking Lot</h3>
        `
        return this;
    },
}
