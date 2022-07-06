import React from "react";
import classes from './Users.module.css'

let usersLocal = [
        {id: 1, followed: false, photoURL: "https://argumenti.ru/images/arhnews/583926.jpg",
            fullName: "Dmitriy", status: "I am a boss",
            location: {city: "Minsk", country: "Belarus"}},
        {id: 2, followed: true, photoURL: "https://avatars.mds.yandex.net/i?id=a521e233e0e52a0940e25eee8428ae7d-5876581-images-thumbs&n=13",
            fullName: "Sasha", status: "I am a boss too",
            location: {city: "Moscow", country: "Russia"}},
        {id: 3, followed: false, photoURL: "https://www.kleo.ru/img/articles/1504281645_14369_1503905234.jpg",
            fullName: "Andrew", status: "I am a boss three",
            location: {city: "Kiev", country: "Ukraine"}},
    ]

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers(usersLocal)
    }
    return (
        props.users.map((u) => {
            <div key={u.id}/>
            return (
                <div className={classes.users}>
                    <div><img src={u.photoURL}/></div>
                    <div>
                        {u.followed
                            ? <button onClick={()=> { props.unfollow(u.id) }}> Unfollow</button>
                            : <button onClick={()=> { props.follow(u.id)   }}> Follow</button> }
                    </div>
                    <div>{u.fullName}</div>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                    <div>{u.status}</div>
                </div>
            )
        })
    )
}

export default Users


