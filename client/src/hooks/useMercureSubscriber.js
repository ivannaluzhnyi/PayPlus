import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import jwt from 'jsonwebtoken';

// ex topic = /demo/test

const useMercureSubscriber = ({
  topic,
  callback,
  conditions = {
    mercure: {
      subscribe: ['*'],
      publish: ['*']
    }
  }
}) => {
  const [eventSource, setEvent] = useState(undefined);
  const url = new URL(process.env.REACT_APP_MERCURE_HUB);
  url.searchParams.append('topic', `http://localhost:3003${topic}`);

  if (eventSource) {
    eventSource.onmessage = e => {
      const data = JSON.parse(e.data);
      callback(data);
    };

    eventSource.onerror = err => {
      callback(null);
    };
  }

  useEffect(() => {
    let token = '';

    const localToken = localStorage.getItem('mercure_hub_token');
    if (localToken !== null) {
      token = localToken;
    } else {
      token = jwt.sign(conditions, process.env.REACT_APP_MERCURE_JWT_SECRET);
      localStorage.setItem('mercure_hub_token', token);
    }
    console.log(`Connect to topic: ${topic}`);

    const newEvent = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setEvent(newEvent);

    return () => {
      newEvent.close();
    };
  }, []);
};

export default useMercureSubscriber;
