def classify_fault(
    router_reachable,
    internet_reachable,
    latency,
    packet_loss=0
):
    """
    Classify the network problem based on monitoring data.
    """

    # Router itself cannot be reached
    if not router_reachable:
        return {
            "fault": "ROUTER_UNREACHABLE",
            "severity": "HIGH",
            "action": "CHECK_ROUTER"
        }

    # Router is working but internet is unavailable
    if router_reachable and not internet_reachable:
        return {
            "fault": "INTERNET_UNAVAILABLE",
            "severity": "HIGH",
            "action": "CHECK_INTERNET"
        }

    # Too much packet loss
    if packet_loss > 20:
        return {
            "fault": "PACKET_LOSS",
            "severity": "HIGH",
            "action": "CHECK_CONNECTION"
        }

    # Very high latency
    if latency is not None and latency > 150:
        return {
            "fault": "HIGH_LATENCY",
            "severity": "MEDIUM",
            "action": "MONITOR_OR_RECOVER"
        }

    # Everything is normal
    return {
        "fault": "NORMAL",
        "severity": "LOW",
        "action": "NO_ACTION"
    }


# Test the classifier
if __name__ == "__main__":

    result = classify_fault(
        router_reachable=True,
        internet_reachable=True,
        latency=250,
        packet_loss=0
    )

    print(result)