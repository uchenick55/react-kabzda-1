import React from "react";

type FeedBackInfoShortType = {}
const FeedBackInfoShort:React.FC<FeedBackInfoShortType> = () => {
    return (<div>
        <p>Проверить отправку почты можно на тестовом почтовом ящике {" "}
            <a href="https://passport.yandex.ru/auth/">яндекс почты</a>: <br/>
            testfeedback2023 <br/>
            testfeedback2023_password <br/>
        </p>
    </div>)
}

export default FeedBackInfoShort
