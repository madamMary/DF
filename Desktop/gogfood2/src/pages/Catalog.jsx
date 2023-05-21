import Card from "../components/Card";
import {useState, useContext} from "react";
import Ctx from "../context";

const Catalog = ({setServerGoods}) => {
    const {goods} = useContext(Ctx);
    const [sort, setSort] = useState(null);
    const filterSt = {
        gridColumnEnd: "span 4",
        display: "flex",
        gap: "20px"
    }
    const sortHandler = (vector) => {
        if (vector ===sort) {
            setSort(null)
            goods.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else {
            setSort(vector)
            goods.sort((a, b) => {
                return vector === "up" ? (a.price - b.price) :
                (b.price - a.price)
            })
        }
    }
    return <div className="container">
        <div style={filterSt}>
            <button style={{backgroundColor: sort === "up" ? "orange" : "white"}} onClick={() => sortHandler("up")}>По возрастанию цены</button>
            <button style={{backgroundColor: sort === "down" ? "orange" : "white"}} onClick={() => sortHandler("down")}>По убыванию</button>
            <button>Новинки</button>
            <button>Скидки</button>
        </div>
    {goods.map(g => <Card key={g._id} {...g} img={g.pictures} setServerGoods={setServerGoods}/>)}
    </div>
}

export default Catalog;