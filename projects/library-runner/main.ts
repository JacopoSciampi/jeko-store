import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from "app/app.component";

import { JekoLibModule } from '../jeko-store-lib/src/lib/jeko-store.module';

import { JekoStoreInterceptor } from '../jeko-store-lib/src/lib/jeko-store.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JekoStoreInterceptor, multi: true },
        importProvidersFrom(
            HttpClientModule,
            JekoLibModule.forRoot({
                logLevel: 'debug',
                customHeaders: {
                    'X_HEADER': 'Lorem Ipsum',
                },
                noCacheRegExp: [/ceh/g]
            })
        )
    ]
});
