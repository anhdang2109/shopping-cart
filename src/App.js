import './App.css';
import { useState } from "react";
const PRODUCTS = [
    {
        id: 1,
        name: 'IPHONE XS',
        description: 'Description for iphone',
        image: 'https://www.techone.vn/wp-content/uploads/2019/10/Untitled-1.jpg',
        price: '5.99',
        quantity: '1'
    },
    {
        id: 2,
        name: 'IPAD MINI',
        description: 'Description for ipad',
        image: 'https://www.techone.vn/wp-content/uploads/2020/09/May-tinh-bang-iPad-10.2-2020-Gen-8-32GB-Wifi-250x250.jpg',
        price: '15.99',
        quantity: '2'
    },
    {
        id: 3,
        name: 'IPHONE XS',
        description: 'Description for iphone',
        image: 'https://www.techone.vn/wp-content/uploads/2019/10/Untitled-1.jpg',
        price: '5.99',
        quantity: '1'
    },
    {
        id: 4,
        name: 'IPAD MINI',
        description: 'Description for ipad',
        image: 'https://www.techone.vn/wp-content/uploads/2020/09/May-tinh-bang-iPad-10.2-2020-Gen-8-32GB-Wifi-250x250.jpg',
        price: '15.99',
        quantity: '3'
    }
]

function App() {
    let productLists;
    let promoCode = ['SUMMER','FREE','LUCKY'];
    let totalQuantityNumber = totalQuantity();
    let totalPriceNumber = totalPrice();
    let taxNumber = tax(totalPriceNumber)
    let totalBillNumber = totalBill(totalPriceNumber, taxNumber);


    const [products, setProducts] = useState(PRODUCTS);
    const [totalQuantityHook, setTotalQuantityHook] = useState(totalQuantityNumber);
    const [totalPriceHook, setTotalPriceHook] = useState(totalPriceNumber);
    const [taxHook, setTaxHook] = useState(taxNumber);
    const [totalBillHook, setTotalBillHook] = useState(totalBillNumber);
    const [discount, setDiscount] = useState(0);

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
                               onChange={event => changeQuantity(product.id,event.target.value)}
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
    }
    else {
        productLists = <div><h1>"Không có sản phẩm nào trong giỏ"</h1><button type="button">Quay lại mua hàng</button></div>;
    }

    function updateData() {
        setTotalQuantityHook(totalQuantity());
        let newTotalPrice = totalPrice()
        let newTax = tax(newTotalPrice)
        setTotalPriceHook(newTotalPrice);
        setTaxHook(newTax);
        setTotalBillHook(totalBill(newTotalPrice, newTax));
    }
    function checkPromoCode() {
        let inputCode = '';
        let truePromo = false;
        inputCode = document.getElementById("promo-code").value;
        for (let i = 0; i < promoCode.length; i++) {
            if (promoCode[i] === inputCode) truePromo = true
        }
        if (truePromo === true) {
            setDiscount(50)
            let newTotalPrice = totalPrice()/2
            let newTax = tax(newTotalPrice)
            setTotalPriceHook(newTotalPrice);
            setTaxHook(newTax);
            setTotalBillHook(totalBill(newTotalPrice, newTax));
        }
        else {
            alert("Bạn nhập không đúng mã giảm giá!")
            setDiscount(0)
            let newTotalPrice = totalPrice()
            let newTax = tax(newTotalPrice)
            setTotalPriceHook(newTotalPrice);
            setTaxHook(newTax);
            setTotalBillHook(totalBill(newTotalPrice, newTax));
        }
    }
    function changeQuantity(id,value) {
        let selectedProduct = findById(id);
        let index = PRODUCTS.indexOf(selectedProduct);
        PRODUCTS[index].quantity = Number(value);
        updateData();
    }
    function removeProduct(id) {
        let newProductsLength = products.length;
        if (window.confirm('Bạn có chắc là muốn xoá sản phẩm này?')) {
            let selectedProduct = findById(id);
            let index = PRODUCTS.indexOf(selectedProduct);
            if (index > -1) {
                setProducts(products => products.filter(product => product.id !== id))
                newProductsLength -= 1;
            }
            updateData();
            if (newProductsLength === 0) {
                document.querySelector("#totalNumber").classList.add("hidden");
            }
        }
    }
    function findById(id) {
        let result;
        for (let i = 0; i < PRODUCTS.length; i++) {
            if (id === PRODUCTS[i].id) result = PRODUCTS[i]
        }
        return result;
    }
    function totalQuantity() {
        let count = 0;
        for (let i = 0; i < PRODUCTS.length; i++) {
            count += Number(PRODUCTS[i].quantity)
        }
        return count
    }
    function totalPrice() {
        let total = 0;
        for (let i = 0; i < PRODUCTS.length; i++) {
            total += Number(PRODUCTS[i].price) * Number(PRODUCTS[i].quantity)
        }
        return total
    }
    function tax(totalPrice) {
        return (Number(totalPrice) * 0.1)
    }
    function totalBill(totalPrice, tax) {
        return (Number(totalPrice) + Number(tax))
    }
    return (
        <main>
            <header className="container">
                <h1>Shopping Cart</h1>

                <ul className="breadcrumb">
                    <li>Home</li>
                    <li>Shopping Cart</li>
                </ul>

                <span className="count">{totalQuantityHook} items in the bag</span>
            </header>
            <section className="container">
                <ul className="products">
                    {productLists}
                </ul>
            </section>
            <section id="totalNumber" className="container">
                <div className="promotion">
                    <label htmlFor="promo-code">Have A Promo Code?</label>
                    <input type="text" id="promo-code"/>
                    <button type="button" onClick={() => checkPromoCode()}> </button>
                </div>

                <div className="summary">
                    <ul>
                        <li>Subtotal <span>${totalPriceHook.toFixed(2)}</span></li>
                        <li>Discount <span>{discount} %</span></li>
                        <li>Tax <span>${taxHook.toFixed(2)}</span></li>
                        <li className="total">Total <span>${totalBillHook.toFixed(2)}</span></li>
                    </ul>
                </div>

                <div className="checkout">
                    <button type="button">Check Out</button>
                </div>
            </section>
        </main>
    );
}

export default App;
