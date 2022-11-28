import {UsersContainer} from "./UsersContainer";
// эта компонента нужна только для того чтобы заработал lazy импорт,
// который работает не с именного импорта, а только с импорта по умолчанию
const ExportDefaultUsersContainer = () => {
    return <UsersContainer/>
}
export default ExportDefaultUsersContainer
