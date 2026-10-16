// Character system - spiritual roots, physiques, talents
export class CharacterSystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.spiritualRoots = [
            { name: 'None', effect: 'No special affinity' },
            { name: 'Fire', effect: 'Fire technique affinity +15%' },
            { name: 'Water', effect: 'Water technique affinity +15%' },
            { name: 'Wood', effect: 'Wood technique affinity +15%' },
            { name: 'Earth', effect: 'Earth technique affinity +15%' },
            { name: 'Metal', effect: 'Metal technique affinity +15%' },
            { name: 'Lightning', effect: 'Lightning technique affinity +20%' },
            { name: 'Dual (Fire-Water)', effect: 'Balanced dual affinity' },
            { name: 'Triple (Metal-Wood-Water)', effect: 'Rare multi-element affinity' },
            { name: 'Heavenly Lightning', effect: 'Legendary lightning affinity +30%' }
        ];
        this.physiques = [
            { name: 'Mortal Body', effect: 'Normal cultivation speed' },
            { name: 'Strong Physique', effect: 'Increased breakthrough resistance, +10% cultivation' },
            { name: 'Sword Dao Physique', effect: 'Sword technique mastery +25%' },
            { name: 'Thunder Body', effect: 'Lightning affinity enhanced +25%' },
            { name: 'Ancient Bloodline', effect: 'Rare physique, +20% cultivation, faster realm progression' },
            { name: 'Heavenly Spirit Body', effect: 'Legendary physique, +30% cultivation speed' }
        ];
        this.stages = ['Early', 'Middle', 'Late', 'Peak'];
    }

    assignRandomTraits() {
        const root = this.spiritualRoots[Math.floor(Math.random() * this.spiritualRoots.length)];
        const physique = this.physiques[Math.floor(Math.random() * this.physiques.length)];
        this.gameState.player.spiritualRoots = root.name;
        this.gameState.player.physique = physique.name;
        this.gameState.player.talents = [root.effect, physique.effect];
        this.gameState.lastSaveTime = Date.now();
        return { root, physique };
    }

    setStageBasedOnCultivation() {
        const c = this.gameState.player.cultivation;
        const max = this.gameState.player.cultivationMax;
        const ratio = c / max;
        if (ratio < 0.25) this.gameState.player.stage = 'Early';
        else if (ratio < 0.5) this.gameState.player.stage = 'Middle';
        else if (ratio < 0.75) this.gameState.player.stage = 'Late';
        else this.gameState.player.stage = 'Peak';
    }
}