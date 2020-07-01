const log = console.log
import HeaderFooterNavView from "../View/PayHeaderView.js";
import SearchView from "../View/ParySearchView.js";
import ListsView from "../View/PayListsView.js";
import FeeView from "../View/PayFeeView.js";
import PaymentView from "../View/PayPaymemtView.js";

import FeeCalc from "../Model/PayFeeCalc.js";
import PaymentCalc from "../Model/PayPaymentCalc.js";
import UserData from "../Model/PayUserData.js";

import {$} from "../../1.Common/View/ElementsHooks.js"
import {verifyCarNumber, verifyUserType} from "../Model/PayDataValidation.js";
import {searchRequest, updateRequest} from "../Model/PayQueryModel.js"
import {toPay} from "../Model/PayPaymentCalc.js";

export default class PayMainController {
    constructor() {
        const payHeaderEl = $("#header");
        const payNavEl = $("#nav");
        const paySearchEl = $("#content");
        const payListEl = $("#content");
        const payFeeEl = $("#content");
        const payPaymentEl = $("#content");
        const payFooterEl = $("#footer");

        this.userData = new UserData();
        this.feeCalc = new FeeCalc();
        // this.paymentCalc = new PaymentCalc(this.userData);

        this.headerView = HeaderFooterNavView.init(payHeaderEl, payNavEl, payFooterEl)
        this.searchView = new SearchView(paySearchEl)
            .on("@change", e => this.checkPatternHandler(e.detail))
            .on("@submit", e => this.searchQueryHandler(e.detail))
        this.listsView = new ListsView(payListEl)
            .on("@select", e => this.payCalcHandler(e.detail.data))
        this.feeView = new FeeView(payFeeEl)
            .on("@checkFee", e => this.payModalHandler(e.detail))
        this.paymentView = new PaymentView(payPaymentEl)
            .on("@pay", e => this.paymentHandler(e.detail))
        return this;
    }
    paymentHandler({money}) {
        
        const fee = this.userData.getFee();
        if(fee === 0 ) return this.paymentView._alertMsg();

        const change = Number(money) - Number(fee)
        log(change);
        if(change < 0) return this.paymentView.alertErrorMsg(-3, Math.abs(change));
        this.paymentView.alertMsg(change);
        this.updateRequerst()
    }
    async updateRequerst() {
        const userId = this.userData.getUserId()
        log(userId)
        const response = await updateRequest(userId);
        log(response);
        
    }
    payModalHandler(userData) {
        log(userData);
        this.paymentView.init();
    }
    payCalcHandler(_userData) {
        this.userData.setUserData(_userData);
        this.feeCalc =this.feeCalc.setData(_userData, this.userData);

        _userData.timer = this.feeCalc.getTimer();
        _userData.fee = this.feeCalc.getFee();
        
        this.feeView.init(_userData);
    }
    checkPatternHandler(carNumber) {
        const checkPattern = verifyCarNumber(carNumber);
       
        checkPattern === 1 && this.searchView.isValid(checkPattern);

    }
    async searchQueryHandler(searchData) {
        const response = await searchRequest(searchData);
        
        !response.length ? this.searchView.alertErrorMsg(response) : this.listsHandler(response);
    }
    listsHandler(listsData) {
        this.listsView.init(listsData);
    }
}