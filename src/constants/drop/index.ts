import { enemyTypeBagDrop } from "@/types/enemy.types";
import { EMPTY_BAG_SLOT } from "../bag";
// import img from "@assets/enemy/lock.png";

export const DROP_ENEMIES: enemyTypeBagDrop = {
  fangsBeast: { ...EMPTY_BAG_SLOT, img: "/src/assets/drop/beast-drop.png", isMoved: false },
  rogueItem: { ...EMPTY_BAG_SLOT, img: "/src/assets/drop/rogue-drop.png", isMoved: false },
  goblinItem: { ...EMPTY_BAG_SLOT, img: "/src/assets/drop/goblin-drop.png", isMoved: false },
  gnomeItem: { ...EMPTY_BAG_SLOT, img: "/src/assets/drop/gnome-drop.png", isMoved: false },
  gillsNaga: { ...EMPTY_BAG_SLOT, img: "/src/assets/drop/naga-drop.png", isMoved: false },
};
