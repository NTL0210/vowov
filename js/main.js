// Main entry point for VOWOV
import { GameState } from './core/GameState.js';
import { StorageManager } from './storage/StorageManager.js';
import { CultivationSystem } from './systems/CultivationSystem.js';
import { UIManager } from './ui/UIManager.js';

class VOWOV {
    constructor() {
        this.gameState = new GameState();
        this.storageManager = new StorageManager();
        this.cultivationSystem = new CultivationSystem(this.gameState);
        this.uiManager = new UIManager(this.gameState, this.storageManager, this.cultivationSystem);
    }

    init() {
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