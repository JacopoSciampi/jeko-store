export class JekoStoreLoggerClass {
    public static warning(message: string): void {
        console.warn(`%c${message}`, "background-color: #1c1c1c; color: #fff56b; padding: 8px 16px;");
    }
}
