const BASE_URL = 'http://localhost:5000/';

export const apiRequest = async (endPoint, body = null, method = 'GET', headers = {}) => {
    let response = '';
    if (method === 'PUT') {
        response = await fetch(`${BASE_URL}${endPoint}/${body.id}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null,
        });
    } else {
        response = await fetch(`${BASE_URL}${endPoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null,
        });
        console.log('response', response)
    }

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    // const data = await response.json();
    // console.log('sataaaaa', data)
    return await response.json();
}

export function updateCartStorage() {
    window.dispatchEvent(new Event("productAddToCartEvent")); // Dispatch a custom event
}
