import { EventSourcePolyfill } from 'event-source-polyfill';
import jwt from 'jsonwebtoken';

// ex topic = /demo/test
export default function (
  topic,
  callback,
  conditions = {
    mercure: {
      subscribe: ['*'],
      publish: ['*']
    }
  }
) {
  const url = new URL(process.env.REACT_APP_MERCURE_HUB);
  url.searchParams.append('topic', `http://localhost:3003${topic}`);

  let token = '';

  const localToken = localStorage.getItem('mercure_hub_token');
  if (localToken !== null) {
    token = localToken;
  } else {
    token = jwt.sign(conditions, process.env.REACT_APP_MERCURE_JWT_SECRET);
    localStorage.setItem('mercure_hub_token', token);
  }
  const eventSource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(`Connected to ${eventSource.url}`);

  eventSource.onmessage = e => {
    const data = JSON.parse(e.data);
    callback(data);
  };
  eventSource.onerror = err => {
    callback(null);
  };
}
