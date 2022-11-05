import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";
const ADD_POST = "myApp/profile-reducer/ADD-POST";// константа отправки новых постов

let initialState = {
  posts: [// заглушка постов на странице профиля
    {id: 1, message: "state 2 Hi, how are you?", like: "12"},
    {id: 2, message: "state 2 it's, my first post", like: "15"},
    {id: 3, message: "state 2 Какая погода на улице?", like: "1"},
  ],
  profile: null, // нулевой профиль просматриваемого пользователя по умолчанию
  status: null, // нулевой статус просматриваемого пользователя по умолчанию
}

it("posts.length after ADD POST is correct", ()=>{
  const action = addPostActionCreator("123")
  let ADD_POST_testResult = profileReducer(initialState, action )
  expect(ADD_POST_testResult.posts.length).toBe(4)
})

it("Text message after ADD POST is correct", ()=>{
  const action = addPostActionCreator("123")
  let ADD_POST_testResult = profileReducer(initialState, action )
  expect(ADD_POST_testResult.posts[3].message).toBe("123")
})

it("posts.length after Delete POST is correct", ()=>{
  const action = deletePostActionCreator(1)
  let Delete_POST_testResult = profileReducer(initialState, action )
  expect(Delete_POST_testResult.posts.length).toBe(2)
})

