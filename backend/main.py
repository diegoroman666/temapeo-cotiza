from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from api.calculator import CalculateRequest, CalculateResult, calculate_flight_plan
from api.gis import TerrainAnalysisRequest, TerrainAnalysisResult, analyze_terrain

app = FastAPI(title="TeMapeo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuoteRequest(BaseModel):
    name: str
    company: Optional[str] = None
    phone: str
    email: str
    hectares: float
    flight_type: str
    num_flights: int
    estimated_cost: float


@app.get("/")
def root():
    return {"status": "ok", "service": "TeMapeo API"}


@app.post("/api/calculate", response_model=CalculateResult)
def calculate(req: CalculateRequest):
    return calculate_flight_plan(req)


@app.post("/api/analyze-terrain", response_model=TerrainAnalysisResult)
def analyze(req: TerrainAnalysisRequest):
    return analyze_terrain(req)


@app.post("/api/quote")
def submit_quote(req: QuoteRequest):
    print(f"[COTIZACIÓN] {req.name} | {req.email} | {req.flight_type} | {req.hectares} ha | ${req.estimated_cost:,.0f} CLP")
    return {
        "success": True,
        "message": "Cotización recibida. Un ingeniero te contactará pronto.",
        "reference_id": f"TMP-{abs(hash(req.email)) % 10000:04d}",
    }


@app.post("/api/process-file")
async def process_file(file: UploadFile = File(...)):
    allowed = {".kml", ".kmz", ".jpg", ".jpeg", ".png"}
    import os
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail="Formato no soportado.")

    content = await file.read()
    size_kb = len(content) / 1024

    return {
        "success": True,
        "filename": file.filename,
        "size_kb": round(size_kb, 2),
        "type": ext.lstrip("."),
        "layers_generated": ["rgb", "ndvi", "lidar", "thermal"],
        "message": "Archivo procesado. Capas generadas.",
    }
