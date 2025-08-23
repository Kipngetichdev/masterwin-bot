const { logger } = require('../utils/logger');

// Mock betting tips (replace with Firebase/API integration later)
const freeTips = [
  { match: "Man United vs. Arsenal", prediction: "Over 2.5 Goals", odds: 1.85 },
  { match: "Chelsea vs. Liverpool", prediction: "Both Teams to Score", odds: 1.70 }
];

module.exports = (bot, config) => {
  // /start command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    logger.info(`Received /start from chat ${chatId}`);
    bot.sendMessage(
      chatId,
      'Welcome to MasterWin Football Score Tips Bot! ⚽\n' +
      'Your winning edge in football betting.\n' +
      'Use /tips for free daily predictions or /subscribe for premium tips.'
    );
  });

  // /tips command
  bot.onText(/\/tips/, (msg) => {
    const chatId = msg.chat.id;
    logger.info(`Received /tips from chat ${chatId}`);
    let response = '🏟️ Today’s Free Predictions (Up to 10 Daily):\n\n';
    freeTips.forEach((tip, index) => {
      response += `${index + 1}. ${tip.match}: ${tip.prediction} @ ${tip.odds}\n`;
    });
    response += '\nGet more with /subscribe!';
    bot.sendMessage(chatId, response);
  });

  // /subscribe command
  bot.onText(/\/subscribe/, (msg) => {
    const chatId = msg.chat.id;
    logger.info(`Received /subscribe from chat ${chatId}`);
    bot.sendMessage(
      chatId,
      '🔥 Unlock Premium Tips with MasterWin!\n' +
      'Join our VIP plan for high-confidence predictions.\n' +
      `Visit ${config.subscriptionUrl} to sign up!`
    );
  });
};