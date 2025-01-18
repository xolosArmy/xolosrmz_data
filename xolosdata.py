import requests
import matplotlib.pyplot as plt
import datetime

def get_token_trading_history(token_id):
    api_url = f"http://localhost:3000/token-history/{token_id}"
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

def plot_trading_history(history):
    if not history:
        print("No data to plot.")
        return
    timestamps = [datetime.datetime.utcfromtimestamp(entry['timestamp']) for entry in history]
    prices = [entry['price'] for entry in history]
    plt.plot(timestamps, prices, marker='o')
    plt.title('Xolos RMZ Token Price History')
    plt.xlabel('Time')
    plt.ylabel('Price (satoshis)')
    plt.savefig("trading_history_plot.png")
    plt.show()

def analyze_trends(history):
    threshold = float(input("Enter price threshold (satoshis): "))
    for entry in history:
        if entry['price'] > threshold:
            print(f"Alert: Price exceeded threshold! Buyer: {entry['buyer']}, Price: {entry['price']}")

token_id = "9e0a9d4720782cf661beaea6c5513f1972e0f3b1541ba4c83f4c87ef65f843dc"
trading_history = get_token_trading_history(token_id)

if trading_history:
    for entry in trading_history:
        print(f"Buyer: {entry['buyer']}, Amount: {entry['amountBought']}, Price: {entry['price']}, Timestamp: {entry['timestamp']}")
    plot_trading_history(trading_history)
    analyze_trends(trading_history)
else:
    print("No trading history available.")
