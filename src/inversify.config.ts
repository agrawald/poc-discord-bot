import { Client, GatewayIntentBits, Partials, REST } from "discord.js";
import { Container } from "inversify";
import "reflect-metadata";
import { Bot } from "./bot";
import { CommandFactory } from './commands/factory';
import { Config } from './config';
import { TYPES } from "./types";

const container = new Container();
const config = new Config();
container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    partials: [Partials.GuildMember]
}));
container.bind<CommandFactory>(TYPES.Commands).toConstantValue(new CommandFactory());
container.bind<Config>(TYPES.Config).toConstantValue(config);
container.bind<REST>(TYPES.Rest).toConstantValue(new REST({ version: "10" }).setToken(config.properties.DISCORD_TOKEN));
container.bind<string[]>(TYPES.GuildIds).toConstantValue([
    "1238282186856333406"
]);

export default container;