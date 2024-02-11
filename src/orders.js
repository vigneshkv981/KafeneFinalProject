import React, { useState, useEffect } from 'react';

function OrdersPage() {
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem('loginStatus') === 'true');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        if (!loginStatus) {
            window.location.assign('../Login/index.html');
        }

        // Fetch orders data
        fetchOrders();

        // Event listener for logout button
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', handleLogout);

        // Cleanup function
        return () => {
            logoutButton.removeEventListener('click', handleLogout);
        };
    }, [loginStatus]);

    useEffect(() => {
        // Update filtered orders when orders change
        setFilteredOrders(orders);
    }, [orders]);

    // Function to fetch orders data
    const fetchOrders = () => {
        fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => console.error('Error fetching orders:', error));
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.setItem('loginStatus', false);
        window.location.assign('./');
    };

    // Function to filter orders by status
    const filterOrders = (status) => {
        if (status === 'All') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order => order.orderStatus === status);
            setFilteredOrders(filtered);
        }
    };

    return (
        <div>
            <h1>Orders Page</h1>
            <button id="logout-button" onClick={handleLogout}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Amount</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td className="secondary-text">{order.id}</td>
                            <td className="primary-text">{order.customerName}</td>
                            <td className="primary-text">{order.orderDate}<br /><span className="secondary-text">{order.orderTime}</span></td>
                            <td className="secondary-text">${order.amount}</td>
                            <td className="primary-text">{order.orderStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input id="newCheckBox" type="checkbox" onChange={() => filterOrders('New')} />
                <label htmlFor="newCheckBox">New</label>
            </div>
            <div>
                <input id="DeliveredCheckBox" type="checkbox" onChange={() => filterOrders('Delivered')} />
                <label htmlFor="DeliveredCheckBox">Delivered</label>
            </div>
            <div>
                <input id="IntransitcheckBox" type="checkbox" onChange={() => filterOrders('InTransit')} />
                <label htmlFor="IntransitcheckBox">In Transit</label>
            </div>
            <div>
                <input id="PackedCheckBox" type="checkbox" onChange={() => filterOrders('Packed')} />
                <label htmlFor="PackedCheckBox">Packed</label>
            </div>
            <div>
                <input id="allCheckBox" type="checkbox" onChange={() => filterOrders('All')} />
                <label htmlFor="allCheckBox">All</label>
            </div>
            <div>Total Orders: {filteredOrders.length}</div>
        </div>
    );
}

export default OrdersPage;
