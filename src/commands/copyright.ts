import type { CommandInteraction } from "discord.js";
import { Command } from './command';

export class CopyrightCommand extends Command {
  constructor() {
    super("copyright", "");
  }

  public async execute(interaction: CommandInteraction) {
    return interaction.reply("Pong!");
  }
}