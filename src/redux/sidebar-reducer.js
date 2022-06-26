let initialState = {
    myFriends: [
        {
            id: 1,
            name: "Artem",
            avaSrc: "https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"
        },
        {
            id: 3,
            name: "Danil",
            avaSrc: "https://pixelbox.ru/wp-content/uploads/2020/11/ava-maincraft-youtube-76.jpg"
        },
        {
            id: 4,
            name: "Natasha",
            avaSrc: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg"
        },
    ]
}
const sidebarReducer = (state = initialState, action) => {
    return state;
}
export default sidebarReducer;