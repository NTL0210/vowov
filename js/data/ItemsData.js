// Item data definitions
export const ItemsData = {
    spirit_herb_low: {
        id: 'spirit_herb_low',
        name: 'Low Grade Spirit Herb',
        type: 'consumable',
        rarity: 'common',
        effect: { type: 'cultivation', amount: 10 },
        description: 'A common spirit herb that slightly boosts cultivation.'
    },
    spirit_stone_small: {
        id: 'spirit_stone_small',
        name: 'Small Spirit Stone',
        type: 'currency',
        rarity: 'common',
        value: 1,
        description: 'A small spirit stone containing qi.'
    },
    iron_sword: {
        id: 'iron_sword',
        name: 'Iron Sword',
        type: 'weapon',
        rarity: 'common',
        stats: { attack: 5 },
        description: 'A basic iron sword for martial practice.'
    },
    jade_pendant: {
        id: 'jade_pendant',
        name: 'Jade Pendant',
        type: 'accessory',
        rarity: 'uncommon',
        stats: { cultivationBonus: 0.05 },
        description: 'Slightly enhances cultivation speed.'
    },
    spirit_herb_mid: {
        id: 'spirit_herb_mid',
        name: 'Mid Grade Spirit Herb',
        type: 'consumable',
        rarity: 'uncommon',
        effect: { type: 'cultivation', amount: 25 },
        description: 'A mid-grade spirit herb with stronger effects.'
    }
};