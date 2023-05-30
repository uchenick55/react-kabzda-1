import React from 'react';
import {connect} from "react-redux";
import {postFeedBackThunkCreator2,FeedBackActions} from "../../redux/feedback-reducer";
import FeedBack from "./FeedBackBS";
import {GlobalStateType} from "../../redux/store-redux";
import {apiFeedBackDataType} from "../../types/commonTypes";

const {setFeedBackStatus} = FeedBackActions

const FeedBackContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {postFeedBackThunkCreator2, feedBackStatus, setFeedBackStatus}) => {

    const sendFeedBack = (data:apiFeedBackDataType) => {
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
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {


    postFeedBackThunkCreator2: (data:apiFeedBackDataType) =>void
    setFeedBackStatus:(feedBackStatus:string)=>void
}

export default connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType
    >(mapStateToProps,
    {postFeedBackThunkCreator2, setFeedBackStatus})(FeedBackContainer);
