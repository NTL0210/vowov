// Storage management for VOWOV
export class StorageManager {
    constructor() {
        this.storageKey = 'vowov_save';
    }

    async save(gameState) {
        try {
            const data = gameState.toJSON();
            data.lastSaveTime = Date.now();
            const jsonData = JSON.stringify(data);
            
            // Try localStorage first
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(this.storageKey, jsonData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Save failed:', error);
            return false;
        }
    }

    async load() {
        try {
            if (typeof localStorage !== 'undefined') {
                const savedData = localStorage.getItem(this.storageKey);
                if (savedData) {
                    const data = JSON.parse(savedData);
                    // Basic validation
                    if (data.player && data.version) {
                        return data;
                    }
                }
            }
            return null;
        } catch (error) {
            console.error('Load failed:', error);
            return null;
        }
    }

    async delete() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(this.storageKey);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Delete failed:', error);
            return false;
        }
    }

    async export(gameState) {
        const data = gameState.toJSON();
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vowov_save_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        return true;
    }

    async import(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.player && data.version) {
                        resolve(data);
                    } else {
                        reject(new Error('Invalid save file format'));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    hasSave() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.storageKey) !== null;
        }
        return false;
    }
}