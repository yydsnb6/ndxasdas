
import I18n from "./I18n"
import dayjs from "dayjs"

// //画线函数
export const fnLineChart = function (eleDots: any[]) {



    let speed = 50
    eleDots[0]!.style.background = "transparent"
    setTimeout(() => {
        eleDots[eleDots.length - 1]!.style.background = "transparent"
    }, speed * (eleDots.length - 1))

    eleDots.forEach((ele: any, index: number) => {
        const eleNext: any = eleDots[index + 1]
        if (!eleNext) {
            return
        }
        let eleLine: any = ele.querySelector('i')
        if (!eleLine) {
            eleLine = document.createElement('i')
            eleLine.className = 'line'
            ele.appendChild(eleLine)
        }
        // 记录坐标
        const boundThis = ele.getBoundingClientRect()
        // 下一个点的坐标
        const boundNext = eleNext.getBoundingClientRect()
        // 计算长度和旋转角度
        const x1 = boundThis.left,
            y1 = boundThis.top
        const x2 = boundNext.left,
            y2 = boundNext.top
        // 长度
        const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
        // 弧度
        const radius = Math.atan2(y2 - y1, x2 - x1)
        // 设置线条样式
        eleLine.style.transition = `width ${speed}ms`
        eleLine.style.width = '0px'
        // if (hashead) {
        //     eleLine.style.width = distance - boundThis.width + 'px'
        //     ele.style.background = "transparent"
        // } else {

        // }
        setTimeout(() => {
            eleLine.style.width = distance - boundThis.width + 'px'
            ele.style.background = "transparent"
        }, speed * index)
        eleLine.style.willChange = 'transform'
        eleLine.style.transform = `rotate(${radius}rad) translate(${boundThis.width / 2}px,0)`
        eleLine.style.position = 'absolute'
        eleLine.style.left = '50%'
        eleLine.style.top = '50%'
        eleLine.style.height = '1px'
        eleLine.style.boxSizing = 'border-box'
        eleLine.style.background = '#09A9B7'
        eleLine.style.transformOrigin = 'left center'
        eleLine.style.marginTop = '-1px'
        eleLine.style.pointerEvents = 'none'
        eleLine.style.zIndex = '-1'
    })
}
export const randomString = (e: number) => {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
        a = t.length,
        n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}
//大小
export const bigSmall = (val: number) => {
    if (val > 4) {
        return I18n.t('大')
    } else if (val <= 4) {
        return I18n.t('小')
    } else {
        return ''
    }
}
//大小2
export const bigSmall2 = (val: number) => {
    if (val > 5) {
        return I18n.t('大')
    } else if (val <= 5) {
        return I18n.t('小')
    } else {
        return ''
    }
}
//单双
export function isEvenOrOdd(number: number) {
    if (number % 2 === 0) {
        return I18n.t('双');
    } else if (number && number % 2 != 0) {
        return I18n.t('单');
    } else {
        return ""
    }
}
//龙虎
export const dt = (num1: number, num2: number) => {
    if (num1 > num2) {
        return I18n.t('龙')
    } else if (num1 < num2) {
        return I18n.t('虎')
    } else {
        return ""
    }
}


export const deepCopy = (source: any) => {
    const targetObj: any = Array.isArray(source) ? [] : {}; // 判断复制的目标是数组还是对象
    for (let keys in source) { // 遍历目标
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepCopy(source[keys]);
            } else { // 如果不是，就直接赋值
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}



// 获取最近7天
export const getCurrWeekDays = () => {

    let startTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')

    let endTime = dayjs().format('YYYY-MM-DD')
    // let startTime = window.moment().startOf('week').format('YYYY-MM-DD')
    // let endTime = window.moment().endOf('week').format('YYYY-MM-DD')
    return { startTime, endTime }
}

// 获取最近30天
export const getCurrMonthDays = () => {

    let startTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

    let endTime = dayjs().format('YYYY-MM-DD')
    return { startTime, endTime }
}


// 获取昨天的开始结束时间
export const getLastDays = () => {

    let startTime = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

    let endTime = dayjs().format('YYYY-MM-DD')
    return { startTime, endTime }
}

// 获取今天的开始结束时间
export const getDays = () => {

    let startTime = dayjs().format('YYYY-MM-DD')

    let endTime = dayjs().format('YYYY-MM-DD')
    return { startTime, endTime }
}


export const formatCustomChips = (amount: number) => {

    if (amount >= 1000) {
        let value = amount / 1000;
        let str = ""
        str = value % 1 === 0 ? `${value}k` : `${value.toFixed(3)}k`;
        return str.toString().replace("0k", "k")
    } else {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}



