import dotenv from "dotenv";
import { injectable } from 'inversify';

@injectable()
export class Config {
    public readonly properties: { [prop: string]: string }
    constructor() {
        dotenv.config();
        const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
        if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
            throw new Error("Missing environment variables");
        }
        this.properties = {
            DISCORD_TOKEN,
            DISCORD_CLIENT_ID,
        }
    }

}