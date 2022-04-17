import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpRequest} from '@angular/common/http';

export interface Loader {
    totalRequests: number;
    currentRequestIndex: number;
    percent?: number;
}

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public isLoading = new BehaviorSubject({
        totalRequests: 0,
        currentRequestIndex: 0,
        percent: 0
    } as Loader);
    constructor() { }
}
