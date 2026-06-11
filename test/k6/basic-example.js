import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 2,   //virtual user
  duration: '10s', //runs for 10 secs
};

export default function () {
  let res = http.get('https://bakehouse.cta-training.academy/api/products');
  sleep(1);  //pauses execution for 1 sec
}

// Load testing script in JS. 2 virtual users continuously execute the default function
