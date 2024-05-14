import { Client, Events, GatewayIntentBits, Partials, User } from "discord.js";
import { config } from './config';
import { OnClientReady } from './actions/clientReady.event';
import { OnGuildCreate } from './actions/guildCreate.event';
import { OnInteractionCreate } from './actions/interactionCreate.event';
import { OnUnhandledRejection } from './actions/unhandledRejection.event';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    partials: [Partials.GuildMember]
});

client.once(Events.ClientReady, async () => OnClientReady(client));
client.on(Events.GuildCreate, OnGuildCreate);
client.on(Events.InteractionCreate, OnInteractionCreate);
client.on(Events.UserUpdate, async (user) => {
    console.log(user);
});
client.login(config.DISCORD_TOKEN);
process.on('unhandledRejection', OnUnhandledRejection);