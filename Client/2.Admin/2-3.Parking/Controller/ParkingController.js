const log = console.log;

import HeaderView from "../../2-1.Main/View/HeaderView.js";
import FooterView from "../../2-1.Main/View/FooterView.js"
import FormView from "../View/ParkingFormView.js";
import OutView from "../View/ParkingOutView.js";
import {addRequest, searchRequest, updateRequest} from "../Model/ParkingQuery.js";
import {$, preventEnter} from "../../../1.Common/View/ElementsHooks.js"
import {authorize} from "../../../1.Common/Model/Auth.js"
import {logout} from "../../../2.Admin/2-1.Main/Model/LoginModel.js"

export default class ParkingController {
    constructor() {
        const parkingheaderViewEl = $("#header");
        const parkingfooterViewEl = $("#footer");
        const parkingMenuEl = $("#menu");
        const parkingContentEl = $("#content");
        
        this.headerView = new HeaderView(parkingheaderViewEl)
            .init("회원관리", "LOGOUT")
            .on("@logout", () => {
                logout();
                location.assign('/');})
            .on("@changePage", e => location.assign('/'));
        this.footerView = new FooterView(parkingfooterViewEl);
        this.formView = new FormView(parkingMenuEl)
                .on("@in", e => this.inQueryHandler(e.detail))
                .on("@search", e => this.searchQueryHandler(e.detail))
                .on("@click", e => this.resultsHandler())
        this.outView = new OutView(parkingContentEl)
                .on("@out", e => this.updateQueryHandler(e.detail))
        this.authHandler();
        preventEnter();
        return this;
    }
    authHandler() {
        const _auth = authorize();
        _auth === "login" && location.assign('/') 
    }

    async inQueryHandler(carNumber) {
        const response = await addRequest(carNumber);
        
        if (typeof response !== "object") return this.formView.alertErrorMsg(response);
        
        this.formView.alertMsg();

    }
    async searchQueryHandler(carNumber) {
        const response = await searchRequest(carNumber);
        log(response)
        if(typeof response !== "object" || response.result === -1 || !response.length) return this.outView.alertErrorMsg(response)
        
        this.outView.bindResultsRender(response);
        
    }
    async updateQueryHandler(updateData) {
        const response = await updateRequest(updateData);
        this.outView.exitTimeRender(response, updateData);

    }
    resultsHandler() {
        this.outView._bindRemove()
    }
}