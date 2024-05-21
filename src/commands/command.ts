import { type CommandInteraction, type InteractionResponse, SlashCommandBuilder } from 'discord.js';

export abstract class Command {
    public readonly builder: SlashCommandBuilder;
    public readonly name: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.builder = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description);
    }

    public abstract execute(interaction: CommandInteraction): Promise<InteractionResponse<boolean>>;
}