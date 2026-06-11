import http from 'k6/http';
import { group, check, sleep } from 'k6';

const BASE_URL = 'https://bakehouse.cta-training.academy/';

export const options = {
    scenarios: {
        bounce: { // scenario name - called bounce user as it hits a homepage and does smth else
            exec: 'homeJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 10 },
                { duration: '570s', target: 10 },
            ],
            gracefulRampDown: '5s', 
        },
        products: {
            exec: 'productsJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 6 },
                { duration: '570s', target: 6 },
            ],
            gracefulRampDown: '5s',
        },
        customers: {
            exec: 'customerJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 8 },
                { duration: '570s', target: 8 },
            ],
            gracefulRampDown: '5s',
        },
    },

    thresholds: { // can use these thresholds as pass or fail of tests
        http_req_duration: ['p(95)<250', 'max<2000'],
        http_req_failed: ['rate<0.1'],
    },
};

export function homeJourney() {
    group('home journey', () => {
        simpleGetRequest(BASE_URL, '<div id="root"></div>');
        sleep(5);
    });
}

export function productsJourney() {
    group('products journey', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        simpleGetRequest(`${BASE_URL}api/products`, 'victoria_sponge_slice');
        sleep(5);
    });
}

export function customerJourney() {
    group('customer journey', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        simpleGetRequest(`${BASE_URL}api/customers`, 'Alice Baker');

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
