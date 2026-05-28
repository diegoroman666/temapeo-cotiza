import math
from pydantic import BaseModel


class CalculateRequest(BaseModel):
    width: float
    length: float
    num_flights: int
    price_per_ha: float


class CalculateResult(BaseModel):
    hectares: float
    time_per_flight: int
    batteries: int
    total_cost: float


def calculate_flight_plan(req: CalculateRequest) -> CalculateResult:
    hectares = (req.width * req.length) / 10000
    time_per_flight = round(hectares * 4)          # ~4 min por hectárea
    batteries = max(1, math.ceil(time_per_flight / 25))  # 1 batería rinde ~25 min
    total_cost = hectares * req.price_per_ha * req.num_flights

    return CalculateResult(
        hectares=round(hectares, 4),
        time_per_flight=time_per_flight,
        batteries=batteries,
        total_cost=round(total_cost, 2),
    )
