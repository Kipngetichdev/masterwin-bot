const { logger } = require('../utils/logger');

module.exports = (bot) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!text.startsWith('/')) {
      logger.info(`Received message from chat ${chatId}: ${text}`);
      bot.sendMessage(
        chatId,
        'Please use /tips for predictions or /subscribe for premium access.'
      );
    }
  });
};