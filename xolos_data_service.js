const TelegramBot = require('node-telegram-bot-api');
const { AgoraClient } = require('ecash-agora');

// Telegram Bot Token (replace with your bot token)
const TELEGRAM_BOT_TOKEN = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';

// Static Xolos RMZ eToken ID
const tokenId = '9e0a9d4720782cf661beaea6c5513f1972e0f3b1541ba4c83f4c87ef65f843dc';

// Create a new Telegram bot instance
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to the Xolos RMZ Bot! Use /history to get the latest trading history.');
});

bot.onText(/\/history/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        const client = new AgoraClient();
        const offers = await client.historicOffers(tokenId);

        const history = offers.map(offer => ({
            buyer: offer.takenInfo?.buyer || 'N/A',
            amountBought: offer.takenInfo?.amount || 0,
            price: offer.takenInfo?.satoshis || 0,
            timestamp: new Date(offer.timestamp * 1000).toISOString()
        }));

        if (history.length === 0) {
            bot.sendMessage(chatId, 'No trading history available for Xolos RMZ.');
        } else {
            history.forEach(entry => {
                bot.sendMessage(
                    chatId,
                    `Buyer: ${entry.buyer}\nAmount: ${entry.amountBought}\nPrice: ${entry.price} satoshis\nDate: ${entry.timestamp}`
                );
            });
        }
    } catch (error) {
        console.error('Error fetching trading history:', error.message);
        bot.sendMessage(chatId, 'An error occurred while fetching trading history. Please try again later.');
    }
});
