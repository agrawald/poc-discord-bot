import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides information about the server.');

export async function execute(interaction: CommandInteraction) {
	if(interaction.guild!=null) {
		await interaction.reply(`This server is ${interaction.guild.name} and has ${JSON.stringify(interaction.guild.members)} members.`);
	} else {
		await interaction.reply("No server found!")
	}
}