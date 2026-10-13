from ai.fault_classifier import classify_fault
from ai.decision_engine import decide_action


def analyze_network(
    router_reachable,
    internet_reachable,
    latency,
    packet_loss=0
):
    """
    Connects fault classification and decision making
    into one AI analysis pipeline.
    """

    # Step 1: Identify the network fault
    fault_result = classify_fault(
        router_reachable=router_reachable,
        internet_reachable=internet_reachable,
        latency=latency,
        packet_loss=packet_loss
    )

    # Step 2: Decide the appropriate action
    decision_result = decide_action(
        fault=fault_result["fault"],
        severity=fault_result["severity"]
    )

    # Step 3: Combine the results
    return {
        "fault": fault_result["fault"],
        "severity": fault_result["severity"],
        "recommended_action": decision_result["action"],
        "message": decision_result["message"]
    }


# Test the complete AI pipeline
if __name__ == "__main__":

    result = analyze_network(
        router_reachable=False,
        internet_reachable=False,
        latency=None,
        packet_loss=100
    )

    print(result)