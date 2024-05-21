import type { Bot } from './bot';
import container from './inversify.config';
import { TYPES } from './types';

const bot = container.get<Bot>(TYPES.Bot);
bot.listen().then(() => {
    console.log('Logged in!');
}).catch(error => {
    console.error("Oh no!", error);
})
