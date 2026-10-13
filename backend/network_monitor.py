from ping3 import ping
import subprocess
import re


def get_default_gateway():
    """
    Automatically detect the IPv4 default gateway
    on a Windows system.
    """

    try:
        result = subprocess.check_output(
            ["route", "print", "-4", "0.0.0.0"],
            text=True,
            encoding="utf-8",
            errors="ignore"
        )

        pattern = r"^\s*0\.0\.0\.0\s+0\.0\.0\.0\s+(\d{1,3}(?:\.\d{1,3}){3})"

        for line in result.splitlines():
            match = re.search(pattern, line)

            if match:
                return match.group(1)

    except Exception:
        pass

    return None


def check_connection(host):
    try:
        result = ping(host, timeout=2)

        if result is None:
            return {
                "reachable": False,
                "latency": None
            }

        return {
            "reachable": True,
            "latency": round(result * 1000, 2)
        }

    except Exception:
        return {
            "reachable": False,
            "latency": None
        }


def get_network_status():
    # Automatically detect gateway
    router_ip = get_default_gateway()

    if router_ip is None:
        return {
            "router": {
                "reachable": False,
                "latency": None
            },
            "internet": {
                "reachable": False,
                "latency": None
            },
            "diagnosis": "GATEWAY_NOT_FOUND"
        }

    # Check router
    router = check_connection(router_ip)

    # Check internet
    internet = check_connection("8.8.8.8")

    # Diagnose network
    if not router["reachable"] and not internet["reachable"]:
        diagnosis = "ROUTER_OR_NETWORK_FAILURE"

    elif router["reachable"] and not internet["reachable"]:
        diagnosis = "INTERNET_UNAVAILABLE"

    elif internet["reachable"] and internet["latency"] > 150:
        diagnosis = "HIGH_LATENCY"

    else:
        diagnosis = "NORMAL"

    return {
        "router_ip": router_ip,
        "router": router,
        "internet": internet,
        "diagnosis": diagnosis
    }