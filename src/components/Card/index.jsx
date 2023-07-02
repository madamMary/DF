import { useState, useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Percent } from "react-bootstrap-icons";
import Ctx from "../../context";

const Card = ({ img, name, price, _id, discount, likes }) => {
  const { setServerGoods, userId, api, setBasket, basket } = useContext(Ctx);
  // проверка, есть ли id пользователя в массиве с лайками товара
  const [isLike, setIsLike] = useState(likes.includes(userId));
  const [inBasket, setInBasket] = useState(
    basket.filter((el) => el.id === _id).length > 0
  );

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInBasket(true);
    setBasket((prev) => [
      ...prev,
      {
        id: _id,
        cnt: 1,
        name: name,
        img: img,
        price: price,
        discount: discount,
      },
    ]);
  };

  const updLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLike(!isLike);
    api.setLike(_id, !isLike).then((data) => {
      console.log(data);
      setServerGoods(function (old) {
        console.log(old);
        const arr = old.map((el) => {
          if (el._id === _id) {
            return data;
          } else {
            return el;
          }
        });
        return arr;
      });
    });
  };

  return (
    <Link className="card" to={`/product/${_id}`}>
      {discount > 0 && (
        <span className="card__discount">
          -{discount}
          <Percent />{" "}
        </span>
      )}
      <span className="card__like" onClick={updLike}>
        {isLike ? <HeartFill /> : <Heart />}
      </span>
      <span className="card__img2" style={{ backgroundImage: `url(${img})` }} />
      <span className="card__name">{name}</span>
      <span className="card__price">
        {discount > 0 ? (
          <>
            <del>{price}</del>
            &nbsp;
            {(price * (100 - discount)) / 100}
          </>
        ) : (
          price
        )}
        &nbsp;₽
      </span>
      {inBasket && (
        <button
          className="card__btn__closed"
          onClick={addToCart}
          disabled={inBasket}
        >
          Уже в корзине
        </button>
      )}
      {!inBasket && (
        <button className="card__btn" onClick={addToCart} disabled={inBasket}>
          В корзину
        </button>
      )}
    </Link>
  );
};

export default Card;
