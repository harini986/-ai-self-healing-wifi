from datetime import datetime


def notify_it_staff(reason, details):
    """
    Send an alert to IT staff when automatic recovery fails.
    """

    alert_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    message = {
        "alert": True,
        "time": alert_time,
        "recipient": "IT Staff",
        "reason": reason,
        "details": details,
        "message": "Wi-Fi recovery failed. IT staff intervention required."
    }

    # For now, display the alert in the terminal
    print("\n" + "=" * 60)
    print("🚨 IT STAFF ALERT")
    print("=" * 60)
    print(f"Time     : {alert_time}")
    print(f"Reason   : {reason}")
    print(f"Details  : {details}")
    print("Message  : Wi-Fi recovery failed.")
    print("Action   : IT staff intervention required.")
    print("=" * 60 + "\n")

    return message