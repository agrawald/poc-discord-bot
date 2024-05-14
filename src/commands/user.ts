import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName('user')
	.setDescription('Provides information about the user.');

export async function execute(interaction: CommandInteraction) {
	if (interaction.user != null) {
		console.log(JSON.stringify(interaction.user));
		await interaction.reply(`This command was run by ${interaction.user.avatarURL()}.`);
	} else {
		await interaction.reply("No user found!")
	}
}