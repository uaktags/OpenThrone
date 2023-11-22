import { Fortification } from "@/types/typings";

export const Fortifications: Fortification[] = [
  {
    name: 'Manor',
    level: 1,
    levelRequirement: 0,
    hitpoints: 50,
    costPerRepairPoint: 5,
    goldPerTurn: 1000,
    defenseBonusPercentage: 5,
    cost: 0,
  },
  {
    name: 'Village',
    level: 2,
    levelRequirement: 5,
    hitpoints: 100,
    costPerRepairPoint: 15,
    goldPerTurn: 2000,
    defenseBonusPercentage: 10,
    cost: 100000,
  },
  {
    name: 'Town',
    level: 3,
    levelRequirement: 10,
    hitpoints: 200,
    costPerRepairPoint: 35,
    goldPerTurn: 3000,
    defenseBonusPercentage: 15,
    cost: 250000,
  },
  {
    name: 'Outpost',
    level: 4,
    levelRequirement: 15,
    hitpoints: 300,
    costPerRepairPoint: 75,
    goldPerTurn: 4000,
    defenseBonusPercentage: 20,
    cost: 500000,
  },
  {
    name: 'Outpost Level 2',
    level: 5,
    levelRequirement: 20,
    hitpoints: 500,
    costPerRepairPoint: 125,
    goldPerTurn: 5000,
    defenseBonusPercentage: 25,
    cost: 1000000,
  },
  {
    name: 'Outpost Level 3',
    level: 6,
    levelRequirement: 25,
    hitpoints: 750,
    costPerRepairPoint: 225,
    goldPerTurn: 6000,
    defenseBonusPercentage: 30,
    cost: 2000000,
  },
  {
    name: 'Stronghold',
    level: 7,
    levelRequirement: 30,
    hitpoints: 1000,
    costPerRepairPoint: 325,
    goldPerTurn: 7000,
    defenseBonusPercentage: 35,
    cost: 3000000,
  },
  {
    name: 'Stronghold Level 2',
    level: 8,
    levelRequirement: 35,
    hitpoints: 1500,
    costPerRepairPoint: 450,
    goldPerTurn: 8000,
    defenseBonusPercentage: 40,
    cost: 4000000,
  },
  {
    name: 'Stronghold Level 3',
    level: 9,
    levelRequirement: 40,
    hitpoints: 2000,
    costPerRepairPoint: 550,
    goldPerTurn: 9000,
    defenseBonusPercentage: 45,
    cost: 5000000,
  },
  {
    name: 'Fortress',
    level: 10,
    levelRequirement: 45,
    hitpoints: 2500,
    costPerRepairPoint: 675,
    goldPerTurn: 10000,
    defenseBonusPercentage: 50,
    cost: 7500000,
  },
  {
    name: 'Fortress Level 2',
    level: 11,
    levelRequirement: 50,
    hitpoints: 3000,
    costPerRepairPoint: 750,
    goldPerTurn: 11000,
    defenseBonusPercentage: 55,
    cost: 10000000,
  },
  {
    name: 'Fortress Level 3',
    level: 12,
    levelRequirement: 55,
    hitpoints: 3500,
    costPerRepairPoint: 875,
    goldPerTurn: 12000,
    defenseBonusPercentage: 60,
    cost: 15000000,
  },
  {
    name: 'Citadel',
    level: 13,
    levelRequirement: 60,
    hitpoints: 4000,
    costPerRepairPoint: 1150,
    goldPerTurn: 13000,
    defenseBonusPercentage: 65,
    cost: 20000000,
  },
  {
    name: 'Citadel Level 2',
    level: 14,
    levelRequirement: 65,
    hitpoints: 4500,
    costPerRepairPoint: 1550,
    goldPerTurn: 14000,
    defenseBonusPercentage: 70,
    cost: 30000000,
  },
  {
    name: 'Citadel Level 3',
    level: 15,
    levelRequirement: 70,
    hitpoints: 5000,
    costPerRepairPoint: 1850,
    goldPerTurn: 15000,
    defenseBonusPercentage: 75,
    cost: 40000000,
  },
  {
    name: 'Castle',
    level: 16,
    levelRequirement: 75,
    hitpoints: 5500,
    costPerRepairPoint: 2100,
    goldPerTurn: 16000,
    defenseBonusPercentage: 80,
    cost: 50000000,
  },
  {
    name: 'Castle Level 2',
    level: 17,
    levelRequirement: 80,
    hitpoints: 6000,
    costPerRepairPoint: 2900,
    goldPerTurn: 17000,
    defenseBonusPercentage: 85,
    cost: 75000000,
  },
  {
    name: 'Castle Level 3',
    level: 18,
    levelRequirement: 85,
    hitpoints: 6500,
    costPerRepairPoint: 3600,
    goldPerTurn: 18000,
    defenseBonusPercentage: 90,
    cost: 100000000,
  },
  {
    name: 'Kingdom',
    level: 19,
    levelRequirement: 90,
    hitpoints: 7000,
    costPerRepairPoint: 5000,
    goldPerTurn: 19000,
    defenseBonusPercentage: 95,
    cost: 150000000,
  },
  {
    name: 'Kingdom Level 2',
    level: 20,
    levelRequirement: 95,
    hitpoints: 7500,
    costPerRepairPoint: 6750,
    goldPerTurn: 20000,
    defenseBonusPercentage: 100,
    cost: 200000000,
  },
  {
    name: 'Kingdom Level 3',
    level: 21,
    levelRequirement: 100,
    hitpoints: 8000,
    costPerRepairPoint: 7500,
    goldPerTurn: 21000,
    defenseBonusPercentage: 105,
    cost: 250000000,
  },
  {
    name: 'Empire',
    level: 22,
    levelRequirement: 105,
    hitpoints: 8500,
    costPerRepairPoint: 8250,
    goldPerTurn: 22000,
    defenseBonusPercentage: 110,
    cost: 300000000,
  },
  {
    name: 'Empire Level 2',
    level: 23,
    levelRequirement: 110,
    hitpoints: 9000,
    costPerRepairPoint: 9000,
    goldPerTurn: 23000,
    defenseBonusPercentage: 115,
    cost: 350000000,
  },
  {
    name: 'Empire Level 3',
    level: 24,
    levelRequirement: 115,
    hitpoints: 9500,
    costPerRepairPoint: 9750,
    goldPerTurn: 24000,
    defenseBonusPercentage: 120,
    cost: 400000000,
  },
];