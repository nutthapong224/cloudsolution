from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import item

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:5173",  # frontend ของคุณ
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # อนุญาตเฉพาะ origin ที่กำหนด
    allow_credentials=True,
    allow_methods=["*"],     # GET, POST, PUT, DELETE ทั้งหมด
    allow_headers=["*"],     # header ทั้งหมด
)

# Prefix ใหม่เป็น /api
app.include_router(item.router, prefix="/api")
