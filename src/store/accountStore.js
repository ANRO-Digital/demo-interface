import {makeAutoObservable} from 'mobx';

export default class AccountStore {
    constructor() {
        this._package = {
            packagePrice: '',
            packageName: ''
        };
        makeAutoObservable(this);
    }

    get package() {
        return this._package;
    }

    setPackage(packageName, packagePrice) {
        this._package = {
            packagePrice,
            packageName
        }
    }
}