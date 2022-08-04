import React from "react";
import classes from './Users.module.css'
import * as axios from 'axios'
import userPhoto from './../../assets/images/no-image.jpg'

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then((response) => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }
    onPageChanged = (setPage) => {
        this.props.setCurrentPage(setPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then((response) => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let PagesCount = Math.ceil(this.props.totalUsersCount/this.props.pageSize)
        let pages = [];
        for (let i = 1; i <= PagesCount; i++) {
            pages.push(i)
        }
        return <div>
            <div>
                {pages.map((p) => {
                    return (
                        p===this.props.currentPage
                            ?<span className={classes.selected} onClick={()=>{this.onPageChanged(p)}}>{p}</span>
                            :<span onClick={()=>{this.onPageChanged(p)}}>{p}</span>
                    )
                })}
            </div>
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


