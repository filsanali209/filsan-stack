import http from 'k6/http';
import { group, check, sleep } from 'k6';

const BASE_URL = 'https://bakehouse.cta-training.academy/';

export const options = {
    scenarios: {
        // bounce: { // scenario name - called bounce user as it hits a homepage and does smth else
        //     exec: 'homeJourney',
        //     executor: 'ramping-vus',
        //     startVUs: 0,
        //     stages: [
        //         { duration: '30s', target: 1 },
        //         { duration: '70s', target: 1 },
        //     ],
        //     gracefulRampDown: '5s', 
        // },
        // products: {
        //     exec: 'addProduct',
        //     executor: 'ramping-vus',
        //     startVUs: 0,
        //     stages: [
        //         { duration: '30s', target: 1 },
        //         { duration: '70s', target: 10 },
        //     ],
        //     gracefulRampDown: '5s',
        // },
        // customers: {
        //     exec: 'addCustomer',
        //     executor: 'ramping-vus',
        //     startVUs: 0,
        //     stages: [
        //         { duration: '30s', target: 1 },
        //         { duration: '70s', target: 1 },
        //     ],
        //     gracefulRampDown: '5s',
        // },
        orders: {
            exec: 'addOrder',
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '30s', target: 2 },
            ],
        },
    },

    thresholds: { // can use these thresholds as pass or fail of tests
        http_req_duration: ['p(95)<250', 'max<2000'],
        http_req_failed: ['rate<0.1'],
    },
};

// export function homeJourney() {
//     group('home journey', () => {
//         simpleGetRequest(BASE_URL, '<div id="root"></div>');
//         sleep(5);
//     });
// }

// export function addProduct() {
//     const product = {
//         name: 'banana',
//         category: 'fruit',
//         pricePounds: 1.00
//     }
//     group('add product', () => {
//         simplePostRequest(`${BASE_URL}api/products`, product);
//         sleep(5);
//     });
// }

// export function addCustomer() {
//     const customer = {
//         name : 's',
//         email : 's@f'
//     }
//     group('add customer', () => {
//         simplePostRequest(`${BASE_URL}api/customers`, customer);
//         sleep(5);
//     });
// }

export function addOrder() {
    const customers = simpleGetRequest(`${BASE_URL}api/customers`, 'Alice Baker').json();
    const products = simpleGetRequest(`${BASE_URL}api/products`, 'Banana').json();

    // const customer = JSON.parse(customers);
    // const product = JSON.parse(products);
    // console.log("IS ARRAY:", Array.isArray(customers));
    // console.log(Object.values(item.customers)[0].id);
    console.log(customers[0]);

    

    // const customerId = customer.body.id
    // const productId = product.id
    const order = {
        customerId: customers[0].id,
        items: [{productId : products[0].id, quantity: 5}]
    }
    console.log(JSON.stringify(order));
    group('add order', () => {
        simplePostRequest(`${BASE_URL}api/orders`, order);
        sleep(5);
    });
}

function simpleGetRequest(pageUrl, expectedText = null) {
    const res = http.get(pageUrl);
    sleep(1);
    const success = check(res, {
        'status was 200': (r) => r.status === 200,
        ...(expectedText && {
            'page contains expected text': (r) =>
                r.body.includes(expectedText),
        }),
    });

    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
        console.log(`Status: ${res.status}`);

        if (expectedText) {
            console.log(`Expected text: ${expectedText}`);
            console.log(`Response body: ${res.body.substring(0, 500)}`);
        }
    }

    return res;
}

function simplePostRequest(pageUrl, data) {

    let res = http.post(pageUrl, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });

    sleep(1);

    console.log(res.body);

    const success = check(res, {
        'status is 201': (r) => r.status === 201
    });

    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
        console.log(`Status: ${res.status}`);
        console.log(`Response body: ${res.body}`);
    }

    return res;
}
