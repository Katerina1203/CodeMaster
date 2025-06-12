import Phaser from 'phaser';
import { levels } from '../classes/levels';
import { executeCommandsFromInput } from '../CommandInterpreter';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private currentLevelIndex = 0;
  private goalPosition!: { x: number; y: number };

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('tiles', 'tilemap.png');
    this.load.tilemapTiledJSON('map', 'lvl1.json');

    this.load.spritesheet('hero', 'hero.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    this.load.on('complete', () => {
        console.log('Assets loaded successfully');
    });
}

  create() { 
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tilemap', 'tiles', 16, 16, 0, 0);
    map.createLayer(0, tileset!, 0, 0);

    this.createAnimations();
    this.loadLevel(this.currentLevelIndex);

    const runBtn = document.getElementById('run-btn')!;
    runBtn.addEventListener('click', () => {
      const input = (document.getElementById('command-input') as HTMLTextAreaElement).value;
      const commands = input
        .split('\n')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      if (commands.length === 0) return;

      executeCommandsFromInput(this, this.player, commands, () => {
        this.checkGoalReached();
      });
    });

    const nextBtn = document.getElementById('next-level')!;
    nextBtn.addEventListener('click', () => {
      this.currentLevelIndex++;
      if (this.currentLevelIndex < levels.length) {
        this.scene.restart();
      } else {
        alert('Всички нива са завършени!');
      }
    });
  }

  loadLevel(index: number) {
    const level = levels[index];
    this.goalPosition = level.goal;

    const title = document.getElementById('level-title')!;
    const desc = document.getElementById('level-desc')!;
    const input = document.getElementById('command-input') as HTMLTextAreaElement;
    const modal = document.getElementById('success-modal')!;

    title.textContent = `Ниво ${level.id}`;
    desc.textContent = level.description;
    input.value = '';
    modal.style.display = 'none';

    this.player = this.physics.add.sprite(level.start.x, level.start.y, 'hero');
  }

  checkGoalReached() {
    const margin = 10;
    const dx = Math.abs(this.player.x - this.goalPosition.x);
    const dy = Math.abs(this.player.y - this.goalPosition.y);
    if (dx < margin && dy < margin) {
      const modal = document.getElementById('success-modal')!;
      modal.style.display = 'block';
    } else {
      const log = document.getElementById('log')!;
      log.textContent = 'Не си достигнал целта.';
    }
  }

  createAnimations() {
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
