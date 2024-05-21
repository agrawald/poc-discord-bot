import type { CommandInteraction } from "discord.js";
import { Command } from './command';

export class ServerCommand extends Command {
	constructor() {
		super('server', 'Provides information about the server.');
	}

	public async execute(interaction: CommandInteraction) {
		if (interaction.guild != null) {
			return await interaction.reply(`This server is ${interaction.guild.name} and has ${JSON.stringify(interaction.guild.members)} members.`);
		}
		return await interaction.reply("No server found!");
	}
} 