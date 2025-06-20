require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { getFakeSpeedtest } = require("./utils/func");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Salom! Men tarmoqni tekshiruvchi botman. Quyidagi komandalarni sinab ko‘ring:\n\n/ping - Internet ishlayaptimi tekshirish\n/speed - Internet tezligini o‘lchash"
  );
});

bot.onText(/\/ping/, async (msg) => {
  const chatId = msg.chat.id;

  const fakePing = Math.floor(Math.random() * (150 - 30 + 1)) + 30;

  const isAlive = Math.random() < 0.8;

  if (isAlive) {
    bot.sendMessage(
      chatId,
      `✅ Internet ishlayapti. Ping vaqti: ${fakePing} ms`
    );
  } else {
    bot.sendMessage(chatId, `❌ Internet ulanmagan yoki ping javob bermadi.`);
  }
});

bot.onText(/\/speed/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `⏳ Tezlik o‘lchanmoqda, biroz kuting...`);

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const result = getFakeSpeedtest();

    const text = `📶 Internet tezligi:

📡 Ping: ${result.ping} ms
⬇️ Yuklab olish: ${result.download} Mbps
⬆️ Yuklash: ${result.upload} Mbps
🌐 Server: ${result.server.name}, ${result.server.location}
📍 IP: ${result.ip}
`;

    bot.sendMessage(chatId, text);
  } catch (err) {
    bot.sendMessage(
      chatId,
      `❌ Tezlikni o‘lchashda xatolik yuz berdi.\n${err.message}`
    );
  }
});
