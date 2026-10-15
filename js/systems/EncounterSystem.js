// Kỳ Ngộ (Encounter) system
export class EncounterSystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.encounters = [
            {
                id: 'ancient_ruin',
                title: 'Ancient Ruin',
                description: 'You stumble upon the ruins of an ancient sect. A faint spiritual aura emanates from within.',
                choices: [
                    { id: 'explore', text: 'Explore carefully', outcome: { message: 'You discover an old cultivation manual!', reward: { type: 'cultivation', amount: 20 } } },
                    { id: 'retreat', text: 'Retreat cautiously', outcome: { message: 'You leave safely, avoiding any traps.' } }
                ]
            },
            {
                id: 'mysterious_herb',
                title: 'Spirit Herb',
                description: 'A rare spirit herb glows with ethereal light, beckoning you to harvest it.',
                choices: [
                    { id: 'harvest', text: 'Harvest the herb', outcome: { message: 'You carefully harvest the spirit herb. It enhances your cultivation!', reward: { type: 'cultivation', amount: 15 } } },
                    { id: 'leave', text: 'Leave it undisturbed', outcome: { message: 'You respect the natural balance and move on.' } }
                ]
            },
            {
                id: 'wounded_beast',
                title: 'Wounded Spirit Beast',
                description: 'A wounded spirit beast lies before you. Its eyes hold both fear and defiance.',
                choices: [
                    { id: 'help', text: 'Help the beast', outcome: { message: 'The grateful beast leaves you with a gift before departing!', reward: { type: 'cultivation', amount: 25 } } },
                    { id: 'slay', text: 'Take advantage', outcome: { message: 'You slay the weakened beast. Qi flows into you!', reward: { type: 'cultivation', amount: 30 } } },
                    { id: 'avoid', text: 'Avoid it', outcome: { message: 'You cautiously walk around the wounded beast.' } }
                ]
            },
            {
                id: 'mysterious_cultivator',
                title: 'Mysterious Cultivator',
                description: 'An elderly cultivator sits cross-legged by the path. He studies you with knowing eyes.',
                choices: [
                    { id: 'bow', text: 'Show respect', outcome: { message: 'The elder imparts some wisdom. Your understanding deepens!', reward: { type: 'cultivation', amount: 35 } } },
                    { id: 'ignore', text: 'Pass by silently', outcome: { message: 'You continue on your way without disturbance.' } }
                ]
            }
        ];
    }

    triggerRandomEncounter() {
        const encounter = this.encounters[Math.floor(Math.random() * this.encounters.length)];
        this.gameState.encounters.push({
            id: encounter.id,
            timestamp: Date.now(),
            chosen: null
        });
        return encounter;
    }

    applyOutcome(outcome, player) {
        if (outcome.reward) {
            if (outcome.reward.type === 'cultivation') {
                player.cultivation += outcome.reward.amount;
                if (player.cultivation > player.cultivationMax) {
                    player.cultivation = player.cultivationMax;
                }
            }
        }
        this.gameState.lastSaveTime = Date.now();
    }
}