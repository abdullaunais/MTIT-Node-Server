import { Injectable } from "@angular/core";
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class Session {

    constructor(private storage: LocalStorageService) {
        this.getLogin();
        this.getUser();
    }

    public setLogin(value: boolean) {
        this.storage.store('login', value);
    }

    public setUser(value: any) {
        this.storage.store('user', value);
    }

    public getLogin() {
        this.storage.retrieve('login').then((val) => {
            // ignore
        });
    }

    public getUser() {
        this.storage.retrieve('user').then((val) => {
            // ignore
        });
    }
}