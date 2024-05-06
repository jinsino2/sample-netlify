import { useEffect, useState } from "react";
import Card from "./components/Card";
import './App.css';

function App() {
  let images = [
    {
      num: 1,
      img: "./img/onepiece13_crocodile.png",
      isMatched: false
    },
    {
      num: 2,
      img: "./img/onepiece14_enel.png",
      isMatched: false
    },
    {
      num: 3,
      img: "./img/onepiece15_lucci.png",
      isMatched: false
    },
    {
      num: 4,
      img: "./img/onepiece17_doflamingo.png",
      isMatched: false
    },
    {
      num: 5,
      img: "./img/onepiece19_kurohige_teach.png",
      isMatched: false
    },
    {
      num: 6,
      img: "./img/onepiece20_santaisyou.png",
      isMatched: false
    },
  ];

  const [cards, setCards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]);
  const [tries, setTries] = useState(0);

  const shuffleImages = () => {
    let shuffledImages = [...images, ...images]//2枚ずつ
      .map((item, index) => ({...item, id: index + 1 }))
      .sort((a,b) => 0.5 - Math.random());

    setCards(shuffledImages);
  }

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        setselectedCards([]);
      }, 1000);
      checkMatch();
    }
  }, [selectedCards], checkMatch);

  useEffect(() => {
    if (cards.length === 0) return

    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && tries <= 5) {
      setTimeout(() => {
        alert('ゲームクリア！！');
      }, 500);
    }
  }, [cards], tries);

  const checkMatch = () => {
    if (selectedCards[0].num === selectedCards[1].num) {
      let updatedCards = cards.map((card) => {
        if (card.num === selectedCards[0].num) {
          return { ...card, isMatched: true }
        }
        return card;
      });
      setCards(updatedCards);
    } else {
      setTries(prev => prev + 1);

      if (tries > 5) {
        setTimeout(() => {
          alert('ゲームオーバー');
        }, 500);

        let allOpenCards = cards.map((card) => {
          return { ...card, isMatched: true }
        });
        setCards(allOpenCards);
      }
    }
  }

  return (
    <div className="container">
      <div className="cards-container">
        {cards.map((card)=>(
          <Card 
            key={card.id}
            card={card}
            selectedCards={selectedCards}
            setselectedCards={setselectedCards}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
