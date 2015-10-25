export default class LocalStorage {
    public getData (key:string):Object {
        return JSON.parse(window.localStorage.getItem(key));
    }

    public saveData (key:string, data:any) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}