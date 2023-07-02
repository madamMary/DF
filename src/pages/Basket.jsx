import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarFront } from "react-bootstrap-icons";

import Ctx from "../context";
import "./css/basket.css";

const Basket = () => {
  const { basket, setBasket } = useContext(Ctx);
  const setPrice = ({ price, cnt, discount }) => {
    return price * cnt * (1 - discount / 100);
  };
  const sum = basket.reduce((acc, el) => {
    return acc + el.cnt * el.price;
  }, 0);
  const sale = basket.reduce((acc, el) => {
    return acc + el.cnt * el.price * (el.discount / 100);
  }, 0);

  const sum_cnt = basket.reduce((acc, el) => {
    return acc + el.cnt;
  }, 0);

  const inc = (id) => {
    setBasket((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.cnt++;
        }
        return el;
      })
    );
  };
  const dec = (id, cnt) => {
    if (cnt === 1) {
      setBasket((prev) => prev.filter((el) => el.id !== id));
    } else {
      setBasket((prev) =>
        prev.map((el) => {
          if (el.id === id) {
            el.cnt--;
          }
          return el;
        })
      );
    }
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <>
      <div className="basket__goods">
        <h5> {sum_cnt} товаров в корзине</h5>
      </div>

      {basket.length === 0 && (
        <>
          <div className="basket__empty">
            <p className="basket__inside">
              В корзине пусто. Добавьте товары, чтобы сделать заказ.
            </p>

            <div className="basket__catalog">
              <div className="basket__img">
                <img src="https://png.pngtree.com/png-vector/20230531/ourmid/pngtree-marvel-coloring-pages-cute-little-bear-vector-png-image_6771328.png"></img>
              </div>
              <Link to={`/catalog`}>
                <button className="basket__btn">Перейти в каталог</button>
              </Link>
            </div>
          </div>
        </>
      )}

      {basket.length > 0 && (
        <div className="basket__all">
          <table>
            <thead>
              <tr>
                <td>Изображение</td>
                <td>Название</td>
                <td>Количество</td>
                <td>Цена</td>
                <td>Скидка</td>
                <td>Цена со скидкой</td>
              </tr>
            </thead>
            <tbody>
              {basket.map((el) => (
                <tr key={el.id}>
                  <td>
                    <img src={el.img} alt={el.name} height="50" />
                  </td>
                  <td>
                    <Link to={`/product/${el.id}`}>{el.name}</Link>
                  </td>
                  <td>
                    <button
                      className="btn__basket"
                      onClick={() => dec(el.id, el.cnt)}
                    >
                      -
                    </button>
                    <span style={{ padding: "0 10px" }}>{el.cnt}</span>
                    <button className="btn__basket" onClick={() => inc(el.id)}>
                      +
                    </button>
                  </td>
                  <td>{el.price * el.cnt}&nbsp;₽</td>
                  <td>{el.discount > 0 && `${el.discount}%`}</td>
                  <td>
                    {el.discount > 0 && <>{setPrice(el).toFixed(2)}&nbsp;₽</>}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>

          <div className="basket__promo">
            <div className="basket__sum">
              <td colSpan={3}>Ваша корзина:</td>
              {/* Отобразить в корзине общую сумму товаров со скидкой и ту, что должна была быть без скидки */}
              <td colSpan={2} className="sum">
                <p>Товары ({sum_cnt})</p>
                {sum.toFixed(2)} ₽
              </td>
              <td colSpan={2} className="sum">
                Скидка<div className="sale">- {sale.toFixed(2)} ₽</div>
              </td>
              <td colSpan={2} className="sum">
                <p> Общая стоимость </p>
                {sum - sale} ₽
              </td>

              <button className="btn__end">Оформить заказ</button>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Basket;
