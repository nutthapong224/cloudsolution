from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import item

app = FastAPI()


# Prefix ใหม่เป็น /api
app.include_router(item.router, prefix="/api")
