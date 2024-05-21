import { Events, Routes, type Client, type Guild, type Interaction, type PartialUser, type REST, type User } from 'discord.js';
import { inject, injectable } from 'inversify';
import type { CommandFactory } from './commands/factory';
import type { Config } from './config';
import { TYPES, type DeployCommands } from './types';

@injectable()
export class Bot {
    @inject(TYPES.Client) private client!: Client;
    @inject(TYPES.Config) private readonly config!: Config;
    @inject(TYPES.Commands) private commands!: CommandFactory;
    @inject(TYPES.Rest) private rest!: REST;
    @inject(TYPES.GuildIds) private guildIds!: string[];

    public listen(): Promise<string> {
        this.client.once(Events.ClientReady, () => this.onClientReady());
        this.client.on(Events.GuildCreate, (guild: Guild) => this.onGuildCreate(guild));
        this.client.on(Events.InteractionCreate, (interaction: Interaction) => this.onInteractionCreate(interaction));
        this.client.on(Events.UserUpdate, (user: User | PartialUser) => this.onUserUpdate(user));
        return this.client.login(this.config.properties.DISCORD_TOKEN);
    }

    public async onGuildCreate(guild: Guild) {
        await this.deployCommands({ guildId: guild.id });
    }

    public async onUserUpdate(user: User | PartialUser) {
        console.log(JSON.stringify(user));
    }

    public async onInteractionCreate(interaction: Interaction) {
        this.commands.execute(interaction);
    }

    public async onClientReady() {
        console.log("Discord bot is ready! 🤖");

        if (this.guildIds.length > 0) {
            for (const guildId of this.guildIds) {
                const guild = await this.client.guilds.fetch(guildId);
                console.log(`Indexing ${guild}`);
                const avatars = guild.members.cache.map(member => {
                    return {
                        username: member.user.tag,
                        avatarUrl: member.user.displayAvatarURL()
                    };
                });
                console.log(JSON.stringify(avatars));
            }
        }
    }

    private async deployCommands({ guildId }: DeployCommands) {
        try {
            console.log("Started refreshing application (/) commands.");

            await this.rest.put(
                Routes.applicationGuildCommands(this.config.properties.DISCORD_CLIENT_ID, guildId),
                {
                    body: this.commands.commandData(),
                }
            );

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    }
}