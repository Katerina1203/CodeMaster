import Phaser from 'phaser';
import { levels } from '../classes/levels';
import { executeCommandsFromInput } from '../CommandInterpreter';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private currentLevelIndex = 0;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.spritesheet('hero', 'assets/hero.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    // Add this to debug loading
    this.load.on('complete', () => {
        console.log('Assets loaded successfully');
    });
}
  create() {
    this.createAnimations();

    const level = levels[this.currentLevelIndex];

    this.player = this.physics.add.sprite(level.start.x, level.start.y, 'hero');

    console.log(`Ниво ${level.id}: ${level.description}`);

    executeCommandsFromInput(this, this.player, level.commands);
  }

  createAnimations() {
      if (!this.textures.exists('hero')) {
          console.error('Hero texture not loaded');
          return;
      }
  
      const frameConfig = {
          frameWidth: 64,
          frameHeight: 64
      };
  
      this.anims.create({
          key: 'walk-down',
          frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 5 }),
          frameRate: 8,
          repeat: -1
      });
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('hero', { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('hero', { start: 18, end: 23 }),
      frameRate: 8,
      repeat: -1
    });

   
  }
}
