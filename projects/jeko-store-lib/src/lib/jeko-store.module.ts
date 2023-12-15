import { ModuleWithProviders, NgModule } from "@angular/core";

import { JekoStoreEnv, setEnv } from "./jeko-store-env";

@NgModule()
export class JekoLibModule {
    public static forRoot(data: JekoStoreEnv): ModuleWithProviders<JekoLibModule> {
        setEnv(data);

        return {
            ngModule: JekoLibModule
        };
    }
}
