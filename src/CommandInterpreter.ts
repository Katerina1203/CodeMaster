export function executeCommandsFromInput(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  commands: string[],
  onComplete?: () => void
) {
  console.log('executeCommandsFromInput CALLED with:', commands);

  if (!commands || commands.length === 0) {
    console.warn(' Няма команди за изпълнение.');
    return;
  }

  commands.forEach((command, index) => {
    const isLast = index === commands.length - 1;

    scene.time.delayedCall(index * 600, () => {
      console.log(` Изпълнява се команда [${index}]: "${command}"`);
      executeCommand(scene, sprite, command, isLast ? onComplete : undefined);
    });
  });
}

function executeCommand(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  command: string,
  onComplete?: () => void
) {
  const distance = 50;
  const anims = sprite.anims;
  const key = command.trim().toLowerCase();

  const playAndMove = (
    animKey: string,
    prop: 'x' | 'y',
    delta: number
  ) => {
    if (!anims.animationManager.exists(animKey)) {
      console.warn(` Анимацията "${animKey}" не съществува`);
      onComplete?.();
      return;
    }

    anims.play(animKey, true);

    const target = prop === 'x'
      ? { x: sprite.x + delta }
      : { y: sprite.y + delta };

    scene.tweens.add({
      targets: sprite,
      ...target,
      duration: 400,
      onComplete: () => {
        anims.stop();
        onComplete?.();
      }
    });
  };

  switch (key) {
    case 'move right':
      playAndMove('walk-right', 'x', distance);
      break;

    case 'move left':
      playAndMove('walk-left', 'x', -distance);
      break;

    case 'move up':
      playAndMove('walk-up', 'y', -distance);
      break;

    case 'move down':
      playAndMove('walk-down', 'y', distance);
      break;

    default:
      console.warn(` Непозната команда: "${command}"`);
      onComplete?.();
  }
}