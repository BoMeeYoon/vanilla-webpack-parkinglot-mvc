const log = console.log
import HeaderFooterNavView from "../View/PayHeaderView.js";
import SearchView from "../View/ParySearchView.js";
import ListsView from "../View/PayListsView.js";
import FeeView from "../View/PayFeeView.js";
import PaymentView from "../View/PayPaymemtView.js";

import {$} from "../../1.Common/View/ElementsHooks.js"

export default class PayMainController {
    constructor() {
        const payHeaderEl = $("#header");
        const payNavEl = $("#nav");
        const paySearchEl = $("#content");
        const payListEl = $("#content");
        const payFeeEl = $("#content");
        const payPaymentEl = $("#content");
        const payFooterEl = $("#footer");

        

        this.headerView = Object.create(HeaderFooterNavView);
        this.searchView = new SearchView(paySearchEl)

        this.listsView = new ListsView(payListEl)
        this.feeView = new FeeView(payFeeEl)
        this.paymentView = new PaymentView(payPaymentEl)

        return this;
    }
}