import "./style.css";
import { Link } from "react-router-dom";
import { CaretRight, BoxArrowInRight } from "react-bootstrap-icons";
import { useContext } from "react";
// import News from "../components/News";
import Ctx from "../context";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { user, setModalActive } = useContext(Ctx);
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    setModalActive(true);
    navigate("/profile");
  };

  return (
    <>
      <div className="banner">
        <div className="text__banner">
          <h1>Крафтовые лакомства для собак</h1>
        </div>
        <div className="text__banner">
          <p>
            Всегда свежие лакомства ручной работы с доставкой по России и Миру
          </p>
          {user && (
            <Link to="/catalog" title="Каталог">
              <button className="btn__banner">
                Каталог <CaretRight />
              </button>
            </Link>
          )}

          {!user && (
            <a href="" onClick={logIn} title="Войти">
              Для просмотра каталога - авторизуйтесь&nbsp;
              <BoxArrowInRight />
            </a>
          )}
        </div>
      </div>

      <div className="white__body">
        <div className="advertising">
          <div className="boxes">
            <div className="img">
              <img src="https://i.yapx.cc/WCiXE.png" />
            </div>
            <div className="boxes12">
              <div className="img1"></div>
              <div className="img2"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <News /> */}
    </>
  );
};

export default Main;
