import math
from pydantic import BaseModel
from typing import Optional


class TerrainAnalysisRequest(BaseModel):
    width: float
    length: float
    flight_type: str
    crop_type: Optional[str] = None


class TerrainAnalysisResult(BaseModel):
    hectares: float
    perimeter_m: float
    estimated_gsd_cm: float
    recommended_altitude_m: float
    overlap_percent: int
    flight_lines: int
    waypoints: int
    ndvi_applicable: bool
    lidar_applicable: bool


FLIGHT_CONFIGS = {
    "Multiespectral": {"gsd": 5.0, "altitude": 80, "overlap": 80},
    "Topográfico RTK": {"gsd": 2.5, "altitude": 120, "overlap": 75},
    "LiDAR": {"gsd": 10.0, "altitude": 100, "overlap": 70},
    "Termográfico": {"gsd": 8.0, "altitude": 60, "overlap": 80},
}


def analyze_terrain(req: TerrainAnalysisRequest) -> TerrainAnalysisResult:
    hectares = (req.width * req.length) / 10000
    perimeter = 2 * (req.width + req.length)
    config = FLIGHT_CONFIGS.get(req.flight_type, {"gsd": 5.0, "altitude": 80, "overlap": 80})

    overlap_frac = config["overlap"] / 100
    swath_width = config["altitude"] * 0.6
    effective_swath = swath_width * (1 - overlap_frac)

    flight_lines = max(1, math.ceil(req.width / effective_swath))
    waypoints = flight_lines * max(1, math.ceil(req.length / (swath_width * (1 - overlap_frac))))

    ndvi_applicable = req.flight_type in ("Multiespectral",)
    lidar_applicable = req.flight_type in ("LiDAR",)

    return TerrainAnalysisResult(
        hectares=round(hectares, 4),
        perimeter_m=round(perimeter, 2),
        estimated_gsd_cm=config["gsd"],
        recommended_altitude_m=config["altitude"],
        overlap_percent=config["overlap"],
        flight_lines=flight_lines,
        waypoints=waypoints,
        ndvi_applicable=ndvi_applicable,
        lidar_applicable=lidar_applicable,
    )
