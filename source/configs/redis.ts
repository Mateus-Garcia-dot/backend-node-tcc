import * as redis from 'redis';

export class RedisClient {
    private static instance: RedisClient;
    private client: any;

    constructor() {
        this.client = redis.createClient({
            url: 'redis://tccurbstads.com',
        });

        this.client.connect();

        this.client.on('error', (err: any) => {
            console.error('Erro na conexão com o Redis:', err);
        });

        this.client.on('connect', () => {
            console.log('Conectado ao Redis com sucesso');
        });
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    public async set(key: string, value: string) {
        return await this.client.set(key, value, (err: any, reply: any) => {
            if (err) {
                console.error('Erro ao definir valor no Redis:', err);
            } else {
                return true;
            }
        });
    }

    public async get(key: string) {
        return await this.client.get(key, (err: any, reply: any) => {
            console.log(err)
            if (err) {
                console.error('Erro ao obter valor do Redis:', err);
            } else {
                return reply;
            }
        });

    }

    public close(): void {
        this.client.quit();
    }
}