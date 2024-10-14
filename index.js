require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на ваш токен
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = "Добро пожаловать в наш сервис! Выберите услугу:";

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Купить доступ к каналу', callback_data: 'buy-access-to-channel' }],
        [{ text: 'Подробная информация о чате', callback_data: 'info' }],
        [{ text: 'Услуга 3', callback_data: 'three' }],
      ],
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});
bot.addListener('callback_query', (cb) => {
  console.log(cb);
  if (['buy-access-to-channel'].includes(cb.data)) {
    bot.answerCallbackQuery(cb.id, {
      text: 'Успешно!',
      show_alert: true
    })
    bot.sendMessage(cb.message.chat.id, 'https://t.me/jet_green')
  }
  // bot.answerInlineQuery({
  //   inline_query_id: cb.id,
  //   results: [{
  //     type: 'article',
  //     id: Date.now(),
  //     title: 'Закрытый чат',
  //     input_message_content: {
  //       message_text: "https://t.me"
  //     }
  //   }]
  // })
})

bot.onText(/\/service_list/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = "Выберите услугу:";

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Купить доступ к каналу', callback_data: 'buy-access-to-channel' }],
        [{ text: 'Подробная информация о чате', callback_data: 'info' }],
        [{ text: 'Услуга 3', callback_data: 'three' }],
      ],
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
})

// Обработка выбора услуги
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
// console.log(msg);


//   switch (msg.text) {
//     case 'Услуга 1':
//       sendInvoice(chatId, 'Услуга 1', 1000); // цена в копейках (10.00)
//       break;
//     case 'Услуга 2':
//       sendInvoice(chatId, 'Услуга 2', 2000); // цена в копейках (20.00)
//       break;
//     case 'Услуга 3':
//       sendInvoice(chatId, 'Услуга 3', 3000); // цена в копейках (30.00)
//       break;
//     case 'Помощь':
//       bot.sendMessage(chatId, 'Если у вас есть вопросы, задавайте их здесь!');
//       break;
//   }
// });

// Функция отправки инвойса
// function sendInvoice(chatId, title, price) {
//   console.log(title, price);
//   const options = {
//     reply_markup: {
//       keyboard: [
//         [{ text: 'Купить', callback_data: 'buy' }],
//         [{ text: 'Назад', callback_data: 'back' }],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true
//     }
//   };

//   bot.sendMessage(chatId,
//     'Описание: Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste obcaecati, quasi illum praesentium sint deserunt ipsam consectetur optio impedit neque cumque cupiditate consequatur ad voluptate asperiores est aut dolores voluptas!',
//     options
//   );
// }