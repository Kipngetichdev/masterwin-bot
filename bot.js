const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config');
const registerCommands = require('./handlers/commands');
const registerMessages = require('./handlers/messages');
const { logger } = require('./utils/logger');

function initBot() {
  if (!config.botToken) {
    logger.error('BOT_TOKEN is not set in environment variables');
    throw new Error('BOT_TOKEN is not set');
  }

  const bot = new TelegramBot(config.botToken);
  
  // Register command and message handlers
  registerCommands(bot, config);
  registerMessages(bot);

  logger.info('Bot initialized successfully');
  return bot;
}

module.exports = { initBot };