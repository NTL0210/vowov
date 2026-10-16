// Core game state management
export class GameState {
    constructor() {
        this.player = {
            id: null,
            name: 'Unnamed Cultivator',
            age: 16,
            realm: 'Body Tempering',
            stage: 'Early',
            cultivation: 0,
            cultivationMax: 100,
            spiritualRoots: 'None',
            physique: 'None',
            talents: [],
            resources: {
                qi: 0,
                spiritStones: 0
            }
        };
        this.inventory = [];
        this.quests = [];
        this.encounters = [];
        this.unlockedRegions = ['Village'];
        this.settings = {
            autoSave: true
        };
        this.version = '1.0.0';
        this.lastSaveTime = null;
        this.combat = {
            inCombat: false,
            enemy: null
        };
    }

    static generateId() {
        return 'vowov_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    }

    createNew(name = 'Unnamed Cultivator') {
        this.player = {
            id: GameState.generateId(),
            name: name,
            age: 16,
            realm: 'Body Tempering',
            stage: 'Early',
            cultivation: 0,
            cultivationMax: 100,
            spiritualRoots: 'None',
            physique: 'None',
            talents: [],
            resources: {
                qi: 0,
                spiritStones: 0
            }
        };
        this.inventory = [];
        this.quests = [];
        this.encounters = [];
        this.unlockedRegions = ['Village'];
        this.settings = {
            autoSave: true
        };
        this.version = '1.0.0';
        this.lastSaveTime = Date.now();
        this.combat = {
            inCombat: false,
            enemy: null
        };
        return this;
    }

    toJSON() {
        return {
            player: this.player,
            inventory: this.inventory,
            quests: this.quests,
            encounters: this.encounters,
            unlockedRegions: this.unlockedRegions,
            settings: this.settings,
            version: this.version,
            lastSaveTime: this.lastSaveTime
        };
    }

    fromJSON(data) {
        if (data.player) this.player = data.player;
        if (data.inventory) this.inventory = data.inventory;
        if (data.quests) this.quests = data.quests;
        if (data.encounters) this.encounters = data.encounters;
        if (data.unlockedRegions) this.unlockedRegions = data.unlockedRegions;
        if (data.settings) this.settings = data.settings;
        if (data.version) this.version = data.version;
        if (data.lastSaveTime) this.lastSaveTime = data.lastSaveTime;
        return this;
    }
}