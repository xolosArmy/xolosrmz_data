import requests

def get_token_trading_history(token_id):
    api_url = f"http://localhost:3000/token-history/{token_id}"
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

token_id = "9e0a9d4720782cf661beaea6c5513f1972e0f3b1541ba4c83f4c87ef65f843dc"
trading_history = get_token_trading_history(token_id)

# Example to display fetched trading history
for entry in trading_history:
    print(f"Buyer: {entry['buyer']}, Amount: {entry['amountBought']}, Price: {entry['price']}, Timestamp: {entry['timestamp']}")

