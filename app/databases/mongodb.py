from pymongo import MongoClient
from dotenv import load_dotenv
from os import getenv

load_dotenv()

class MongoDb():
    def __init__(self, connection_string):
        self.__client = MongoClient(connection_string)

    @property
    def client(self):
        return self.__client

mongo_db = MongoDb(getenv('MONGO_URI'))
  
