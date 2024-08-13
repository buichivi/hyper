
# Shoe Store 

This repository contains the codebase for the Shoe Store application, divided into two main parts: Frontend and Backend. 

## Tech Stack

#### Backend

-   **Flask**: Micro web framework for Python to build APIs.
-   **Firebase**: Used for authentication and real-time notifications.
-   **MySQL**: Relational database management system for storing application data.

#### Frontend

-   **ReactJS**: JavaScript library for building user interfaces.
-   **TailwindCSS**: Utility-first CSS framework for styling.
-   **Redux Toolkit**: State management library for React.
-   **SwiperJS**: Mobile touch slider.
-   **React-Toastify**: Toast notifications for React.
-   **Framer Motion**: Animation library for React.
-   **Axios**: Promise-based HTTP client for making requests.
-   **Formik**: Form handling in React.

## Project Structure 

```plaintext 
Shoe-Store/ 
├── Backend/ 
└── FrontEnd/
```

## Features
## Features

#### Backend

-   **User Authentication**: Secure user login and registration.
-   **Product Management**: APIs for managing the shoe catalog.
-   **Order Management**: APIs for handling customer orders.
-   **Database Integration**: MySQL used to store user data, orders, and product details.
-  **Image management**: We use Firebase to store image of the project.

#### Frontend

-   **Product Catalog**: Browse and search for shoes by category, view details, and check availability.
-   **Shopping Cart**: Add shoes to the cart and proceed to checkout.
-   **User Authentication**: Secure login and registration.
-   **Animations**: Smooth animations using Framer Motion.
-   **Responsive Design**: Fully responsive design with TailwindCSS.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/buichivi/hyper.git
cd hyper
```

2. Backend  
	2.1. Navigate to the `Backend` directory:
	```bash
	cd Backend
	```
	2.2. Create and activate a virtual environment (optional but recommended):
	```bash
	python -m venv venv 
	source venv/bin/activate # On Windows use `venv\Scripts\activate`
	```
	2.3. Install the required dependencies:
	```bash
	pip install -r requirements.txt
	```
	2.4. Set up config.py file:
	```py
	SQLALCHEMY_DATABASE_URI =  "mysql+pymysql://root:"  "@127.0.0.1/shoes_store"
	SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
	SECRET_KEY =  "shoes_store"
	CORS_HEADERS =  "Content-Type"
	SESSION_COOKIE_SAMESITE =  "None"
	REMEMBER_COOKIE_SAMESITE =  "None"
	SESSION_COOKIE_SECURE =  True
	REMEMBER_COOKIE_SECURE =  True
	REMEMBER_COOKIE_NAME =  "remember_me"  # This is the default name
	MAIL_SERVER =  "smtp.gmail.com"
	MAIL_PORT =  465
	MAIL_USERNAME =  <Your email>
	MAIL_PASSWORD =  <Your email application password>
	MAIL_USE_TLS =  False
	MAIL_USE_SSL =  True
	```
	2.5. Run Flask server: 
	```bash
	flask run
	```
3. Front end  
  3.1. Navigate to the `FrontEnd` directory:
	```bash
	cd FrontEnd
	```
	3.2. Install the required dependencies:
	```bash
	npm install
	```
	3.3. Start the development server:
	```bash
	npm run dev
	```
## API Endpoints

#### Authentication
- `[POST] /login`: Log in a user.
- `[POST] /signup`: Register a new user.
- `[GET] /logout`: Log out the current user.

#### Cart
- `[GET] /me/cart`: Get current user's cart.
- `[POST] /me/cart`: Add item to cart.
- `[PATCH] /me/cart/update`: Update item's quantity in the cart. 
- `[DELETE] /me/cart`: Remove a item in the cart.
- `[DELETE] /me/cart/delete`: Delete all the items in the cart.

#### Product
- `[GET] /products/:product_id`: Get product by id.
- `[POST] /products`: Create a new product.
- `[GET] /products`: Get product by brand code and shoe type.
- `[GET] /search`: Search products.
- `[GET] /featured`: Get featured products.
- `[GET] /recommended`: Get recommended products.

#### Order
- `[GET] /me/order`: Get all orders of current user.
- `[POST] /me/order`: Create a new order.
- `[PATCH] /me/order/status`: Update order's status.
- `[GET] /me/order/all`: Get all orders.

#### Brand
- `[GET] /brand`:  Get all brands.
- `[GET] /brand/:brand_code`:  Get brand by brand code.

#### Product reviews
- `[POST] /product-reviews`: Create product review for a product.
- `[GET] /product-reviews/:product_id`: Get product reviews by product id

#### Slider
 - `[GET] /slider`: Get all sliders.
