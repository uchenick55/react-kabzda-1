import React from 'react';
import {connect} from "react-redux";
import {postFeedBackThunkCreator2,feedBackActions} from "../../redux/feedback-reducer";
import FeedBack from "./FeedBackBS";
import {GlobalStateType} from "../../redux/store-redux";
import {ApiFeedBackDataType} from "../common/types/commonTypes";

const {setFeedBackStatus} = feedBackActions

const FeedBackContainer:React.FC<MapStateToPropsType & MapDispatchToPropsType> = (
    {postFeedBackThunkCreator2, feedBackStatus, setFeedBackStatus}) => {

    const sendFeedBack = (data:ApiFeedBackDataType) => {
        postFeedBackThunkCreator2(data)// отправка фидбека из api
    }

    return <div>
        <FeedBack
            sendFeedBack={sendFeedBack} // колбек отправки сообщения из контейнера
            feedBackStatus={feedBackStatus} // фидбэк статус из BLL
            setFeedBackStatus={setFeedBackStatus} // задать статус (обнулить для отправки нового сообщения)
        />
    </div>
}

const mapStateToProps = (state:GlobalStateType) => {
    return {
        feedBackStatus: state.feedback.feedBackStatus // статус отправки сообщения на сервер
    }
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {


    postFeedBackThunkCreator2: (data:ApiFeedBackDataType) =>void
    setFeedBackStatus:(feedBackStatus:string)=>void
}

export default connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps,
    {postFeedBackThunkCreator2, setFeedBackStatus})(FeedBackContainer);
