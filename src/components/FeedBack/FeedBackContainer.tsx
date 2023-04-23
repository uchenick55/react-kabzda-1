import React from 'react';
import {connect} from "react-redux";
import {postFeedBackThunkCreator2, setFeedBackStatus} from "../../redux/feedback-reducer";
import FeedBack from "./FeedBackBS";
import {GlobalStateType} from "../../redux/store-redux";
import {apiFeedBackDataType} from "../../types/commonTypes";

type FeedBackContainerPropsType = {
    feedBackStatus: string
    postFeedBackThunkCreator2: (data:apiFeedBackDataType) =>void
    setFeedBackStatus:(feedBackStatus:string)=>void
}
class FeedBackContainer extends React.Component<FeedBackContainerPropsType> {

    sendFeedBack = (data:apiFeedBackDataType) => {
        this.props.postFeedBackThunkCreator2(data)// отправка фидбека из api
    }

    render () {
        return <div>
            <FeedBack
                sendFeedBack={this.sendFeedBack} // колбек отправки сообщения из контейнера
                feedBackStatus={this.props.feedBackStatus} // фидбэк статус из BLL
                setFeedBackStatus={this.props.setFeedBackStatus} // задать статус (обнулить для отправки нового сообщения)
            />
        </div>
    }
}

type mapStateToPropsType = {
    feedBackStatus: string
}
const mapStateToProps = (state:GlobalStateType) => {
    return {
        feedBackStatus: state.feedback.feedBackStatus // статус отправки сообщения на сервер
    }
}
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
