import React from "react";
import classes from "./Tasks.module.css"
import commonClasses from "../common/CommonClasses/common.module.css";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import {useSelector} from "react-redux";
import {tasksDataType} from "../common/types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";
import Accordion from "react-bootstrap/Accordion";
import {Row} from "react-bootstrap";

type TasksCommon2Type = {
    TaskHeader: JSX.Element | string, // заголовок задачи
    imgSrc: string, // источник картинки
    taskLink: string, // ссылка на задачу
    altTitle: string, // альтернатива картинке
    description: JSX.Element[], // описание задачи
    repositoryHref: string // ссылка на репозиторий
    usedTech: string // список использованных технологий
}
const TasksCommon2: React.FC<TasksCommon2Type> = (
    {TaskHeader, imgSrc, altTitle, description, repositoryHref, taskLink, usedTech}) => {
    return <div>

        <div className={commonClasses.toCenter}><h5 className={classes.taskHeader} >{TaskHeader}</h5></div>
        <div><a href={taskLink}>
            <Image fluid={true} className={classes.imgTasks} src={imgSrc}
                   alt={altTitle} title={altTitle}
            /></a>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Задание для работы</Accordion.Header>
                    <Accordion.Body>

                        {description.map( (d, index) => {
                                return <div key={index}>{d}</div>
                            }
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        <div>
            <h6 className='mt-3'>Stack:</h6>
            <div>{usedTech}</div>
            <div><a href={taskLink}>Ссылка на работу</a></div>
            <div><a href={repositoryHref}>Репозиторий</a></div>
        </div>
    </div>
}

const Tasks: React.FC = () => {
    // получаем данные из стейта вместо mapStateToProps
    const tasksData1: Array<tasksDataType> = useSelector( (state: GlobalStateType) => state.tasks.tasksData )

    const tasksRender = <Container > {/* className={classes.TasksContainer}*/}
        <h3 className={commonClasses.pageHeader}>Tasks</h3>
        <h5 className='d-flex justify-content-center'>Здесь собраны небольшие работы, не касающиеся социальной сети</h5>
            <Row lg={3} md={2} >

                {tasksData1.map( (t, index) => { // проходим каждый элемент в исходном массиве
                    return <TasksCommon2
                        key={index} TaskHeader={t.TaskHeader} imgSrc={t.imgSrc} altTitle={t.altTitle}
                        description={t.description} repositoryHref={t.repositoryHref} taskLink={t.taskLink}
                        usedTech={t.usedTech}
                    />
                } )}
            </Row>

    </Container>

    return <div>
        {tasksRender} {/*отрисовка FriendList*/}
    </div>
}

export default Tasks

