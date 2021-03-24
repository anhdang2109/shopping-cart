import './App.css';
import {useState} from "react";
import {PRODUCTS, PROMO_CODES} from "./mockData";


function App() {
    const [products, setProducts] = useState(PRODUCTS);
    const [promo, setPromo] = useState(null);

    let productLists;
    let discount;
    let totalNumber;
    let totalQuantityNumber = 0;
    let totalPriceNumber = 0;
    let discountNumber = 0;
    let taxNumber = 0
    let totalBillNumber = 0;

    // Initial value
    totalQuantity();
    totalPrice();
    applyPromo(totalPriceNumber);
    tax(discountNumber);
    totalBill(discountNumber, taxNumber);

    function reset() {
        setProducts(PRODUCTS);
    }

    function checkPromoCode() {
        let inputCode;
        inputCode = document.getElementById("promo-code").value;
        console.log(inputCode)
        for (let i = 0; i < PROMO_CODES.length; i++) {
            if (PROMO_CODES[i].code === inputCode) {
                setPromo(PROMO_CODES[i])
                return true
            }
        }
        alert("Bạn nhập sai mã!")
        setPromo(null)
        return false
    }

    function changeQuantity(id, value) {
        let newProducts = [...products];
        let index = newProducts.findIndex((product) => product.id === id);
        newProducts[index].quantity = Number(value);
        setProducts(newProducts);
    }

    function removeProduct(id) {
        if (window.confirm('Bạn có chắc là muốn xoá sản phẩm này?')) {
            let selectedProduct = findById(id);
            let index = products.indexOf(selectedProduct);
            if (index > -1) {
                setProducts(products => products.filter(product => product.id !== id))
            }
        }
    }

    function findById(id) {
        let result;
        for (let i = 0; i < products.length; i++) {
            if (id === products[i].id) result = products[i]
        }
        return result;
    }

    function totalQuantity() {
        for (let i = 0; i < products.length; i++) {
            totalQuantityNumber += Number(products[i].quantity)
        }
        return totalQuantityNumber
    }

    function totalPrice() {
        for (let i = 0; i < products.length; i++) {
            totalPriceNumber += Number(products[i].price) * Number(products[i].quantity)
        }
        return totalPriceNumber
    }

    function applyPromo(totalPriceNumber) {
        if (promo) {
            discountNumber = Number(totalPriceNumber) * (1 - ( promo.discountPercent / 100))
            return discount
        } else {
            discountNumber = totalPriceNumber
        }
    }

    function tax(discountNumber) {
        taxNumber = Number(discountNumber) * 0.1
        return taxNumber
    }

    function totalBill(totalPrice, tax) {
        totalBillNumber = Number(totalPrice) + Number(tax)
        return totalBillNumber
    }

    // Product list
    if (products.length !== 0) {
        productLists = products.map((product) =>
            <li key={product.id} className="row">
                <div className="col left">
                    <div className="thumbnail">
                        <a href="/">
                            <img src={product.image} alt=""/>
                        </a>
                    </div>
                    <div className="detail">
                        <div className="name"><a href="/">{product.name}</a></div>
                        <div className="description">
                            {product.description}
                        </div>
                        <div className="price">${product.price}</div>
                    </div>
                </div>

                <div className="col right">
                    <div className="quantity">
                        <input type="number"
                               className="quantity"
                               id=""
                               step="1"
                               onChange={event => changeQuantity(product.id, event.target.value)}
                               defaultValue={product.quantity}/>
                    </div>

                    <div className="remove">
                        <svg onClick={() => removeProduct(product.id)}
                             version="1.1"
                             className="close"
                             x="0px"
                             y="0px"
                             viewBox="0 0 60 60"
                             enableBackground="new 0 0 60 60"
                        >
                            <polygon
                                points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"
                            />
                        </svg>
                    </div>
                </div>
            </li>
        );
    } else {
        productLists = <div><h1>"Không có sản phẩm nào trong giỏ"</h1>
            <button onClick={() => reset()} type="button">Quay lại mua hàng</button>
        </div>;
    }
    // Disount
    if (promo) {
        discount =
            <div id="discount">
                <li>Promo <span>{promo.discountPercent} %</span></li>
                <li>Discount <span>${discountNumber.toFixed(2)}</span></li>
            </div>
    } else {
        discount = <div></div>
    }

    // totalNumber
    if (products.length !== 0) {
        totalNumber = <section className="container">
            <div className="promotion">
                <label htmlFor="promo-code">Have A Promo Code?</label>
                <input type="text" id="promo-code"/>
                <button type="button" onClick={() => checkPromoCode()}/>
            </div>

            <div className="summary">
                <ul>
                    <li>Subtotal <span>${totalPriceNumber.toFixed(2)}</span></li>
                    {discount}
                    <li>Tax <span>${taxNumber.toFixed(2)}</span></li>
                    <li className="total">Total <span>${totalBillNumber.toFixed(2)}</span></li>
                </ul>
            </div>

            <div className="checkout">
                <button type="button">Check Out</button>
            </div>
        </section>
    }

    return (
        <main>
            <header className="container">
                <h1>Shopping Cart</h1>

                <ul className="breadcrumb">
                    <li>Home</li>
                    <li>Shopping Cart</li>
                </ul>

                <span className="count">{totalQuantityNumber} items in the bag</span>
            </header>
            <section className="container">
                <ul className="products">
                    {productLists}
                </ul>
            </section>
            {totalNumber}
        </main>
    );
}

export default App;
