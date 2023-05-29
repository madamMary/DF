import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Folder2, Star, Cart4, PersonSquare, BoxArrowInRight, SearchHeart, PlusSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ user, setModalActive, serverGoods }) => {
    const navigate = useNavigate();
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)
    }, [serverGoods]);

    const logIn = (e) => {
        e.preventDefault();
        // setUser("rockUser");
        // localStorage.setItem("rockUser", "rockStar");
        setModalActive(true);
        navigate("/profile");
    }

    return <header>
        <Logo />

        <div className="d7">
            <form><input type="text" placeholder="Поиск" /></form>
        </div>
        <nav className="header__menu">
            {user && <>
            <Link to="/add" title="Добавить товар" className="badge-el"> 
            <PlusSquare />
            </Link>
                <Link to="/catalog" title="Каталог">
                    <Folder2 />
                </Link>
                <Link to="/favorites" title="Избранное" className="badge-el">
                    <Star />
                    <span className="badge-item">{likeCnt}</span>
                </Link>
                <Link to="/" title="Корзина" className="badge-el">
                    <Cart4 />
                    <span className="badge-item">{cartCnt}</span>
                </Link>
                <Link to="/profile" title="Профиль">
                    <PersonSquare />
                </Link>
            </>}
            {!user && <a href="" onClick={logIn} title="Войти">
                <BoxArrowInRight />
            </a>}
        </nav>
    </header>
}

export default Header;