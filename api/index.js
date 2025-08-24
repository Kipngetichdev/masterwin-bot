if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { initBot } = require('../bot');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize bot
const bot = initBot();

// Webhook route to handle Telegram updates
app.post('/telegram-bot', async (req, res) => {
  try {
    await bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error processing update:', err);
    res.sendStatus(500);
  }
});

// Set webhook endpoint
app.get('/set-webhook', async (req, res) => {
  try {
    const vercelUrl = process.env.VERCEL_URL || 'https://masterwin-bot.vercel.app';
    const webhookUrl = `${vercelUrl}/api/telegram-bot`;
    await bot.setWebHook(webhookUrl);
    res.json({ status: 'success', message: `Webhook set to ${webhookUrl}` });
  } catch (err) {
    console.error('Error setting webhook:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'MasterWin Tips Bot is running' });
});

module.exports = app;