// Kỳ Ngộ encounter data
export const EncountersData = [
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
    },
    {
        id: 'ancient_tomb',
        title: 'Ancient Tomb',
        description: 'You discover an ancient tomb hidden among the rocks. Mysterious inscriptions cover its entrance.',
        choices: [
            { id: 'enter', text: 'Enter the tomb', outcome: { message: 'Inside, you find ancient relics that resonate with your dao!', reward: { type: 'cultivation', amount: 40 } } },
            { id: 'seal', text: 'Seal the entrance', outcome: { message: 'You sense danger and wisely seal the tomb.' } }
        ]
    }
];