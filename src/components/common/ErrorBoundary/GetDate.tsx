type DataReturn2Type = {
    "Year": number,
    "Month": string,
    "Day": number,
    "Hour": number,
    "Minutes": number,
    "Seconds": number
};
type GetDateType = () => DataReturn2Type

const GetDate:GetDateType= () => {
    const Data = new Date();
    const Year = Data.getFullYear();
    const Month = Data.getMonth();
    const Day = Data.getDate();
    const Hour = Data.getHours();
    const Minutes = Data.getMinutes();
    const Seconds = Data.getSeconds();
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
        "Seconds": Seconds
    }
}
export default GetDate
