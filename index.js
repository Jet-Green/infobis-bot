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
      keyboard: [
        ['Услуга 1'],
        ['Услуга 2'],
        ['Услуга 3'],
        ['Помощь']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

// Обработка выбора услуги
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  switch (msg.text) {
    case 'Услуга 1':
      sendInvoice(chatId, 'Услуга 1', 1000); // цена в копейках (10.00)
      break;
    case 'Услуга 2':
      sendInvoice(chatId, 'Услуга 2', 2000); // цена в копейках (20.00)
      break;
    case 'Услуга 3':
      sendInvoice(chatId, 'Услуга 3', 3000); // цена в копейках (30.00)
      break;
    case 'Помощь':
      bot.sendMessage(chatId, 'Если у вас есть вопросы, задавайте их здесь!');
      break;
    default:
      bot.sendMessage(chatId, 'Пожалуйста, выберите одну из услуг из меню.');
  }
});

// Функция отправки инвойса
function sendInvoice(chatId, title, price) {
  console.log(title, price);
  const options = {
    reply_markup: {
      keyboard: [
        ['Купить'],
        ['Назад'],
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  bot.sendMessage(chatId,
    'Описание: Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste obcaecati, quasi illum praesentium sint deserunt ipsam consectetur optio impedit neque cumque cupiditate consequatur ad voluptate asperiores est aut dolores voluptas!',
    options
  );
  // const invoiceOptions = {
  //   reply_markup: {
  //     inline_keyboard: [[
  //       {
  //         text: "Оплатить",
  //         pay: true
  //       }
  //     ]]
  //   },
  //   title: title,
  //   description: `Оплата за ${ title }`,
  //   payload: 'HIDDEN_PAYLOAD',
  //   provider_token: 'YOUR_PROVIDER_TOKEN', // Токен вашего платежного провайдера
  //   start_parameter: 'test-invoice',
  //   currency: 'RUB', // Укажите нужную валюту
  //   prices: [{ label: title, amount: price }]
  //   bot.sendInvoice(chatId, title, `Оплата за ${ title }`, 'HIDDEN_PAYLOAD', 'YOUR_PROVIDER_TOKEN', 'test-invoice', 'RUB', [{ label: title, amount: price }]);
  //   }
};


// Обработка успешного платежа
bot.on('pre_checkout_query', (query) => {
  bot.answerPreCheckoutQuery(query.id, true /* true для подтверждения заказа */);
});

// Подтверждение успешного платежа
bot.on('successful_payment', (msg) => {
  const chatId = msg.chat.id;
  const paymentDetails = msg.successful_payment;

  bot.sendMessage(chatId, `Спасибо за вашу оплату! Вы успешно купили: ${paymentDetails.invoice_payload}`);
});