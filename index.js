const telegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = "6079536184:AAG2Mg-MzVAI11QDCCTpDVAIC-NLTfWIZR0"

const bot = new telegramApi(token,{polling: true})

const chats = {}
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'zagadka poshla')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}


const start = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'start!'
        },
        {
            command: '/info',
            description: 'info'
        },
        {
            command: '/game',
            description: 'start game'
        },
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        // bot.sendMessage(chatId,`you write ${text}`)
        if (text === '/start' ) {
            return  bot.sendMessage(chatId,`welcome to the assistant bot, have a nice day `)
        }
        if (text === '/info' ) {
            return  bot.sendMessage(chatId,`some info and you ${msg.from.first_name}`)
        }
        if (text === '/game') {
         return   startGame(chatId)
        }
        return bot.sendMessage(chatId,'i dont understand you')

    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `congrats you won ${chats[chatId]}`,againOptions)
        } else {
            return bot.sendMessage(chatId, `lol no ${chats[chatId]}`,againOptions)
        }
    })
}

start()