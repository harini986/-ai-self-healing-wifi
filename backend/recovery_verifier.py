import time

from network_monitor import get_network_status


def verify_recovery():

    print("Waiting for router to recover...")

    # Wait for the router to restart
    time.sleep(5)

    # Check the network again
    result = get_network_status()

    router_ok = result["router"]["reachable"]
    internet_ok = result["internet"]["reachable"]

    # Check whether both router and internet are working
    if router_ok and internet_ok:

        return {
            "recovered": True,
            "message": "Network recovered successfully."
        }

    # Recovery failed
    return {
        "recovered": False,
        "message": "Network did not recover after restart."
    }