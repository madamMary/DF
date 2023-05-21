import "./style.css";
import { CaretRight } from "react-bootstrap-icons";

const Main = () => {
    return <>
        <div className="banner">
            <div className="text__banner"><h1>Крафтовые лакомства для собак</h1></div>
            <div className="text__banner"><p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                <button className="btn__banner">Каталог <CaretRight /></button></div>
        </div>

        <div className="white__body">
            <div className="advertising">
                <div className="boxes">
                    <div className="img">
                        <img src="https://i.yapx.cc/WCiXE.png" />
                    </div>
                    <div className="boxes12">
                        <div className="img1">

                        </div>
                        <div className="img2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Main;