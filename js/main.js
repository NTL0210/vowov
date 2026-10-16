// Main entry point for VOWOV
import { GameState } from './core/GameState.js';
import { StorageManager } from './storage/StorageManager.js';
import { CultivationSystem } from './systems/CultivationSystem.js';
import { EncounterSystem } from './systems/EncounterSystem.js';
import { InventorySystem } from './systems/InventorySystem.js';
import { CharacterSystem } from './systems/CharacterSystem.js';
import { UIManager } from './ui/UIManager.js';

class VOWOV {
    constructor() {
        this.gameState = new GameState();
        this.storageManager = new StorageManager();
        this.cultivationSystem = new CultivationSystem(this.gameState);
        this.encounterSystem = new EncounterSystem(this.gameState);
        this.inventorySystem = new InventorySystem(this.gameState);
        this.characterSystem = new CharacterSystem(this.gameState);
        this.uiManager = new UIManager(this.gameState, this.storageManager, this.cultivationSystem, this.encounterSystem, this.inventorySystem, this.characterSystem);
    }

    init() {
        window.uiManager = this.uiManager;
        this.uiManager.initialize();
        console.log('VOWOV initialized');
    }
}

// Initialize the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const game = new VOWOV();
        game.init();
    });
} else {
    const game = new VOWOV();
    game.init();
}