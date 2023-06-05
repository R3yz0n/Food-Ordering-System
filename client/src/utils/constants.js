import Pizza from '../assests/Pizza.png'
import Drinks from '../assests/Drinks.png'
import Seafood from '../assests/Seafood.png'
import Burger from '../assests/Burger.png'
import Vegan from '../assests/Vegan.png'
import Pasta from '../assests/Pasta.png'
import H1 from '../assests/H1.png'
import H2 from '../assests/H2.png'
import H3 from '../assests/H3.png'
import H4 from '../assests/H4.png'


export const DummyFood = [
    { id: 'f1', image: Seafood, name: "Lobster", category: "seafood", price: 1500 },
    { id: 'f2', image: Pizza, name: "Laziz pizza", category: "drinks", price: 300 },
    { id: 'f3', image: Vegan, name: "Legumes", category: "burgers", price: 180 },
    { id: 'f4', image: Pasta, name: "Penne pasta", category: "pasta", price: 320 },
    { id: 'f5', image: Drinks, name: "Vigin mojito", category: "pizzas", price: 999 },
    { id: 'f6', image: Burger, name: "Turkey burger", category: "vegan", price: 340 },
];

export const APIURL = process.env.REACT_APP_API_URL


export const FooterItems = [
    { id: "h1", image: H1, title: "No minimum order" },
    { id: "h2", image: H2, title: "Free Delivery " },
    { id: "h3", image: H3, title: "Cash back with every order" },
    { id: "h4", image: H4, title: "TPay online or cash on delivery" }
];

