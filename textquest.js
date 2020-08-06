// Текстовый квест

console.log('Текстовый квест.\nЧтобы начать игру, напишите startGame() в консоли');

function startGame() {
    let characterName = prompt('Как зовут вашего персонажа?');
    let characterClass = prompt('Выберите класс вашего персонажа: ');
    let player = new Player(characterName, characterClass);
}

function Player(characterName, characterClass) {
    let lives;
    let characterClassName;
    let attack;
    let abilities;

    switch (characterClass) {
        case 'warrior': {
            characterClassName = 'warrior';
            lives = 20;
            attack = 4;
            abilities = ['battle shout', 'block', 'regeneration'];
            inventory = [];
            break;
        }
        case 'mage': {
            characterClassName = 'mage';
            lives = 18;
            attack = 5;
            abilities = ['fireball', 'healing touch', 'firestorm'];
            inventory = [];
        }
    }

    return {
        characterName,
        characterClassName,
        lives,
        attack,
        abilities
    }
}

function Map() {
