import redis
import os

class Redis:
    def __init__(self):
        self.client = redis.StrictRedis(host=os.getenv('REDIS_URL'), port=os.getenv('REDIS_PORT'), db=0, password=os.getenv('REDIS_PASSWORD'))

    def set(self, key, value, ex=None):
        self.client.set(key, value, ex=ex)

    def get(self, key):
        return self.client.get(key)

    def delete(self, key):
        self.client.delete(key)

redis_client = Redis()