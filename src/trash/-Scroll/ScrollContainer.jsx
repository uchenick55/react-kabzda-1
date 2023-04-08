import React from 'react';
import Scroll from "react-scroll";
import {PointerCursor} from "../../components/-Dark_light_theme/-globalStyles";
import classes from './scroll.module.css' // css обработка


let ScrollContainer = ({child, height, firstInsideContainer, secondInsideContainer, containerElement}) => {
    let Link = Scroll.Link;
    let Element = Scroll.Element;

    return (<div >
        <div className={classes.scrollCommon}>
            <Element
                id={containerElement} // ID контейнера с прокруткой
                style={{
                    height: height, // высота контейнера с прокруткой
                    overflow: "scroll", // тип контейнера - прокрутка
                    marginBottom: "0px" // нижний оступ
                }}
            >
                <Element name={firstInsideContainer}></Element> {/*якорь для прокрутки вверх внутри скрола*/}

                {child} {/* отрисовка элементов из пропсов*/}

                <Element name={secondInsideContainer}></Element>{/*якорь для прокрутки вниз внутри скрола*/}
            </Element>
        </div>
        <PointerCursor> {/*придание курсору над ссылками вида руки*/}
            <Link to={firstInsideContainer} smooth duration={250}
                  containerId={containerElement}>
                <img src={"https://www.shareicon.net/data/2015/08/24/89993_f139_384x512.png"} className={classes.arrows} alt={"-Scroll UP"}/>
            </Link>
            <Link to={secondInsideContainer} smooth duration={250}
                  containerId={containerElement}>
                <img src={"https://www.iconninja.com/files/495/296/59/f13a-icon.png"} className={classes.arrows} alt={"-Scroll Down"}/>
            </Link>
        </PointerCursor>
    </div>)
}

export default ScrollContainer

