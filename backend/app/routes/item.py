from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.item import ItemCreate, ItemUpdate, ItemResponse
from app.services.item_service import create_item, get_items, get_item, update_item, delete_item

router = APIRouter(prefix="/items", tags=["items"])

@router.post("/", response_model=ItemResponse)
def create_item_route(item: ItemCreate):
    return create_item(item)

@router.get("/", response_model=List[ItemResponse])
def list_items():
    return get_items()

@router.get("/{item_id}", response_model=ItemResponse)
def get_item_route(item_id: str):
    item = get_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.put("/{item_id}", response_model=ItemResponse)
def update_item_route(item_id: str, item: ItemUpdate):
    updated_item = update_item(item_id, item)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated_item

@router.delete("/{item_id}")
def delete_item_route(item_id: str):
    success = delete_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}
