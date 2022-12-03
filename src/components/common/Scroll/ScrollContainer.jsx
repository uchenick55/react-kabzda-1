import React from 'react';
import Scroll, {animateScroll as scroll} from "react-scroll";
import {PointerCursor} from "../../Dark_light_theme/globalStyles";
import classes from './scroll.module.css' // css обработка


let ScrollContainer = ({child, height, firstInsideContainer, secondInsideContainer, containerElement}) => {
    let Link = Scroll.Link;
    let Element = Scroll.Element;

    return (<div className={classes.scrollCommon}>
        <div>
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
            <Link to={firstInsideContainer} smooth={true} duration={250}
                  containerId={containerElement}>
                Scroll UP {/*ссылка для прокрутки вверх*/}
            </Link>
            <Link to={secondInsideContainer} smooth={true} duration={250}
                  containerId={containerElement}>
                Scroll Down {/*ссылка для прокрутки вниз*/}
            </Link>
        </PointerCursor>
    </div>)
}

export default ScrollContainer

