import Logo from "./Logo";
import { Facebook, Telegram, Twitter } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Ctx from "../../context";

const Footer = () => {
  const { user } = useContext(Ctx);

  return (
    <footer>
      <div className="footer__menu">
        <div className="footer__logo">
          <Logo />
          <div>©{new Date().getFullYear()}</div>
        </div>

        {user && (
          <div className="footer__logo">
            <Link to="/catalog">Каталог</Link>
            <Link to="/favorites">Избранное</Link>
            <Link to="/basket">Корзина</Link>
          </div>
        )}

        <div className="footer__about">
          <h5>О нас</h5>
          <p>Горячая линия: 8 (800) 888 88 88</p>
          <p>
            Мы в социальных сетях: <Facebook /> <Telegram /> <Twitter />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
