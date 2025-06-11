export const levels = [
  {
    id: 1,
    description: 'Отиди два пъти надясно и веднъж надолу',
    start: { x: 100, y: 100 },
    goal: { x: 200, y: 150 },
    commands: ['move right', 'move right', 'move down']
  },
  {
    id: 2,
    description: 'Изкачи се и наляво',
    start: { x: 150, y: 200 },
    goal: { x: 100, y: 100 },
    commands: ['move up', 'move up', 'move left']
  }
];
