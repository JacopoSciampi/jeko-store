import { updateHeaders } from "./jeko-store-env";

import { JekoStoreGenericInterface } from "./jeko-store.model";

export class JekoStoreRefClass {
    public static updateHeaders(headers: JekoStoreGenericInterface): void {
        updateHeaders(headers);
    }
}
