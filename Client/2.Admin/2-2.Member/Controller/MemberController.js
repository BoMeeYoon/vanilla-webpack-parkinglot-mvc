const log = console.log;
import MenuView from "../View/MemberMenuView.js";
import AddView from "../View/MemberAddView.js";
import ListsView from "../View/MemberListsView.js";
import UpdateView from "../View/MemberUpdateView.js";
import DeleteView from "../View/MemberDeleteView.js";

import searchValidation from "../Model/MemberSearchValidation.js";
import inputValidation from "../Model/MemberInputValidation.js";
import setState from "../Model/MemberSetDataModel.js";
import useState from "../Model/MemberUseData.js";
import {searchRequest, addRequest, updateRequest, deleteRequest, preventEnter} from "../Model/MemberQueryModel.js"
import {$} from "../../../1.Common/View/ElementsHooks.js";

export default class MemberController {
    constructor() {
        const memberMenuEl = $("#menu");
        const memberAddEl = $("#modal");
        const memberListsEl = $("#content")
        const memberUpdateEl = $("#modal");
        const memberDeleteEl = $("#modal")
        
        this.checkData = new inputValidation();
        this.setData = new setState();
        this.useData = useState;
        
        
        this.menuView = new MenuView(memberMenuEl)
            .on("@addMember", e => this.addHandler(e))
            .on("@search", e => this.searchHandler(e.detail));
        this.addView = new AddView(memberAddEl)
            .on("@verify", e => this.checkAddHandler(e.detail))
            .on("@submit", e => this.addQueryHandler(e.detail));
        this.listsView = new ListsView(memberListsEl)
            .on("@edit", e => this.updateHandler(e.detail))
            .on("@delete", e => this.deleteHandler(e.detail));
        this.updateView = new UpdateView(memberUpdateEl)
            .on("@change", e => this.checkUpdateHandler(e.detail))
            .on("@update", e => this.updateQueryHandler(e.detail))
        this.deleteView = new DeleteView(memberDeleteEl)
            .on("@delete", e => this.deleteQueryHandler(e.detail))
        return this;

    }
    
    // add
    addHandler(e) {

        e.stopPropagation();
        this.addView.init();

    }
    checkAddHandler(inputData) {
        
        const result = this.checkData.setInputData(inputData, this.setData).verify();
        const name = Object.keys(result)[0];
        const value = Object.values(result)[0];
        
        if(value === false) return this.addView.sendErrorMsg(name)
        
        this.addView.sendSuccess(name) 
        const counter = this.checkData.isValidCounter();

        counter === 5 && this.addView.isValid();
        
    }
    async addQueryHandler(addData) {
        
        const response = await addRequest(addData);
        
        if(response === -1) return this.addView.sendErrorMsg("query");
        this.useData.add(response);
        this.useData.list()
            .then( res => this.listsHandler(res))
        this.addView.goBack();
        
    }
    //search
    searchHandler({option, inputData}) {
        this.useData.reset();
        const name = option;
        const value = inputData;
        const result = searchValidation.verify(name, value);
        log(result)
        result === false ? this.menuView._alertErrorMsg(name) : this.searchQueryHandler(name, value)
    }
    async searchQueryHandler(name, value) {
        const response = await searchRequest(name, value);
        if(response !== -1) return this.listsHandler(response);
        this.menuView._alertErrorMsg("query")
    }
    listsHandler(response) {

        this.listsView.init(response);
    } 
    //update
    updateHandler(data) {
        this.updateView.init(data);
    } 
    checkUpdateHandler(updateData) {
        const result = this.checkData.setInputData(updateData, this.setData).verify();
        const name = Object.keys(result)[0];
        const value = Object.values(result)[0];
        value === false && this.updateView.sendErrorMsg(name);   
    }
    async updateQueryHandler(updateData) {
        
        const response = await updateRequest(updateData);
        if(response !==1) return this.updateView.sendErrorMsg("query");

        this.useData.add(updateData);
        this.useData.list()
            .then( res => this.listsHandler(res))
        this.updateView.goBack();
    }
    //delete
    deleteHandler(deleteData) {
        this.deleteView.init(deleteData);
    }
    async deleteQueryHandler({memberId, name}) {
        const response = await deleteRequest(memberId);
        if(response === 1) {
            this.deleteView.sendMsg(name);
            this.useData.delete(memberId);
            this.useData.list()
            .then( res => this.listsHandler(res))
        }

    }


    
  

}