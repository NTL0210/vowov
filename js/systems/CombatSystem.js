// Combat system for VOWOV
export class CombatSystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.enemies = [
            { id: 'wild_wolf', name: 'Wild Wolf', hp: 30, maxHp: 30, attack: 5, reward: { cultivation: 10 } },
            { id: 'spirit_beast', name: 'Spirit Beast', hp: 50, maxHp: 50, attack: 8, reward: { cultivation: 20 } },
            { id: 'bandit', name: 'Rogue Cultivator', hp: 40, maxHp: 40, attack: 7, reward: { cultivation: 15 } },
            { id: 'shadow_panther', name: 'Shadow Panther', hp: 60, maxHp: 60, attack: 10, reward: { cultivation: 30 } }
        ];
    }

    startCombat(enemyId) {
        const enemy = this.enemies.find(e => e.id === enemyId);
        if (!enemy) return null;
        this.gameState.combat = {
            inCombat: true,
            enemy: { ...enemy }
        };
        this.gameState.lastSaveTime = Date.now();
        return this.gameState.combat.enemy;
    }

    playerAttack() {
        if (!this.gameState.combat.inCombat || !this.gameState.combat.enemy) return null;
        const enemy = this.gameState.combat.enemy;
        const damage = Math.floor(8 + Math.random() * 5); // base damage
        enemy.hp -= damage;
        let result = { playerDamage: damage, enemyHp: enemy.hp, enemyDefeated: false };
        if (enemy.hp <= 0) {
            enemy.hp = 0;
            result.enemyDefeated = true;
            this.gameState.combat.inCombat = false;
            if (enemy.reward) {
                this.gameState.player.cultivation += enemy.reward.cultivation || 0;
                if (this.gameState.player.cultivation > this.gameState.player.cultivationMax) {
                    this.gameState.player.cultivation = this.gameState.player.cultivationMax;
                }
            }
            this.gameState.lastSaveTime = Date.now();
        }
        return result;
    }

    enemyAttack() {
        if (!this.gameState.combat.inCombat || !this.gameState.combat.enemy) return null;
        const enemy = this.gameState.combat.enemy;
        const damage = enemy.attack + Math.floor(Math.random() * 3);
        // Simple - player has no HP tracked yet, just return damage dealt
        return { enemyDamage: damage };
    }

    flee() {
        if (this.gameState.combat.inCombat) {
            this.gameState.combat.inCombat = false;
            this.gameState.combat.enemy = null;
            this.gameState.lastSaveTime = Date.now();
            return true;
        }
        return false;
    }

    getCombatState() {
        return this.gameState.combat;
    }
}