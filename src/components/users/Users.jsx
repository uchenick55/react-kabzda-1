import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/no-image.jpg";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {
    let PagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= PagesCount; i++) {
        pages.push(i)
    }

    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return <div>
        <div>

            {slicedPages.map((p) => {
                return (
                    p === props.currentPage
                        ? <span className={classes.selected} onClick={() => {
                            props.onPageChanged(p)
                        }}>{p}</span>
                        : <span onClick={() => {
                            props.onPageChanged(p)
                        }}>{p}</span>
                )
            })}
        </div>
        {
            props.users.map((u) => {
                <div key={u.id}/>
                return (
                    <div>
                        <div>
                            <NavLink to={'/profile/'+u.id}>
                                <img className={classes.userPhoto}
                                     src={u.photos.small != null
                                         ? u.photos.small
                                         : userPhoto}/>
                            </NavLink>

                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {

                                    //  props.unfollow(u.id)

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
                                            }
                                        })
                                        .then((response) => {
                                            if (response.data.resultCode === 0) {
                                                axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${props.pageSize}&page=${props.currentPage}`,
                                                    {withCredentials: true})
                                                    .then((response) => {
                                                        props.setUsers(response.data.items)
                                                    })
                                            }
                                        })

                                }}> Unfollow</button>

                                : <button onClick={() => {

                                    //  props.follow(u.id)

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                        {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
                                            }
                                        })
                                        .then((response) => {
                                            if (response.data.resultCode === 0) {
                                                axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${props.pageSize}&page=${props.currentPage}`,
                                                    {withCredentials: true})
                                                    .then((response) => {
                                                        props.setUsers(response.data.items)
                                                    })
                                            }
                                        })
                                }}> Follow</button>}
                        </div>
                        <div>{u.name}</div>
                        <div>{u.id}</div>
                        <div>u.location.country</div>
                        <div>u.location.city</div>
                        <div>{u.status}</div>
                    </div>
                )
            })
        }
    </div>

}

export default Users