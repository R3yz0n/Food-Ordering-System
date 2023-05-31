import React from 'react'
// import Card from './Card';


const Home = () => {

    const registeredUsers = 100;
    const totalOrders = 500;
    const totalItems = 1500;
    return (
        <div>

            <Card title="Registered Users" value={registeredUsers} />
            <Card title="Total Orders" value={totalOrders} />
            <Card title="Total Items" value={totalItems} />




        </div>
    )
}

export default Home


export const Card = ({ title, value }) => {

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};
