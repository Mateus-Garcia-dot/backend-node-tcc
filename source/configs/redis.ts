import * as redis from 'redis';

const redisClient = redis.createClient({
    url: 'redis://tccurbstads.com:6379'
})

export async function criaConexaoRedis(client: any) {
    client.on("error", (err: any) => console.log("Redis Client Error", err));
    client.on('connect', function() { console.log('Conectado no redis!');  });
    await client.connect();
}


export default redisClient;