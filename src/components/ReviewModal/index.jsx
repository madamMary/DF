import { useState } from "react";
import "./style.css";
import { useContext } from "react";
import Ctx from "../../context";

import { useParams } from "react-router-dom";

const ReviewModal = () => {
  const {
    setModalReviewActive,
    modalReviewActive,
    token,
    product,
    setProduct,
  } = useContext(Ctx);

  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState("");

  const { id } = useParams();

  const sendReview = async (e) => {
    e.preventDefault();
    let body = {
      text: reviewText,
      rating: reviewStars,
    };
    let res = await fetch(
      `https://api.react-learning.ru/products/review/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();
    setModalReviewActive(false);
    setProduct(data);
    window.location.reload();
  };

  return (
    <div
      className="modal__review__wrapper"
      style={{ display: modalReviewActive ? "flex" : "none" }}
    >
      <div className="new__modal">
        <button
          className="close__btn"
          onClick={() => setModalReviewActive(false)}
        >
          Закрыть окно
        </button>
        <h3>Отзыв на товар </h3>
        <span>{product.name}</span>
        <hr />

        <form onSubmit={sendReview}>
          <label>
            Текст отзыва
            <input
              type="text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </label>

          <label>
            Оценка
            <input
              type="number"
              min="1"
              max="5"
              value={reviewStars}
              onChange={(e) => setReviewStars(e.target.value)}
            />
          </label>

          <button onClick={sendReview} type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
