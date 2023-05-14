export type DataReturn2Type = {
    "Year": string,
    "Month": string,
    "Day": string,
    "Hour": string,
    "Minutes": string,
    "Seconds": string,
    isToday: boolean
};
type GetDateType = (customDate:string) => DataReturn2Type

const GetDate:GetDateType= (customDate) => {
    let Data = new Date( !customDate? 0: new Date(customDate).getTime() + 3*3600*1000)

    const isToday: boolean = !!customDate && // этот день сегодня?
        new Date().getFullYear() ===  Data.getFullYear() &&
        new Date().getMonth() === Data.getMonth() &&
        new Date().getDate() === Data.getDate()

    const Year =("0" + Data.getFullYear()).substr(-4) ;
    const Month =  Data.getMonth();
    const Day = ("0" +  Data.getDate()).substr(-2);
    const Hour = ("0" + Data.getHours()).substr(-2);
    const Minutes = ("0" + Data.getMinutes()).substr(-2) ;
    const Seconds = ("0" + Data.getSeconds()).substr(-2);
    let fMonth;

    switch (Month)
    {
        case 0: fMonth="янв."; break;
        case 1: fMonth="фев."; break;
        case 2: fMonth="мар."; break;
        case 3: fMonth="апр."; break;
        case 4: fMonth="мая"; break;
        case 5: fMonth="июн."; break;
        case 6: fMonth="июл."; break;
        case 7: fMonth="авг."; break;
        case 8: fMonth="сен."; break;
        case 9: fMonth="окт."; break;
        case 10: fMonth="ноя."; break;
        case 11: fMonth="дек."; break;
        default: fMonth=""; break;
    }
    return {
        "Year": Year,
        "Month": fMonth,
        "Day": Day,
        "Hour": Hour,
        "Minutes": Minutes,
        "Seconds": Seconds,
        isToday: isToday
    }
}
export default GetDate
