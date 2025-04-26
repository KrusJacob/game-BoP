import { enemiesToLocation } from "@/types/enemy.types";

export const ENEMIES_TO_DARK_FOREST: enemiesToLocation = {
  enemies: [
    [{ name: "beast" }, { name: "beast_2" }],
    [{ name: "beast" }, { name: "beast_2" }, { name: "beast_3" }],
    [{ name: "beast_2" }, { name: "beast_3" }],
    [{ name: "beast_2" }, { name: "beast_3" }, { name: "beast_4" }],
    [{ name: "beast_3" }, { name: "beast_4" }],
    [{ name: "beast_3" }, { name: "beast_4" }, { name: "rogue" }],
    [{ name: "beast_4" }, { name: "rogue" }],
    [{ name: "rogue" }, { name: "rogue_2" }, { name: "beast_4" }],
    [{ name: "rogue" }, { name: "rogue_2" }, { name: "rogue_3" }, { name: "beast_4" }],
    [{ name: "rogue_2" }, { name: "rogue_3" }, { name: "beast_4" }],
    [{ name: "rogue_2" }, { name: "rogue_3" }, { name: "rogue_4" }],
    [{ name: "rogue_3" }, { name: "rogue_4" }],
  ],
  legendEnemies: [
    { name: "goldenPig_L", unique: true },
    { name: "swampMonster_L", unique: true },
  ],
};
export const ENEMIES_TO_HIDDEN_CAVE: enemiesToLocation = {
  enemies: [
    [{ name: "goblin" }, { name: "goblin_2" }],
    [{ name: "goblin" }, { name: "goblin_2" }, { name: "goblin_3" }],
    [{ name: "goblin_2" }, { name: "goblin_3" }],
    [{ name: "goblin_2" }, { name: "goblin_3" }, { name: "goblin_4" }],
    [{ name: "goblin_3" }, { name: "goblin_4" }],
    [{ name: "goblin_3" }, { name: "goblin_4" }, { name: "gnome" }],
    [{ name: "goblin_4" }, { name: "gnome" }], //
    [{ name: "gnome" }, { name: "gnome_2" }, { name: "goblin_4" }],
    [{ name: "gnome" }, { name: "gnome_2" }, { name: "gnome_3" }, { name: "goblin_4" }],
    [{ name: "gnome_2" }, { name: "gnome_3" }, { name: "goblin_4" }],
    [{ name: "gnome_2" }, { name: "gnome_3" }, { name: "gnome_4" }],
    [{ name: "gnome_3" }, { name: "gnome_4" }],
  ],
  legendEnemies: [
    { name: "gnomeTrader_L", unique: true },
    { name: "caveHorror_L", unique: true },
  ],
};
export const ENEMIES_TO_AZURE_COAST: enemiesToLocation = {
  enemies: [
    [{ name: "naga" }, { name: "naga_2" }],
    [{ name: "naga" }, { name: "naga_2" }, { name: "naga_3" }],
    [{ name: "naga_2" }, { name: "naga_3" }],
    [{ name: "naga_2" }, { name: "naga_3" }, { name: "naga_4" }],
    [{ name: "naga_3" }, { name: "naga_4" }],
    [{ name: "naga_3" }, { name: "naga_4" }, { name: "skeleton" }],
    [{ name: "naga_4" }, { name: "skeleton" }],
    [{ name: "skeleton" }, { name: "skeleton_2" }, { name: "naga_4" }],
    [{ name: "skeleton" }, { name: "skeleton_2" }, { name: "skeleton_3" }, { name: "naga_4" }],
    [{ name: "skeleton_2" }, { name: "skeleton_3" }, { name: "naga_4" }],
    [{ name: "skeleton_2" }, { name: "skeleton_3" }, { name: "skeleton_4" }],
    [{ name: "skeleton_3" }, { name: "skeleton_4" }],
  ],
  legendEnemies: [
    { name: "seaMonster_L", unique: true },
    { name: "treasureBox_L", unique: true },
  ],
};
