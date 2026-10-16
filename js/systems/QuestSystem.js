// Quest system
export class QuestSystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.quests = [
            {
                id: 'first_meditation',
                title: 'First Steps in Cultivation',
                description: 'Meditate 3 times to begin your cultivation journey.',
                type: 'meditation',
                target: 3,
                current: 0,
                completed: false,
                reward: { type: 'cultivation', amount: 30 }
            },
            {
                id: 'explore_world',
                title: 'See the World',
                description: 'Explore 2 times to discover the world around you.',
                type: 'explore',
                target: 2,
                current: 0,
                completed: false,
                reward: { type: 'cultivation', amount: 20 }
            }
        ];
    }

    trackMeditation() {
        const q = this.quests.find(x => x.id === 'first_meditation');
        if (q && !q.completed) {
            q.current++;
            if (q.current >= q.target) {
                q.completed = true;
                this.applyReward(q.reward);
            }
        }
    }

    trackExplore() {
        const q = this.quests.find(x => x.id === 'explore_world');
        if (q && !q.completed) {
            q.current++;
            if (q.current >= q.target) {
                q.completed = true;
                this.applyReward(q.reward);
            }
        }
    }

    applyReward(reward) {
        if (reward.type === 'cultivation') {
            this.gameState.player.cultivation += reward.amount;
            if (this.gameState.player.cultivation > this.gameState.player.cultivationMax) {
                this.gameState.player.cultivation = this.gameState.player.cultivationMax;
            }
        }
        this.gameState.lastSaveTime = Date.now();
    }

    getQuests() {
        return this.quests;
    }
}