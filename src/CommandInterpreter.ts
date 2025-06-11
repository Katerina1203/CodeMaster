export function executeCommandsFromInput(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  commands: string[]
) {
  commands.forEach((command, index) => {
    scene.time.delayedCall(index * 600, () => {
      executeCommand(scene, sprite, command);
    });
  });
}

function executeCommand(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  command: string
) {
  const distance = 50;
  const anims = sprite.anims;
  const key = command.trim().toLowerCase();

  switch (key) {
    case 'move right':
      if (!anims.animationManager.exists('walk-right')) return console.warn('❌ walk-right missing');
      anims.play('walk-right', true);
      scene.tweens.add({
        targets: sprite,
        x: sprite.x + distance,
        duration: 400,
        onComplete: () => anims.stop()
      });
      break;

    case 'move left':
      if (!anims.animationManager.exists('walk-left')) return console.warn('❌ walk-left missing');
      anims.play('walk-left', true);
      scene.tweens.add({
        targets: sprite,
        x: sprite.x - distance,
        duration: 400,
        onComplete: () => anims.stop()
      });
      break;

    case 'move up':
      if (!anims.animationManager.exists('walk-up')) return console.warn('❌ walk-up missing');
      anims.play('walk-up', true);
      scene.tweens.add({
        targets: sprite,
        y: sprite.y - distance,
        duration: 400,
        onComplete: () => anims.stop()
      });
      break;

    case 'move down':
      if (!anims.animationManager.exists('walk-down')) return console.warn('❌ walk-down missing');
      anims.play('walk-down', true);
      scene.tweens.add({
        targets: sprite,
        y: sprite.y + distance,
        duration: 400,
        onComplete: () => anims.stop()
      });
      break;

    default:
      console.warn(`⚠️ Непозната команда: "${command}"`);
  }
}
