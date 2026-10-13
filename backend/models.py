from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime

from database import Base


class NetworkLog(Base):

    __tablename__ = "network_logs"

    id = Column(Integer, primary_key=True, index=True)

    router_status = Column(String)
    router_latency = Column(Float)

    internet_status = Column(String)
    internet_latency = Column(Float)

    diagnosis = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )