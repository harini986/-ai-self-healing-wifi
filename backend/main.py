import sys
from pathlib import Path

from fastapi import FastAPI

# Allow backend to import the AI package from the project root
ROOT_DIR = Path(__file__).resolve().parent.parent

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from ai.ai_engine import analyze_network
from network_monitor import get_network_status
from database import engine, SessionLocal
from models import Base, NetworkLog
from recovery_manager import restart_router
from recovery_verifier import verify_recovery
from notification_manager import notify_it_staff

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Self-Healing Wi-Fi Network Management System",
    version="1.0.0"
)





@app.get("/api/network/status")
def network_status():

    # STEP 1: Check the actual network
    result = get_network_status()

    router = result["router"]
    internet = result["internet"]

    router_reachable = router["reachable"]
    internet_reachable = internet["reachable"]

    latency = internet["latency"]

    # STEP 2: Send network information to AI
    ai_result = analyze_network(
        router_reachable,
        internet_reachable,
        latency
    )

    # STEP 3: Prepare recovery result
    recovery_result = None

    # STEP 4: Automatically recover if AI recommends restart
    if ai_result["recommended_action"] == "RESTART_ROUTER":

        recovery_result = restart_router()

        # STEP 5: Verify whether recovery was successful
        if recovery_result.get("success"):

            verification = verify_recovery()

            recovery_result["verification"] = verification

            # STEP 6: If verification failed, alert IT staff
            if not verification.get("recovered"):

                notification = notify_it_staff(
                    "RECOVERY_FAILED",
                    "Router restart completed but the network did not recover."
                )

                recovery_result["notification"] = notification

        else:

            # Router restart itself failed
            notification = notify_it_staff(
                "RESTART_FAILED",
                "The automatic router restart operation failed."
            )

            recovery_result["notification"] = notification

    # STEP 7: Return complete result
    return {
        "network": result,
        "ai": ai_result,
        "recovery": recovery_result
    }
@app.post("/api/recovery/restart")
def manual_recovery():

    result = restart_router()

    return {
        "action": "RESTART_ROUTER",
        "recovery": result
    }

@app.get("/api/network/history")
def network_history():
    db = SessionLocal()

    logs = (
        db.query(NetworkLog)
        .order_by(NetworkLog.id.desc())
        .limit(20)
        .all()
    )

    db.close()

    return logs