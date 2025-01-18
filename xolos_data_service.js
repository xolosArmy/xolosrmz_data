const express = require('express');
const { AgoraClient } = require('ecash-agora');
const app = express();
const PORT = 3000;
const tokenId = '9e0a9d4720782cf661beaea6c5513f1972e0f3b1541ba4c83f4c87ef65f843dc';


app.get('/token-history/:tokenId', async (req, res) => {
    try {
        const client = new AgoraClient();
        const offers = await client.historicOffers(req.params.tokenId);

        const history = offers.map(offer => ({
            buyer: offer.takenInfo?.buyer,
            amountBought: offer.takenInfo?.amount,
            price: offer.takenInfo?.satoshis,
            timestamp: offer.timestamp
        }));

        res.json(history);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Token history service running on port ${PORT}`);
});
