import { sound } from "../constants/sound_data";
import { sleep } from "../utilities/Utility";

export default class SoundEngine {
  constructor() {
    this.backgroundMusic = [];
    this.initialize();
  }

  initialize() {
    this.backgroundMusic.push(new Audio(sound.BG_1));
  }

  async playBackgroundMusic(loop = true) {
    while (loop) {
      for (const audio of this.backgroundMusic) {
        audio.play();
        audio.currentTime = 0;
        await sleep(audio.duration * 1000);
      }
      console.log("looped");
    }
  }
}
