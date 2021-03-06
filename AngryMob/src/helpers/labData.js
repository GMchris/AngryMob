// AngryMob Copyright (c) 2015 Kristian Ignatov

// Returns rectangle objects used for collision detection

var LabGenerator = (function(){

  var monsters = [
    {
      id: G.MONSTERS.FRANKENSTEIN,
      name: 'Frankie',
      price: 10,
      description: 'Sprints slower making it easier to avoid obstacles. Really nice guy.',
      image: '#frankenstein_avatar.png',
      state: G.NOT_OWNED,
      type: G.MONSTER
    },
    {
      id: G.MONSTERS.WEREWOLF,
      name: 'Fluffy',
      price: 10000,
      description: 'Regenerates his speed faster. Still wears braces.',
      image: '#werewolf_avatar.png',
      state: G.NOT_OWNED,
      type: G.MONSTER
    },
    {
      id: G.MONSTERS.MUMMY,
      name: 'Bandages',
      price: 12000,
      description: 'Can withstand an extra hit. Can\'t talk to girls.',
      image: '#mummy_avatar.png',
      state: G.NOT_OWNED,
      type: G.MONSTER
    },
    {
      id: G.MONSTERS.LICH,
      name: 'Brittlebones',
      price: 15000,
      description: 'Attracts souls to himself. But can\'t make friends easily.',
      image: '#lich_avatar.png',
      state: G.NOT_OWNED,
      type: G.MONSTER
    }
  ];

  var upgrades = [
    {
      name: 'Chillgulp',
      prices: [1000, 2500, 5000],
      effects: [0, 0.5, 1, 1.5],
      description: 'Move slower and dodge obstacles easier with this icy cold potion!',
      image: '#chillgulp_avatar.png',
      state: G.NOT_OWNED,
      type: G.UPGRADE
    },
    {
      name: 'Liquid Soul',
      prices: [1000, 2500, 5000],
      effects: [1, 1.5, 2, 2.5],
      description: 'These souls have been liquefied to raise their value!',
      image: '#liquid_soul_avatar.png',
      state: G.NOT_OWNED,
      type: G.UPGRADE
    },
    {
      name: 'Cuore',
      prices: [1000, 2500, 5000],
      effects: [0, 1, 2, 3],
      description: 'It\'s not a love potion, but it will speed up your health regen.',
      image: '#cuore_avatar.png',
      state: G.NOT_OWNED,
      type: G.UPGRADE
    }
  ];

  function getMonsters() {
    var monsterMemory = Memory.get('monsters');

    for (var monsterIndex = 0; monsterIndex < monsters.length; monsterIndex++) {
      monsters[monsterIndex].state = monsterMemory[monsterIndex];
    }

    return monsters;
  }

  function getUpgrades() {
    var upgradeMemory = Memory.get('upgrades');

    for (var upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++) {
      upgrades[upgradeIndex].state = upgradeMemory[upgradeIndex];
      upgrades[upgradeIndex].price = upgrades[upgradeIndex].prices[upgrades[upgradeIndex].state];
    }

    return upgrades;
  }

  function getCurrentUpgrade(id) {
    return getUpgrades()[id].effects[Memory.get('upgrades')[id]];
  }

  return {
    getMonsters: getMonsters,
    getUpgrades: getUpgrades,
    getCurrentUpgrade: getCurrentUpgrade
  }
})();