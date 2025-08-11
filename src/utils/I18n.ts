import { zh } from "../i18n/zh";
import { en } from "../i18n/en";
import { vi } from "../i18n/vi";
import { zhF } from "../i18n/zhF";
import { ms } from "../i18n/ms";
import { pt } from "../i18n/pt";
import { ko } from "../i18n/ko";
import { km } from "../i18n/km";
import { th } from "../i18n/th";
import LocalUtil from "./LocalUtil";
import i18next from "i18next";
import bus from "./bus";
import { Locale } from 'vant';
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';
import ptBR from 'vant/es/locale/lang/pt-BR';
import viVN from 'vant/es/locale/lang/vi-VN';
// import api from "../api/api";


export default class I18n {
    static init() {
         let lang = LocalUtil.stringForKey("lang", this.getLoaclLang())
        i18next.init({
            lng: lang, // if you're using a language detector, do not define the lng option
            debug: false,
            resources: {
                zh,
                en,
                vi,
                zhF,
                ms,
                pt,
                ko,
                km,
                th,
            }
        });
        this.initVant()
        // this.getServiceLang()
    }


    static initVant() {
        let lang = LocalUtil.stringForKey('lang', this.getLoaclLang())
        switch (lang) {
            case 'en':
                Locale.use('en-US', enUS);
                break;
            case 'zh':
                Locale.use('zh-CN', zhCN);
                break;
            case 'pt':
                Locale.use('pt-BR', ptBR);
                break;
            case 'vi':
                Locale.use('vi-VN', viVN);
                break;
            default:
                Locale.use('en-US', enUS);
                break;
        }

    }

    static getServiceLang() {
        // let lang = LocalUtil.stringForKey('lang', this.getLoaclLang())
        // api.getLanguageDict(lang).then((res) => {
        //     i18next.addResourceBundle(lang, 'translation', res.data);

        // })
    }

    static t(key: string) {
        return i18next.t(key)
    }

    /**
     * 转换成系统所属的语言
     * @returns
     */
    static getLoaclLang() {
        return "zh"

        // @ts-ignore
        let userLanguage = navigator.language || navigator.userLanguage;
        //中文 zh 繁体zhF vi 越南  zh-TW 繁体 ms 马来 en 英语 pt-BR 巴西  ko 韩语 km 柬埔寨 th 泰国
        if (userLanguage.includes("zh")) {
            return "zh"
        } else if (userLanguage.includes("en")) {
            return "en"
        } else if (userLanguage.includes("vi")) {
            return "vi"
        } else if (userLanguage.includes("zh-TW")) {
            return "zhF"
        } else if (userLanguage.includes("ms")) {
            return "ms"
        } else if (userLanguage.includes("pt")) {
            return "pt"
        } else if (userLanguage.includes("ko")) {
            return "ko"
        } else if (userLanguage.includes("km")) {
            return "km"
        } else if (userLanguage.includes("th")) {
            return "th"
        } else {
            return "en"
        }
    }


    static changeLang(lang: string) {
        // @ts-ignore
        i18next.changeLanguage(lang)
        LocalUtil.setString(lang, 'lang')
       this.getServiceLang()
       this.initVant()
        bus.emit('changeLanguage', {})
    }
}
