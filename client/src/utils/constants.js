import Pizza from '../assests/Pizza.png'
import Drinks from '../assests/Drinks.png'
import Seafood from '../assests/Seafood.png'
import Burger from '../assests/Burger.png'
import Vegan from '../assests/Vegan.png'
import Pasta from '../assests/Pasta.png'


export const DummyFood = [
    { id: 3, image: Seafood, name: "Lobster", category: "seafood", price: 1500 },
    { id: 1, image: Pizza, name: "Laziz pizza", category: "drinks", price: 300 },
    { id: 5, image: Vegan, name: "Legumes", category: "burgers", price: 180 },
    { id: 6, image: Pasta, name: "Penne pasta", category: "pasta", price: 320 },
    { id: 2, image: Drinks, name: "Vigin mojito", category: "pizzas", price: 999 },
    { id: 4, image: Burger, name: "Turkey burger", category: "vegan", price: 340 },
];

export const APIURL = process.env.REACT_APP_API_URL
