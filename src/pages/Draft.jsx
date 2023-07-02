import { useState } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import Promo from "../components/Promo/Promo";
import cardsData from "../assets/data";

const sizes = ["sm", "lg", "md"];
const adds = [];

let text =
  "Полёты собак в космос — серия  экспериментов, включавших проведение исследований по возможности полётов на геофизических и космических ракетах живых существ, наблюдение за поведением высокоорганизованных животных в условиях таких полётов, а также, изучение сложных явлений в околоземном пространстве.";
text = text.match(/[^\s,.]+/g);

const rand = (n) => Math.floor(Math.random() * n);

let n = 8;
while (n--) {
  adds.push({
    text: `${text[rand(text.length)].slice(0, 8)} ${text[
      rand(text.length)
    ].slice(0, 8)} ${text[rand(text.length)].slice(0, 8)}`,
    pic: !!Math.round(Math.random()),
    sizes: sizes[rand(sizes.length)],
  });
}

const Draft = () => {
  const [goods, setGoods] = useState(cardsData);
  return (
    <div className="container">
      <Search arr={cardsData} upd={setGoods} />
      {goods.map((el, i) => (
        <Card key={i} img={el.pictures} name={el.name} price={el.price} />
      ))}
      {adds.map((el, i) => (
        <Promo key={i} {...el} type={el.sizes} />
      ))}
    </div>
  );
};

export default Draft;
