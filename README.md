# E-Commerce Website(backend)

## Project Overview

This E-Commerce website simulates a platform similar to Amazon or Flipkart, allowing users to register, log in, manage their shopping cart, and place orders. The project demonstrates api built using Node.js

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Order Management**: Users can view their past orders.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vedant-beep/node-ecommerce.git
    cd node-ecommerce
    npm install
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

### Customization
- API routes 
- /api/users/signup
- /api/users/login
- /api/orders/place-order
- /api/orders/orders (get orders)
- /api/cart/add-to-cart
- /api/users/logout

