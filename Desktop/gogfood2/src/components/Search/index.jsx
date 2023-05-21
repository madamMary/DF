import {useState, useEffect, useContext} from "react";
import Ctx from "../../context";

import "./style.css"

const Search = ({arr}) => {
    const {setGoods} = useContext(Ctx);
    const [text, setText] = useState("");
    const [quantity, setQuantity] = useState(arr.length);

    const [count, updateCount] = useState(0);
    useEffect(() => {
        if (text) {
            let result = arr.filter(el => new RegExp(text, "i").test(el.name))
            setGoods(result);
            setQuantity(result.length);  
        } else {
            setGoods(arr);
            setQuantity(arr.length)
        }
    }, [arr])
    let n = 1;
    const click = () => {
        console.log(n++);
        updateCount(count + 1);
    }

    const searchByText = (e) => {
        let val = e.target.value;
        setText(val);
        let result = arr.filter(el => new RegExp(val, "i").test(el.name))
        setGoods(result);
        setQuantity(result.length);
        console.log(result);

    }

    return (
        <div className="search-block">
            <input type="search" value={text} onChange={searchByText} className="search" placeholder="Жду тебя..." />
            <button onClick={click}>Гав</button>
            <hr />
            <div>По вашему запросу «{text}» найдено {quantity} подходящих товаров</div>

        </div>
    )
}

export default Search;