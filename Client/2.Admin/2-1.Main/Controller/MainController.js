const log = console.log;
const tag = '[MainController..js]'

import HeaderView from "../View/HeaderView.js";
import LoginView from "../View/LoginView.js"
import FooterView from "../View/FooterView.js";

import MemberController from '../../2-2.Member/Controller/MemberController.js';
import ParkingController from '../../2-3.Parking/Controller/ParkingController.js';

import {$} from "../../../1.Common/View/ElementsHooks.js";
import {authorize} from "../../../1.Common/Model/Auth.js";
import {login, logout} from '../Model/LoginModel.js'

export default class MainController {

    constructor() {
        this.headerViewEl = $("#header");
        this.loginViewEl = $("#modal");
        this.footerViewEl = $("#footer");
        this.menuViewEl = $("#menu");

        this.headerView;
        this.menuView;
        this.loginView;
        this.footerView = new FooterView(this.footerViewEl);

        this.memberController;
        this.parkingController;

        this.authHandler();
    }

    authHandler() {      
        const _auth = authorize();
        _auth === "login" ? this.login() : this.goin()
    }

    login() {
        this.reset()
        this.headerView = new HeaderView(this.headerViewEl, "입출차관리", "LOGIN");
        this.loginView = new LoginView(this.loginViewEl)
            .on("@login", e => {
                const {id, pw} = e.detail;
                login(id, pw);
                this.goin()

            })
    }
    
    goin() {
        this.reset()
        this.headerView = new HeaderView(this.headerViewEl, "입출차관리", "LOGOUT")
            .on("@changePage", e => new ParkingController())
            .on("@logout", e => {
                logout();
                this.menuViewEl.style.display = "none";
                this.login();              
            })
        new MemberController();
    }

    reset() {
        this.headerViewEl.firstChild && this.headerView.bindRemove()
        this.loginViewEl.firstChild && this.loginView.bindRemove()
    }
    
}