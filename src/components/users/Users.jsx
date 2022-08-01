import React from "react";
import classes from './Users.module.css'
import * as axios from 'axios'
import userPhoto from './../../assets/images/no-image.jpg'

class Users extends React.Component {
    constructor(props2) {
        super(props2);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users`)
            .then((response) => {
                this.props.setUsers(response.data.items)
            })
    }
    render() {
        return <div>
            {
                this.props.users.map((u) => {
                    <div key={u.id}/>
                    return (
                        <div>
                            <div><img className={classes.userPhoto}
                                      src={u.photos.small != null
                                          ? u.photos.small
                                          : userPhoto}/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        this.props.unfollow(u.id)
                                    }}> Unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(u.id)
                                    }}> Follow</button>}
                            </div>
                            <div>{u.name}</div>
                            <div>u.location.country</div>
                            <div>u.location.city</div>
                            <div>{u.status}</div>
                        </div>
                    )
                })
            }
        </div>

    }

}

export default Users


