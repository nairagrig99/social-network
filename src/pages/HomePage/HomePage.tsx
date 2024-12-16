import {apiRequest, updateCartStorage} from "../../Api/api.js";
import {useEffect, useState} from "react";
import './HomePage.scss';
import {Requests} from '../../enums/request.ts'
import {Observable} from 'rxjs';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            setProducts(await apiRequest('products'));
        })();
    }, []);

    return (
        <>
            <div className="product-cart flex gap-3.5 flex-wrap ">
                {products.map((product, index) => {
                    return (
                        <div style={{width: '25%'}} className="border-solid border-2 flex flex-col gap-8 shadow-2xl p-2"
                             key={index}>
                            <h1> {product.title}</h1>
                            <p>{product.description}</p>
                            <img src={`../../../src/${product.image}`} alt=""/>
                            <div className="flex justify-between">
                                <button className="bg-neutral-950 text-white p-2 rounded-full">Buy Now</button>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-neutral-950 text-white p-2 rounded-full">Add To Cart
                                </button>
                            </div>
                        </div>

                    )
                })
                }
            </div>
        </>
    )
}

async function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isEmpty = Object.keys(cart).length > 0;
    if (isEmpty) {
        const newCart = [...cart, product];
        updateCartStorage(newCart)
    } else {
        localStorage.setItem('cart', JSON.stringify());
        updateCartStorage([product])
    }
    await apiRequest('cart', product, Requests.POST);
}

export default HomePage;

