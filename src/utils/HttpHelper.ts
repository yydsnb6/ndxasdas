import { config } from "./config";

export default class HttpHelper {
    private static instance: HttpHelper;
    public static getInstance(): HttpHelper {
        if (!HttpHelper.instance) {
            HttpHelper.instance = new HttpHelper();
        }
        return HttpHelper.instance;
    }
    getMainHost() {
        if (process.env.NODE_ENV === 'development') { //开发环境
            // this.setNetCofing2(this.getMainDomain(config.testOrigin)) 
        } else {
            let origin = window.location.origin
            this.setNetCofing2(this.getMainDomain(origin))
        }
    }
    //设置域名参数加后缀
    setNetCofing(mainHost: string) {
        const ipRegex = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
        if (ipRegex.test(mainHost)) {
            console.log("用的是ip");
            // 是IP地址
            config.proBaseURL = mainHost + '/apis'
            // config.proWsUrl = mainHost
        } else {
            console.log("用的是域名");
            // 是域名地址
            config.proBaseURL = mainHost + '/apis'
            console.log(config.proBaseURL);
            // config.proWsUrl = mainHost

        }
    }
    //设置域名参数加前缀
    //设置域名参数加前缀
    setNetCofing2(mainHost: string) {
        const ipRegex = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
        if (ipRegex.test(mainHost)) {
            console.log("用的是ip");
            // 是IP地址
            let arr = mainHost.split("//")
            config.proBaseURL = arr[0] + '//apis.' + arr[1] + '/apis'
            config.devBaseURL = arr[0] + '//apis.' + arr[1] + '/apis'
            config.proWsUrl = (arr[0] + '//ws.' + arr[1]).replace('http', 'ws')
            config.devWsUrl = (arr[0] + '//ws.' + arr[1]).replace('http', 'ws')
        } else {
            console.log("用的是域名");
            // 是域名地址
            let arr = mainHost.split("//")
            config.proBaseURL = arr[0] + '//apis.' + arr[1] + '/apis'
            config.devBaseURL = arr[0] + '//apis.' + arr[1] + '/apis'
            config.proWsUrl = (arr[0] + '//ws.' + arr[1]).replace('http', 'ws')
            config.devWsUrl = (arr[0] + '//ws.' + arr[1]).replace('http', 'ws')
        }

        console.log(config.proBaseURL);
        console.log(config.devBaseURL);
        console.log(config.proWsUrl);
        console.log(config.devWsUrl);

    }


    getMainDomain(hostname: string) {
        const urlObj = new URL(hostname);
        return 'https://' + urlObj.hostname.split('.').slice(-2).join('.');
    }
}