import "./style.css";
import Ctx from "../../context";
import { useContext } from "react";
import { StarFill, Star } from "react-bootstrap-icons";

const Review = ({ author, created_at, rating, text, product_id, _id }) => {
  const { userId, token, setProduct } = useContext(Ctx);

  const deleteReview = async (e) => {
    e.preventDefault();
    let res = await fetch(
      `https://api.react-learning.ru/products/review/${product_id}/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await res.json();
    setProduct(data);
    window.location.reload();
  };

  return (
    <>
      <div className="separate__review">
        <span className="separate__review__author__name">
          Автор: {author.name}
        </span>
        <br />
        <span>Дата создания: {created_at.substr(0, 10)}</span>
        <br />
        {rating >= 1 && rating <= 1 && (
          <>
            <span className="product__review__cnt">
              {" "}
              <StarFill />
            </span>{" "}
            <span className="product__review__grey">
              {" "}
              <Star /> <Star /> <Star /> <Star />
            </span>
          </>
        )}
        {rating >= 2 && rating <= 2 && (
          <>
            <span className="product__review__cnt">
              {" "}
              <StarFill /> <StarFill />
            </span>{" "}
            <span className="product__review__grey">
              {" "}
              <Star /> <Star /> <Star />{" "}
            </span>
          </>
        )}
        {rating >= 3 && rating <= 3 && (
          <>
            <span className="product__review__cnt">
              {" "}
              <StarFill /> <StarFill /> <StarFill />
            </span>{" "}
            <span className="product__review__grey">
              {" "}
              <Star /> <Star />
            </span>
          </>
        )}
        {rating >= 4 && rating <= 4 && (
          <>
            <span className="product__review__cnt">
              {" "}
              <StarFill /> <StarFill /> <StarFill /> <StarFill />{" "}
            </span>{" "}
            <span className="product__review__grey">
              {" "}
              <Star />{" "}
            </span>
          </>
        )}
        {rating >= 5 && rating <= 5 && (
          <>
            <span className="product__review__cnt">
              {" "}
              <StarFill /> <StarFill /> <StarFill /> <StarFill /> <StarFill />
            </span>
          </>
        )}
        {userId === author._id && (
          <>
            <button className="delete__review" onClick={deleteReview}>
              Удалить отзыв
            </button>
          </>
        )}
        <p>{text}</p>
      </div>
      <hr />
    </>
  );
};

export default Review;
