import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Trash } from "react-bootstrap-icons";
import Ctx from "../context";
import { Heart, HeartFill, CarFront, Award } from "react-bootstrap-icons";

import Loader from "../components/Loader";
import Review from "../components/Review";
import ReviewModal from "../components/ReviewModal";

const Product = () => {
  const {
    userId,
    token,
    setServerGoods,
    setModalReviewActive,

    basket,
  } = useContext(Ctx);

  const [product, setProduct] = useState({});

  const [inBasket, setInBasket] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const makeReview = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setModalReviewActive(true);
  };

  useEffect(() => {
    setInBasket(basket.filter((el) => el.id === product?._id).length > 0);
  }, [product]);

  useEffect(() => {
    fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rockToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          console.log(data);
          setProduct(data);
        }
      });
  }, []);

  const del = () => {
    fetch(`https://api.react-learning.ru/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServerGoods((prev) => prev.filter((el) => el._id !== id));
        navigate("/catalog");
      });
  };

  return (
    <>
      (
      <div className="parent">
        {product.name ? (
          <>
            <div className="description">
              <div style={{ textAlign: "right" }}>
                {userId === product.author._id && (
                  <button style={{ justifySelf: "flex-left" }} onClick={del}>
                    <Trash />
                  </button>
                )}
              </div>
              <div className="part1">
                <div className="part2">
                  {" "}
                  <h1>{product.name}</h1>
                </div>
                <div className="part3">
                  {" "}
                  {product.likes.length === 1 ? <HeartFill /> : <Heart />}
                </div>
              </div>

              <div className="areas">
                <div className="area__img">
                  <img src={product.pictures} alt={product.name} height="500" />
                </div>

                <div className="area__price">
                  <div className="price__area">
                    <mark>{product.price}₽</mark>
                  </div>

                  <div className="basket__ball">
                    <div className="count_box">
                      <div className="minus">-</div>
                      <input className="inp_price" type="text" value="1" />
                      <div className="plus">+</div>
                    </div>

                    <div>
                      <button className="basket">В корзину</button>
                    </div>
                  </div>

                  <div className="promo1">
                    <div className="pic">
                      <CarFront />
                    </div>
                    <div className="promo__text">
                      <p>
                        <b>Доставка по всему Миру!</b>
                      </p>
                      <p>
                        Доставка курьером - <b>от 399 ₽</b>
                      </p>
                      <p>
                        Доставка в пункт выдачи - <b>от 199 ₽</b>
                      </p>
                    </div>
                  </div>

                  <div className="promo1">
                    <div className="pic">
                      <Award />
                    </div>
                    <div className="promo__text">
                      <b>Гарантия качества</b>
                      <p>
                        Если вам не понравилось качество нашей продукции, мы
                        вернем деньги, либо сделаем все возмонжое, чтобы
                        довлетворить ваши нужды
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Описание товара</h3>
              <p>{product.description}</p>
              <h3>Характеристики</h3>
              <p>Вес {product.wight}</p>
            </div>

            <div className="product__review">
              <h3>Отзывы</h3>

              <div>
                <button
                  className="product__add__review__btn"
                  onClick={makeReview}
                >
                  Добавить отзыв
                </button>
              </div>
              {product?.reviews[0] && (
                <>
                  {product?.reviews.map((el) => (
                    <Review
                      {...el}
                      key={el._id}
                      product_id={product._id}
                      product={product}
                    />
                  ))}
                </>
              )}

              {!product?.reviews[0] && (
                <>
                  <span>Отзывов пока нет, но вы можете написать новый</span>
                </>
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      );
      <ReviewModal />
    </>
  );
};

export default Product;
