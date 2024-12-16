import './Cart.scss';
import {useEffect, useState} from "react";
import {apiRequest, getChanges} from "../Api/api.js";
import {Requests} from "../enums/request.ts";

export default function Cart({isOpen, onClickEvent}) {
    const [carts, setCart] = useState([]);
    const [changes, setChanges] = useState([]);

    useEffect(() => {
        (async () => {
            setCart(await apiRequest('cart'));
        })()
        console.log('changes effect');
        window.removeEventListener('productAddToCartEvent',setChanges());
    }, [changes]);

    window.addEventListener("productAddToCartEvent", (ev) => {
        console.log('event');
        setChanges(ev);
    });
    
    // const val = (async () => {
    //     setCart(await apiRequest('cart'));
    // })

    return (
        <div className={`cart-container ${isOpen ? 'open' : 'hidden'}`}>
            <h1 onClick={onClickEvent}>X</h1>
            <div>
                {carts.map((cart, index) => {
                    return (
                        <div key={index} className="flex mb-4">
                            <div>
                                <h1 className="font-bold">{cart.title}</h1>
                                <p>{cart.description}</p>
                                <p>{cart.price}</p>
                            </div>

                            <img src={`../../../src/${cart.image}`} alt=""/>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
