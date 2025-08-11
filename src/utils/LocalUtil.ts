import {config} from "./config";

export default class LocalUtil {

    static setBool(value: boolean, key: string) {
        localStorage.setItem(config.appid + key, value ? "true" : "false")
    }

    static setString(value: string, key: string) {
        if (!key || key.length < 1) {
            return;
        }
        if (value == null || value.length < 1) {
            value = "";
        }
        localStorage.setItem(config.appid + key, value)
    }

    static setFloat(value: number, key: string) {
        localStorage.setItem(config.appid + key, value.toString())
    }


    static setObject(value: Object, key: string) {
        localStorage.setItem(config.appid + key, JSON.stringify(value))
    }

    static boolForKey(key: string, valid: boolean = false): boolean {
        let result = localStorage.getItem(config.appid + key);
        if (!result) {
            return valid;
        }
        if (result == "true") {
            return true;
        } else if (result == "false") {
            return false;
        }
        return valid;
    }

    static floatForKey(key: string, valid: number): number {
        let item = localStorage.getItem(config.appid + key);
        if (!item) {
            return valid;
        }
        let result = parseFloat(item);
        return result;
    }

    static stringForKey(key: string, valid: string = ""): string {
        let result: any = localStorage.getItem(config.appid + key);
        if (!result) {
            return valid;
        }
        return result;
    }


    static objectForKey(key: string, valid: Object = {}): Object {
        let result: any = localStorage.getItem(config.appid + key);
        result = JSON.parse(result)
        if (!result) {
            return valid;
        }
        return result;
    }

    static clear() {
        localStorage.clear()
    }

    static getQueryString(key: string) {
        //1、url截取?之后的字符串(不包含?)
        let pathSearch = window.location.search.substr(1);
        let result: any = [];
        //2、以&为界截取参数键值对
        let paramItems = pathSearch.split("&");
        // 3、将键值对形式的参数存入数组
        for (let i = 0; i < paramItems.length; i++) {
            let paramKey = paramItems[i].split("=")[0];
            let paramValue = paramItems[i].split("=")[1];
            result.push({
                key: paramKey,
                value: paramValue
            });
        }
        // 4、遍历key值
        for (let j = 0; j < result.length; j++) {
            if (result[j].key === key) {
                return result[j].value;
            }
        }
        return null;
    }

    static isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    }

    static setBySession(value: string, key: string) {
        if (!key || key.length < 1) {
            return;
        }
        if (value == null || value.length < 1) {
            value = "";
        }
        sessionStorage.setItem(config.appid + key, value)
    }

    static getBySession(key: string, valid: string = ""): string {
        let result: any = sessionStorage.getItem(config.appid + key);
        if (!result) {
            return valid;
        }
        return result;
    }
}
