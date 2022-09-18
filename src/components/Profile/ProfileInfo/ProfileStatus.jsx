import React from "react";

class ProfileStatus extends React.Component {
    localStatus = {
        modifyStatus: false
    }
    checkIfICanModifyStatus = () => {
        if (this.props.userId===this.props.myId) {
            this.localStatus.modifyStatus=true;
            this.setState({modifyStatus: true})
        }
    }

    setMyStatus = () => {
        this.localStatus.modifyStatus = false
        this.setState({modifyStatus: false})

    }
    render () {
        return (
            <div>
                {!this.localStatus.modifyStatus
                ?<span onDoubleClick={this.checkIfICanModifyStatus}>Статус: {!this.props.status? "нет" :this.props.status }</span>
                :<span onDoubleClick={this.setMyStatus}><input value={this.props.status} autoFocus={true} placeholder={"задайте статус"}/></span>
                }
            </div>
        )
    }
}

export default ProfileStatus