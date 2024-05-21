import type { Interaction, SlashCommandBuilder } from 'discord.js';
import { injectable } from 'inversify';
import type { Commands } from '../types';
import { PingCommand } from './ping';
import { ServerCommand } from './server';
import { UserCommand } from './user';

@injectable()
export class CommandFactory {
    private commands: Commands;

    constructor(
    ) {
        this.commands = {
            ping: new PingCommand(),
            server: new ServerCommand(),
            user: new UserCommand()
        };
    }

    public async execute(interaction: Interaction) {
        if (!interaction.isCommand()) {
            return;
        }
        const { commandName } = interaction;
        return await this.commands[commandName].execute(interaction);
    }

    public commandData(): SlashCommandBuilder[] {
        return Object.keys(this.commands).map(key => this.commands[key].builder);
    }
}