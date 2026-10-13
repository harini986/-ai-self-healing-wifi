import numpy as np
from sklearn.ensemble import IsolationForest


def detect_anomalies(latency_values):
    """
    Detect unusual network latency values.
    """

    data = np.array(latency_values).reshape(-1, 1)

    model = IsolationForest(
        contamination=0.1,
        random_state=42
    )

    model.fit(data)

    predictions = model.predict(data)

    results = []

    for value, prediction in zip(latency_values, predictions):

        if prediction == -1:
            status = "ANOMALY"
        else:
            status = "NORMAL"

        results.append({
            "latency": value,
            "status": status
        })

    return results


if __name__ == "__main__":

    test_data = [
        20,
        22,
        21,
        19,
        23,
        20,
        24,
        22,
        21,
        250
    ]

    result = detect_anomalies(test_data)

    for item in result:
        print(item)