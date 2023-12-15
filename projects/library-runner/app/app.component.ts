import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JekoStoreRefClass } from '../../jeko-store-lib/src/lib/jeko-store-ref.class';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class AppComponent {
    private _http = inject(HttpClient);

    public data!: {};
    public data2!: {};

    constructor() {
        JekoStoreRefClass.updateHeaders({
            'x_something': 'Some value',
            'Authentication': 'Bearer AddYourJwtHere'
        })
    }

    public doCall(): void {
        this._http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(res => {
            this.data = res;
        });
    }

    public doCall2(): void {
        const headers = new HttpHeaders().set('x_no_cache', 'true');
        this._http.get('https://jsonplaceholder.typicode.com/todos/2', { headers }).subscribe(res => {
            this.data2 = res;
        });
    }
}
