// Inventory and equipment system
export class InventorySystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.itemTemplates = {
            'spirit_herb_low': { id: 'spirit_herb_low', name: 'Low Grade Spirit Herb', type: 'consumable', effect: { type: 'cultivation', amount: 10 }, description: 'A common spirit herb that slightly boosts cultivation.' },
            'spirit_stone_small': { id: 'spirit_stone_small', name: 'Small Spirit Stone', type: 'currency', value: 1, description: 'A small spirit stone containing qi.' },
            'iron_sword': { id: 'iron_sword', name: 'Iron Sword', type: 'weapon', stats: { attack: 5 }, description: 'A basic iron sword for martial practice.' },
            'jade_pendant': { id: 'jade_pendant', name: 'Jade Pendant', type: 'accessory', stats: { cultivationBonus: 0.05 }, description: 'Slightly enhances cultivation speed.' }
        };
    }

    addItem(itemId, quantity = 1) {
        const template = this.itemTemplates[itemId];
        if (!template) return false;
        const existing = this.gameState.inventory.find(i => i.id === itemId);
        if (existing && template.type !== 'equipment') {
            existing.quantity += quantity;
        } else {
            this.gameState.inventory.push({ id: itemId, quantity, equipped: false });
        }
        this.gameState.lastSaveTime = Date.now();
        return true;
    }

    getItem(itemId) {
        const template = this.itemTemplates[itemId];
        const invItem = this.gameState.inventory.find(i => i.id === itemId);
        if (!template || !invItem) return null;
        return { ...template, ...invItem };
    }

    consumeItem(itemId) {
        const invItem = this.gameState.inventory.find(i => i.id === itemId);
        if (!invItem || invItem.quantity <= 0) return false;
        const template = this.itemTemplates[itemId];
        if (template.effect && template.effect.type === 'cultivation') {
            this.gameState.player.cultivation += template.effect.amount;
            if (this.gameState.player.cultivation > this.gameState.player.cultivationMax) {
                this.gameState.player.cultivation = this.gameState.player.cultivationMax;
            }
        }
        invItem.quantity -= 1;
        if (invItem.quantity <= 0) {
            const idx = this.gameState.inventory.indexOf(invItem);
            if (idx > -1) this.gameState.inventory.splice(idx, 1);
        }
        this.gameState.lastSaveTime = Date.now();
        return true;
    }

    getInventoryDisplay() {
        return this.gameState.inventory.map(inv => {
            const template = this.itemTemplates[inv.id];
            return { ...template, ...inv };
        });
    }
}