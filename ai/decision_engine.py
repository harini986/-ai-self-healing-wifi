def decide_action(fault, severity):
    """
    Decide the recovery action based on the detected fault.
    """

    # Normal network
    if fault == "NORMAL":
        return {
            "action": "NO_ACTION",
            "message": "Network is healthy."
        }

    # Router cannot be reached
    if fault == "ROUTER_UNREACHABLE":
        return {
            "action": "RESTART_ROUTER",
            "message": "Router is unreachable. Router restart recommended."
        }

    # Internet unavailable
    if fault == "INTERNET_UNAVAILABLE":
        return {
            "action": "CHECK_INTERNET",
            "message": "Internet is unavailable. Check ISP/internet connection."
        }

    # High latency
    if fault == "HIGH_LATENCY":
        if severity == "HIGH":
            return {
                "action": "RESTART_ROUTER",
                "message": "High latency detected. Router restart recommended."
            }

        return {
            "action": "MONITOR",
            "message": "Moderate latency detected. Continue monitoring."
        }

    # Packet loss
    if fault == "PACKET_LOSS":
        return {
            "action": "RESTART_ROUTER",
            "message": "High packet loss detected. Router restart recommended."
        }

    # Unknown fault
    return {
        "action": "ALERT_ADMIN",
        "message": "Unknown network problem detected."
    }


# Test the decision engine
if __name__ == "__main__":

    result = decide_action(
    fault="ROUTER_UNREACHABLE",
    severity="HIGH"
)