import { JekoStoreGenericInterface } from "./jeko-store.model";

export type JekoStoreEnv = {
    logLevel: 'debug' | 'none';
    customHeaders?: JekoStoreGenericInterface;
    noCacheRegExp?: RegExp[]
}

let env: JekoStoreEnv = {
    logLevel: 'none',
    customHeaders: {}
};

export function updateHeaders(headers: JekoStoreGenericInterface): void {
    env.customHeaders = { ...env.customHeaders, ...headers };
}

export function setEnv(data: JekoStoreEnv): void {
    env = data;
}

export function getEnv(): JekoStoreEnv {
    return env;
}
