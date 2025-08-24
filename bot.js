const TelegramBot = require('node-telegram-bot-api');
const handleCommands = require('./handlers/commands');
const handleMessages = require('./handlers/messages');
const { logger } = require('./utils/logger');

function initBot() {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    logger.error('BOT_TOKEN is not set in environment variables');
    throw new Error('BOT_TOKEN is not set');
  }

  const bot = new TelegramBot(botToken, { polling: false });
  
  // Register command and message handlers
  const config = {
    subscriptionUrl: process.env.SUBSCRIPTION_URL || 'https://masterwin-bot.vercel.app'
  };
  handleCommands(bot, config);
  handleMessages(bot);

  logger.info('Bot initialized successfully');
  return bot;
}

module.exports = { initBot };