const TelegramBot = require('node-telegram-bot-api');

const token = '5901403935:AAGDl63J4z12_1YtdnVQSi0gvTtFAvyB9g0';
const webAppUrl = 'https://tg-bot-shop-production.up.railway.app'

const bot = new TelegramBot(token, {polling: true});


bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Оставте свои данные', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'  }}]
                ]
            }
        })

            await bot.sendMessage(chatId, 'Оставте свои данные', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'do delivery ', web_app: {url: webAppUrl  } }]
                    ]
                }
            })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)

            await bot.sendMessage(chatId,'Done')
            await bot.sendMessage(chatId,'Your country ' + data?.country)
            await bot.sendMessage(chatId,'Your country ' + data?.street)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Thenks')
            }, 2000)
        } catch (e) {
            console.log(e)
        }
    }
});