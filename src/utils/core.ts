import Matter, { Engine, Render, Runner, Bodies, Composite, Body, Events } from 'matter-js';
import Balloon from './Balloon.ts';

// 创建物理世界的边界
function createBoundaries (world: Matter.World, width: number, height: number) {
  const ground = Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true });
  const ceiling = Bodies.rectangle(width / 2, -10, width, 20, { 
    restitution: 0.9, // 弹性
    isStatic: true });
  const leftWall = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true});
  const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true});
  Composite.add(world, [ground, ceiling, leftWall, rightWall]);
}

// 创建多个气球实例
function createBalloons(world: Matter.World, count = 20, container: HTMLElement, onExplode: (balloon: Balloon) => void) {
  const { width, height } = container.getBoundingClientRect();
  return Array.from({ length: count }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.3 + height * 0.7; // 随机位置 (底部 30% 区域)
    const radius = 30 + Math.random() * 20; // 随机半径 (30-50)
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    const balloon = new Balloon(x, y, radius, color);
    balloon.add(world, ".balloons-container");
    balloon.onExplode(() => onExplode(balloon));
    return balloon;
  });
}

// 为每个气球添加轻微的扰动
function applyRandomForces(balloons: Balloon[], forceMagnitude = 0.001) {
  balloons.forEach((balloon) => {
    Body.applyForce(balloon.body, balloon.body.position, {
      x: (Math.random() - 0.5) * forceMagnitude,
      y: (Math.random() - 0.5) * forceMagnitude,
    })
  })
}

// 初始化物理引擎和渲染器
function setupEngineAndRender(canvas: HTMLCanvasElement, container: HTMLElement) {
  const { width, height } = container.getBoundingClientRect();
  const engine = Engine.create();
  const render = Render.create({
    canvas,
    engine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'transparent',
    },
  });

  return { engine, render, width, height };
}

// 初始化按钮逻辑
function setupToggle(engine: Matter.Engine, balloons: Balloon[]) {
  const button = document.getElementById("toggle-gravity");
  if (button === null) return console.error("按钮未找到");

  let gravityEnabled = false;
  button.addEventListener("click", () => {
    gravityEnabled = !gravityEnabled;
    engine.gravity.y = gravityEnabled ? -0.1 : 0;
    button.textContent = gravityEnabled ? `禁用\n重力` : `启用\n重力`;

    if (gravityEnabled) {
      balloons.forEach(balloon => {
        const explodeTime = 5000 + Math.random() * 10000;
        setTimeout(() => balloon.explode(), explodeTime);
      });
    }
  });
}

function main(canvas: HTMLCanvasElement, container: HTMLElement) {
  // 初始化物理引擎和渲染器
  const { engine, render, width, height } = setupEngineAndRender(canvas, container);
  const world = engine.world;

  // 创建物理世界边界
  createBoundaries(world, width, height);
  // 创建气球
  const balloons = createBalloons(world, 20, container, balloon => {
    console.log(`气球爆炸, 剩余气球: ${balloons.length - 1}`);
  });
  // 启动引擎和渲染器
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);
  
  //==========================================================================================
  //=========================================== 运行中 ========================================
  //==========================================================================================
  
  // 添加事件监听

  // 添加随机扰动
  Events.on(engine, "beforeUpdate", () => {
    applyRandomForces(balloons);
  });

  // 更新气球 DOM 的位置
  Events.on(engine, "afterUpdate", () => {
    balloons.forEach((balloon) => balloon.updatePosition());
  })

  // 设置重力切换按钮逻辑
  setupToggle(engine, balloons);
}


export default main;