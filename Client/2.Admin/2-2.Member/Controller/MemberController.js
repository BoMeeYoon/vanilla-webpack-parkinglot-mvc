const log = console.log;

import MenuView from '../View/MemberMenuView.js';
import AddView from '../View/MemberAddView.js';
import ListsView from '../View/MemberListsView.js';
// import SearchView from '../View/MemberMenuView.js';

import SetData from '../Model/MemberSetDataModel.js';
import VerifyInputData from '../Model/MemberInputValidation.js';
import VerifySearchData from '../Model/MemberSearchValidation.js';
import UseData from '../Model/MemberUseData.js';
import {searchRequest, updateRequest, deleteRequest, addRequest} from '../Model/MemberQueryModel.js';
import {$} from '../../../1.Common/View/ElementsHooks.js'



export default class MemberController {
    constructor() {
        const menuViewEl = $("#menu");
        
        this.menuView = new MenuView(menuViewEl)
            .on("@addMember", () => this.addHandler())
            .on("@search", e => this.searchHandler(e.detail))
        this.verify = new VerifyInputData();
    }
    addHandler() {
        log('addHandler')
        const setInputData = new SetData();
        const addViewEl = $("#modal");
        
        this.addView = new AddView(addViewEl)
            .on("@verify", e => this.onVerifyMember(e.detail, setInputData))
            .on("@submit", e => this.addResultHandler(setInputData))
    }
    onVerifyMember(inputData, setInputData) {
        log(inputData, setInputData)
        const type = this.verify.setInputData(inputData, setInputData).verify();
        log(type)
        if(Object.values(type)[0] === false) {
            this.addView.alertErrorMsg(inputData)
            this.addView.onFocusStyle(inputData)
        } else {
            this.addView.disabledStyle(inputData)
            const count = this.verify.isValidCounter()
            
            if(count === 5) {   
                       
                this.addView.isValid()
                UseData.add(setInputData.getData())
            }
           
        }

    }
    async addResultHandler(setInputData) {
        const response = await addRequest(setInputData.getData());
        log(response);
        if(response !==1) return this.addView.alertErrorMsg(response);
        UseData.list().then(res => this.listsHandler(res));
        this.addView.goBack();
        // UseData.remove();
    }
    
    async searchHandler( {option, inputData} ) {
        log(option, inputData)
        
        const result = VerifySearchData.verify(option, inputData);
        log(result)

        if(result === false) {
            this.menuView.alertErrorMsg(option)
        } else {
            this.searchResultHandler(await searchRequest(option, inputData))
        }

    }
    searchResultHandler(response) {
        log(response)
        // 혹시 여기서 에러 생기면 response 가 컬렉션으로 왔을 때 안 벗겨 진 것임.
        //searchRequest 에서 조건 걸어서 해결해주기
        if(response === -1) return this.menuView.alertErrorMsg("query") 
        this.listsHandler(response);
        UseData.add(response);
    }
    listsHandler(data) {
        log(data)
        const listsEl = $("#content");
        this.listsView = new ListsView(listsEl)
            .on("@edit", e => this.updateHandler(e.detail.memberData))
            .on("@delete", e => this.deleteHandler(e.datail))
        this.listsView.mountLists(data);
    }
    updateHandler(memberData) {
        const response = updateRequest(memberData);
        if(response !== 1) {
            this.updateview.alertErrorMsg(response);
        } else {
            UseData.add(memberData).list().then(res => {
                this.listsHandler(res);
            })
        }

    }
    deleteHandler({name, carNumber}) {
        this.deleteView = new DeleteView($("#modal"), name)
            .on("@delete", e => this.deleteResultHandler(deleteRequest(carNumber), carNumber))
    }
    deleteResultHandler(response, carNumber) {
        if(response === 1) {
            this.deleteView.alertMsg();
            UseData.delete(carNumber).list().then(res => {
                this.listsViewHandler(res);
            })
        }
    }
}