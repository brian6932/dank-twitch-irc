import * as Color from 'color';
import {TwitchBadgesList} from '../badges';
import { TwitchMessage } from '../twitch';

/**
 * Global state of a user in IRC.
 */
export interface GlobalUserState {
    badgeInfo: string;
    badges: TwitchBadgesList;
    color: Color;
    displayName: string;
    emoteSets: string;
    userID: number;
}

export class GlobaluserstateMessage extends TwitchMessage implements GlobalUserState{
    public static get command(): string {
        return 'GLOBALUSERSTATE';
    }

    // TODO parse?
    public get badgeInfo(): string {
        return this.ircMessage.ircTags.getString('badge-info');
    }

    public get badges(): TwitchBadgesList {
        return this.ircMessage.ircTags.getBadges();
    }

    public get color(): Color {
        return this.ircMessage.ircTags.getColor();
    }

    public get displayName(): string {
        return this.ircMessage.ircTags.getString('display-name');
    }

    // TODO parse
    public get emoteSets(): string {
        return this.ircMessage.ircTags.getString('emote-sets');
    }

    public get userID(): number {
        return this.ircMessage.ircTags.getInt('user-id');
    }

    public extractGlobalUserState(): GlobalUserState {
        return {
            badgeInfo: this.badgeInfo,
            badges: this.badges,
            color: this.color,
            displayName: this.displayName,
            emoteSets: this.emoteSets,
            userID: this.userID
        };
    }
}
