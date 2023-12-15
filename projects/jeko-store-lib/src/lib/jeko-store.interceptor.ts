import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";

import { Observable, of, tap } from "rxjs";

import { JekoStoreEnv, getEnv } from "./jeko-store-env";

import { JekoStoreLoggerClass } from "./jeko-store.logger";

import { JekoStoreGenericInterface } from "./jeko-store.model";

@Injectable()
export class JekoStoreInterceptor implements HttpInterceptor {
    private _cachedData: JekoStoreGenericInterface = {};

    public intercept<T>(httpRequest: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        const existingHeaders = httpRequest.headers;
        const env = getEnv();

        const _: JekoStoreGenericInterface = {}
        const headers = new HttpHeaders(_);

        existingHeaders.keys().forEach(item => {
            const value = existingHeaders.get(item);

            if (value) {
                _[item] = value;
            }
        });

        Object.keys(env?.customHeaders as JekoStoreGenericInterface)?.forEach(item => {
            const headerValue = (env.customHeaders as JekoStoreGenericInterface)[item];
            if (headerValue) {
                _[item] = (env.customHeaders as JekoStoreGenericInterface)[item];
            }
        });

        const url = httpRequest.url;

        if (!this._cachedData[url] || !!existingHeaders.get('x_no_cache') || this._checkNoCache(url, env)) {
            return next.handle(httpRequest.clone({
                headers: headers, withCredentials: true
            })).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this._cachedData[url] = JSON.stringify(event.body);
                    }
                })
            );
        } else {
            if (env.logLevel === 'debug') {
                const match = url.match(/(?:https?:\/\/)?[^/]+(.+)/);
                const key = match && match[1] ? match[1] : url;

                JekoStoreLoggerClass.warning(`Cached data from endpoint: ${key}`);
            }
            const cachedData = this._cachedData[url];
            return of(new HttpResponse<T>({ body: JSON.parse(cachedData), status: 200 }));
        }
    }

    private _checkNoCache(url: string, env: JekoStoreEnv): boolean {
        let _ = false;

        env?.noCacheRegExp?.forEach(matcher => {
            if (!!url.match(matcher)) {
                _ = true;
            }
        });

        return _;
    }
}
