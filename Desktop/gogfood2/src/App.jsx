import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./context";

import { Header, Footer } from "./components/General";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import Add from "./pages/AddProduct";

const App = () => {
    // let key = "f049fb2d4114429e8653af2ba889a319";
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [userId, setUserId] = useState(localStorage.getItem("rockId"));
    const [text, setText] = useState("");
    const [serverGoods, setServerGoods] = useState([]);
    const [goods, setGoods] = useState(serverGoods);

    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("https://newsapi.org/v2/everything?q=животные&sources=lenta&apiKey=f049fb2d4114429e8653af2ba889a319")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNews(data.articles)
            })
    }, [])

    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (token) {
            fetch("https://api.react-learning.ru/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                })
        }
    }, [token])

    useEffect(() => {
        if (!goods.length) {
            console.log("=)");
            setGoods(serverGoods);
        }
    }, [serverGoods]);

    useEffect(() => {
        console.log("Change User")
        if (user) {
            setToken(localStorage.getItem("rockToken",));
            setUserId(localStorage.getItem("rockId",));
        } else {
            setToken("");
            setUserId("");
        }
        console.log("u", user);
    }, [user])

    return (
        <Ctx.Provider value={{
            goods,
            setGoods,
            setServerGoods,
            news,
            text,
            setText,
            userId,
            token
        }}>
            <Header
                user={user}
                setModalActive={setModalActive}
                serverGoods={serverGoods}
            />
            <main>
                <Search arr={serverGoods} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/catalog" element={<Catalog
                        setServerGoods={setServerGoods}
                    />} />
                    <Route path="/add" element={<Add/>}/>
                    <Route path="/draft" element={<Draft />} />
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser} color="yellow"
                        />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/favorites" element={<Favorites
                        goods={goods}
                        userId={userId}
                        setServerGoods={setServerGoods}
                    />} />
                </Routes>
            </main>
            <Footer />
            <Modal
                active={modalActive}
                setActive={setModalActive}
                setUser={setUser}
            />
        </Ctx.Provider>
    )
}

export default App;
