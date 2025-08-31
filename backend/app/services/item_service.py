from app.database import get_collection
from app.schemas.item import ItemCreate, ItemUpdate
from bson import ObjectId

items_collection = get_collection("items")

def create_item(item: ItemCreate):
    item_dict = item.dict()
    result = items_collection.insert_one(item_dict)
    item_dict["id"] = str(result.inserted_id)
    return item_dict

def get_items():
    items = list(items_collection.find())
    for item in items:
        item["id"] = str(item["_id"])
        del item["_id"]
    return items

def get_item(item_id: str):
    item = items_collection.find_one({"_id": ObjectId(item_id)})
    if item:
        item["id"] = str(item["_id"])
        del item["_id"]
    return item

def update_item(item_id: str, item: ItemUpdate):
    update_data = {k: v for k, v in item.dict().items() if v is not None}
    if update_data:
        items_collection.update_one({"_id": ObjectId(item_id)}, {"$set": update_data})
    return get_item(item_id)

def delete_item(item_id: str):
    result = items_collection.delete_one({"_id": ObjectId(item_id)})
    return result.deleted_count > 0
