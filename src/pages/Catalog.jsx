import { useState, useContext, useEffect } from "react";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

import Ctx from "../context";

const Catalog = ({ setServerGoods }) => {
  const { goods, text, setText, setGoods } = useContext(Ctx);
  const [quantity, setQuantity] = useState(setServerGoods.length);
  const paginate = usePagination(goods, 20);
  const [sort, setSort] = useState(null);
  const [count, updateCount] = useState(0);

  const filterSt = {
    gridColumnEnd: "span 4",
    display: "flex",
    gap: "20px",
  };

  useEffect(() => {
    if (text) {
      let result = setServerGoods.filter((el) =>
        new RegExp(text, "i").test(el.name)
      );
      setGoods(result);
      setQuantity(result.length);
    } else {
      setGoods(setServerGoods);
      setQuantity(setServerGoods.length);
    }
  }, [setServerGoods]);
  let n = 1;
  const click = () => {
    console.log(n++);
    updateCount(count + 1);
  };

  const searchByText = (e) => {
    let val = e.target.value;
    setText(val);
    let result = setServerGoods.filter((el) =>
      new RegExp(val, "i").test(el.name)
    );
    setGoods(result);
    setQuantity(result.length);
    console.log(result);
  };

  useEffect(() => {
    paginate.step(1);
  }, [text]);

  const sortHandler = (vector) => {
    if (vector === sort) {
      setSort(null);
      goods.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else {
      setSort(vector);
      goods.sort((a, b) => {
        return vector === "up" ? a.price - b.price : b.price - a.price;
      });
    }
  };
  return (
    <div className="container">
      <div>
        По вашему запросу «{text}» найдено {quantity} подходящих товаров
      </div>
      <div style={{ gridColumnEnd: "span 4" }}>
        <Pagination hk={paginate} />
      </div>
      <div style={filterSt}>
        <button
          style={{ backgroundColor: sort === "up" ? "orange" : "white" }}
          onClick={() => sortHandler("up")}
        >
          По возрастанию цены
        </button>
        <button
          style={{ backgroundColor: sort === "down" ? "orange" : "white" }}
          onClick={() => sortHandler("down")}
        >
          По убыванию
        </button>
        <button>Новинки</button>
        <button>Скидки</button>
      </div>
      {paginate.setDataPerPage().map((g) => (
        <Card
          key={g._id}
          {...g}
          img={g.pictures}
          setServerGoods={setServerGoods}
        />
      ))}
    </div>
  );
};

export default Catalog;
