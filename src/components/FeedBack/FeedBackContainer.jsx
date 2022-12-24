import React from 'react';
import {connect} from "react-redux";
import {postFeedBackThunkCreator2, setFeedBackStatus} from "../../redux/feedback-reducer";
import FeedBack from "./FeedBack";

class FeedBackContainer extends React.Component {

    sendFeedBack = (data) => {
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

let mapStateToProps = (state) => {
    return {
        feedBackStatus: state.feedback.feedBackStatus // статус отправки сообщения на сервер
    }
}

export default connect(mapStateToProps,
    {postFeedBackThunkCreator2, setFeedBackStatus})(FeedBackContainer);
