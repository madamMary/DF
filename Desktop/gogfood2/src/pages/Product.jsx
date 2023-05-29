import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Trash } from "react-bootstrap-icons";
import Ctx from "../context";

import Loader from "../components/Loader";

const Product = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, userId, setServerGoods } = useContext(Ctx);

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("rockToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                }
            })
    }, []);

    const del = () => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setServerGoods(prev => prev.filter(el => el._id !== id))
                navigate("/catalog")
            })
    }

    return <>
        {product.name
            ? <div className="description">
                {userId === product.author._id && <button style={{ justifySelf: "flex-end" }} onClick={del}><Trash /></button>}
                <h1>{product.name}</h1>
                <img src={product.pictures} alt={product.name} height="200" />

                <h3>Описание товара</h3>
                <p>{product.description}</p>
                <h3>Характеристики</h3>
                <p>Вес {product.wight}</p>
                <mark>Цена {product.price}₽</mark>
                <div class='count_box'>
                    <div class="minus">-</div>
                    <input class='inp_price' type="text" value="1" />
                    <div class="plus">+</div>
                </div>
                <button className="card__btn">В корзину</button>
            </div>


            : <Loader />
        }
    </>
}

export default Product;