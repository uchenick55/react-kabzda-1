
import "./tmp.scss"

let Tmp = () => {

    const dataItems = {
        name1: "item1",
        name2: "item2",
        name3: "item3",
        name4: "item4",
        name5: "item5"
    };

    const item = Object.keys(dataItems).map((item, i) => {
        let className1 = `${dataItems[item]}-${i}`;
        return (
            <div className={className1} key={i}>
                <div className="container">
                    {" "}
                    <p> {`${dataItems[item]}`} <b>{`- bold ${i+1}`}</b> </p>{/* в теге p завернут тег b - стилизуется миксином*/}

                </div>
            </div>
        );
    });
    const item2 = Object.keys(dataItems).map((item, i) => {
        return (
            <div key={i}>
                <div className="container2">
                    {" "}
                    <a href="#qqq"> Убираем подчеркивание стиля миксином</a> {/* в теге p завернут тег b - стилизуется миксином*/}

                </div>
            </div>
        );
    });
    return (<div>
            <div className='container1'>
                <p>123</p>
            </div>
            <span>{item}</span>
            {item2}
        </div>

    );
    return;
};
export default Tmp;
