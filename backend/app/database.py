from pymongo import MongoClient
from .config import MONGO_URI, MONGO_DB

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

def get_collection(name: str):
    return db[name]
