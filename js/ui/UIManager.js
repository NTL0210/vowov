// UI management
export class UIManager {
    constructor(gameState, storageManager, cultivationSystem) {
        this.gameState = gameState;
        this.storageManager = storageManager;
        this.cultivationSystem = cultivationSystem;
    }

    initialize() {
        this.setupEventListeners();
        this.checkContinueGame();
    }

    setupEventListeners() {
        // Main menu
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });
        
        document.getElementById('continue-game-btn').addEventListener('click', () => {
            this.continueGame();
        });
        
        document.getElementById('load-game-btn').addEventListener('click', () => {
            this.loadGame();
        });
        
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showGameScreen();
            this.switchTab('settings');
        });
        
        // Game screen
        document.getElementById('save-game-btn').addEventListener('click', () => {
            this.saveGame();
        });
        
        document.getElementById('menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });
        
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });
        
        // Cultivation
        document.getElementById('meditate-btn').addEventListener('click', () => {
            this.meditate();
        });
        
        document.getElementById('breakthrough-btn').addEventListener('click', () => {
            this.attemptBreakthrough();
        });
        
        // Exploration
        document.getElementById('explore-btn').addEventListener('click', () => {
            this.explore();
        });
        
        // Settings
        document.getElementById('export-save-btn').addEventListener('click', () => {
            this.exportSave();
        });
        
        document.getElementById('import-save-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        
        document.getElementById('import-file').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.importSave(e.target.files[0]);
                e.target.value = '';
            }
        });
        
        document.getElementById('delete-save-btn').addEventListener('click', () => {
            this.deleteSave();
        });
    }

    checkContinueGame() {
        if (this.storageManager.hasSave()) {
            document.getElementById('continue-game-btn').disabled = false;
        }
    }

    async newGame() {
        const name = prompt('Enter your cultivator name:', 'Unnamed Cultivator');
        if (name === null) return;
        this.gameState.createNew(name || 'Unnamed Cultivator');
        await this.storageManager.save(this.gameState);
        this.updateAllDisplays();
        this.showGameScreen();
    }

    async continueGame() {
        const data = await this.storageManager.load();
        if (data) {
            this.gameState.fromJSON(data);
            this.updateAllDisplays();
            this.showGameScreen();
        }
    }

    async loadGame() {
        const data = await this.storageManager.load();
        if (data) {
            this.gameState.fromJSON(data);
            this.updateAllDisplays();
            this.showGameScreen();
            alert('Game loaded successfully!');
        } else {
            alert('No save found.');
        }
    }

    showMainMenu() {
        document.getElementById('main-menu').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
    }

    showGameScreen() {
        document.getElementById('main-menu').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        this.updateAllDisplays();
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tabName}`);
        });
    }

    meditate() {
        const gain = this.cultivationSystem.meditate();
        this.updateCultivationDisplay();
        document.getElementById('exploration-result').textContent = `You meditated and gained ${gain} Qi.`;
        this.saveGame();
    }

    attemptBreakthrough() {
        const result = this.cultivationSystem.attemptBreakthrough();
        this.updateCultivationDisplay();
        document.getElementById('exploration-result').textContent = result.message;
        if (result.success) {
            alert(result.message);
        }
        this.saveGame();
    }

    explore() {
        const regions = ['Village', 'Spirit Herb Valley', 'Ancient Forest', 'Mountain Path'];
        const region = regions[Math.floor(Math.random() * regions.length)];
        const events = [
            'You found a spirit herb!',
            'You encountered a wild beast, but escaped.',
            'You discovered an ancient ruin.',
            'You found nothing of interest.',
            'You sensed mysterious energy in the air.'
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        document.getElementById('exploration-result').textContent = `Exploring ${region}: ${event}`;
        this.gameState.lastSaveTime = Date.now();
        this.saveGame();
    }

    async saveGame() {
        const success = await this.storageManager.save(this.gameState);
        if (success) {
            const btn = document.getElementById('save-game-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Saved!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 1500);
        }
    }

    async exportSave() {
        await this.storageManager.export(this.gameState);
        alert('Save exported successfully!');
    }

    async importSave(file) {
        try {
            const data = await this.storageManager.import(file);
            if (confirm('This will overwrite your current save. Continue?')) {
                this.gameState.fromJSON(data);
                await this.storageManager.save(this.gameState);
                this.updateAllDisplays();
                alert('Save imported successfully!');
            }
        } catch (error) {
            alert('Failed to import save: ' + error.message);
        }
    }

    async deleteSave() {
        if (confirm('Are you sure you want to delete your save? This cannot be undone.')) {
            await this.storageManager.delete();
            this.showMainMenu();
            document.getElementById('continue-game-btn').disabled = true;
            alert('Save deleted.');
        }
    }

    updateAllDisplays() {
        this.updatePlayerInfo();
        this.updateCultivationDisplay();
        this.updateCharacterDisplay();
    }

    updatePlayerInfo() {
        document.getElementById('player-name').textContent = this.gameState.player.name;
        document.getElementById('player-realm').textContent = this.gameState.player.realm;
        document.getElementById('player-cultivation').textContent = 
            `${this.gameState.player.cultivation} / ${this.gameState.player.cultivationMax} Qi`;
    }

    updateCultivationDisplay() {
        document.getElementById('realm-display').textContent = this.gameState.player.realm;
        document.getElementById('stage-display').textContent = this.gameState.player.stage;
        document.getElementById('cultivation-text').textContent = 
            `${this.gameState.player.cultivation} / ${this.gameState.player.cultivationMax} Qi`;
        
        const progress = (this.gameState.player.cultivation / this.gameState.player.cultivationMax) * 100;
        document.getElementById('cultivation-progress').style.width = progress + '%';
        
        document.getElementById('breakthrough-btn').disabled = !this.cultivationSystem.canBreakthrough();
    }

    updateCharacterDisplay() {
        document.getElementById('char-name').textContent = this.gameState.player.name;
        document.getElementById('char-roots').textContent = this.gameState.player.spiritualRoots;
        document.getElementById('char-physique').textContent = this.gameState.player.physique;
        document.getElementById('char-age').textContent = this.gameState.player.age;
    }
}