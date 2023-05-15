import { createClient } from 'redis';

const client = createClient({ url: 'redis://127.0.0.1:6379' });
await client.connect();

const num = Math.round(Math.random() * 30 + 1);
const str = 'abcdefghij';
const strIndex = Math.round(Math.random() * 10);

(async function () {
  const data = await client.zScore('hot', str[strIndex]);

  if (data) {
    await client.zIncrBy('hot', 1, str[strIndex]);
    console.log(str[strIndex] + '+1');
  } else {
    const result = await client.ZADD('hot', {
      score: num,
      value: str[strIndex],
    });
    console.log('write:' + str[strIndex] + '-' + result);
  }
})();
