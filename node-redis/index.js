import { createClient } from 'redis';

const client = createClient({ url: 'redis://127.0.0.1:6379' });

client.on('error', (error) => {
  console.log('redis client error', error);
});

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');
console.log('value---', value, await client.keys('*'));
await client.disconnect();
