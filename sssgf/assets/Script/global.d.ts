declare interface CCSysLocalStorage {
    getItem(key: string): any;
    setItem(key: string, value: any);
    removeItem(key: string);
    clear();
    key();
}

declare var tt: any;
declare var kwaigame: any;
interface Window {
    tt,
    kwaigame,
}