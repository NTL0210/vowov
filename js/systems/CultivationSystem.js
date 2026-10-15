// Cultivation system
export class CultivationSystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.realms = [
            { name: 'Body Tempering', maxCultivation: 100, nextRealm: 'Qi Gathering' },
            { name: 'Qi Gathering', maxCultivation: 500, nextRealm: 'Foundation Establishment' },
            { name: 'Foundation Establishment', maxCultivation: 1000, nextRealm: 'Golden Core' },
            { name: 'Golden Core', maxCultivation: 3000, nextRealm: 'Nascent Soul' }
        ];
    }

    meditate() {
        const player = this.gameState.player;
        const gain = 5;
        player.cultivation += gain;
        if (player.cultivation > player.cultivationMax) {
            player.cultivation = player.cultivationMax;
        }
        this.gameState.lastSaveTime = Date.now();
        return gain;
    }

    canBreakthrough() {
        const player = this.gameState.player;
        return player.cultivation >= player.cultivationMax;
    }

    attemptBreakthrough() {
        const player = this.gameState.player;
        if (!this.canBreakthrough()) {
            return { success: false, message: 'Not enough cultivation' };
        }
        
        const currentRealmIndex = this.realms.findIndex(r => r.name === player.realm);
        if (currentRealmIndex === -1 || currentRealmIndex === this.realms.length - 1) {
            return { success: false, message: 'Already at maximum realm' };
        }
        
        // Simple breakthrough - 70% success rate
        const success = Math.random() < 0.7;
        if (success) {
            const nextRealm = this.realms[currentRealmIndex + 1];
            player.realm = nextRealm.name;
            player.cultivationMax = nextRealm.maxCultivation;
            player.cultivation = 0;
            player.stage = 'Early';
            this.gameState.lastSaveTime = Date.now();
            return { success: true, message: `Breakthrough successful! Reached ${nextRealm.name}!` };
        } else {
            player.cultivation = Math.floor(player.cultivationMax * 0.3);
            this.gameState.lastSaveTime = Date.now();
            return { success: false, message: 'Breakthrough failed! Cultivation dropped.' };
        }
    }

    updateRealmDisplay() {
        return {
            realm: this.gameState.player.realm,
            stage: this.gameState.player.stage,
            cultivation: this.gameState.player.cultivation,
            maxCultivation: this.gameState.player.cultivationMax
        };
    }
}