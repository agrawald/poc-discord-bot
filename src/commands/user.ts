import type { CommandInteraction } from "discord.js";
import { Command } from './command';

export class UserCommand extends Command {
	constructor() {
		super('user', 'Provides information about the user.');
	}

	public async execute(interaction: CommandInteraction) {
		if (interaction.user != null) {
			console.log(JSON.stringify(interaction.user));
			return await interaction.reply(`This command was run by ${interaction.user.avatarURL()}.`);
		}
		return await interaction.reply("No user found!")
	}
}