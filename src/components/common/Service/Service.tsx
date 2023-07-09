import React from "react";
import GetPageWidth from "./GetPageWidth";
import GetUrlPatch from "./GetUrlPatch";
import IsFetchingPreloader from "./IsFetchingPreloader";
import NotifyToastContainer from "./NotifyToast/NotifyToastContainer";

const Service: React.FC = ( () => {
   // console.log( "Service" )

    return <div>
        <GetPageWidth/>{/* получить ширину страницы */}
        <GetUrlPatch/>{/* получить путь из URL */}
        <IsFetchingPreloader/>{/* индикация загрузки */}
        <NotifyToastContainer/>{/* вывод уведомлений */}
    </div>
} )
export default Service
