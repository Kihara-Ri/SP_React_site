import Matter, { Engine, Render, Runner, Bodies, Composite, Body, Events } from 'matter-js';
import Balloon from './Balloon.ts';

// 创建物理世界的边界
function createBoundaries (world: Matter.World, parentContainer: HTMLElement) {
  const parentContainerRect = parentContainer.getBoundingClientRect();
  const width = parentContainerRect.right - parentContainerRect.left;
  const height = parentContainerRect.bottom - parentContainerRect.top;

  const ground = Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true });
  const ceiling = Bodies.rectangle(width / 2, -10, width, 20, { 
    restitution: 0.9, // 弹性
    isStatic: true });
  const leftWall = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true});
  const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true});
  Composite.add(world, [ground, ceiling, leftWall, rightWall]);
}

// 创建多个气球实例
function createBalloons(world: Matter.World, balloonCount = 20, parentContainer: HTMLElement, onExplodeCallback: (arg: Balloon) => void) {
  const rect = parentContainer.getBoundingClientRect();
  const pWidth = rect.right - rect.left;
  const pHeight = rect.bottom - rect.top;
  
  const balloons = [];
  for (let i = 0; i < balloonCount; i++) {
    const x = Math.random() * pWidth;
    const y = (Math.random() * 0.3 + 0.7) * pHeight;
    const radius = 30 + Math.random() * 20; // 随机半径(30-50)
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; // 随机颜色
    const balloon = new Balloon(x, y, radius, color);

    balloon.add(world, ".balloons-container");
    balloons.push(balloon);

    // 监听气球爆炸事件
    balloon.onExplode(() => {
      onExplodeCallback(balloon);
    })
  }
  return balloons;
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
function setupEngineAndRender(selector = '.balloons-container') {
  const element = document.body.querySelector(selector);
  let parentContainer: HTMLElement | null = null;
  if (element === null) {
    return console.error(`渲染器挂载失败: 没有找到 selector: ${selector}`);
  } else {
    console.log(`画布挂载: ${element}`)
    parentContainer = element as HTMLElement;
    const parentContainerRect = parentContainer.getBoundingClientRect();

    // 计算父容器尺寸
    const pWidth = parentContainerRect.right - parentContainerRect.left;
    const pHeight = parentContainerRect.bottom - parentContainerRect.top;

    const engine = Engine.create();
    const render = Render.create({
      element: parentContainer,
      engine: engine,
      options: {
        // 按照父容器尺寸添加画布
        width: pWidth,
        height: pHeight,
        wireframes: false, // 线框模式 true不渲染颜色
        background: 'transparent', // 透明, 防止遮挡页面其它元素
      }
    });
  
    // 设置画布样式
    const canvas = render.canvas;
    canvas.style.border = '0';
    canvas.style.borderRadius = '12px';
  
    engine.gravity.y = 0;
    console.log("渲染器挂载成功");
    return { engine, render, parentContainer, canvas};
  };
};

// 初始化按钮逻辑
function setupToggle(engine: Matter.Engine, balloons: Balloon[]) {
  const toggleButton = document.getElementById("toggle-gravity");
  if (toggleButton === null) return console.error("按钮寻找失败");
  let gravityEnabled = false;
  toggleButton.addEventListener("click", () => {
    if (!gravityEnabled) {
      // 启用重力
      gravityEnabled = true;
      engine.gravity.y = -0.1;
      toggleButton.textContent = `禁用\n重力`;

      // 为每个气球设置爆炸计时器
      balloons.forEach((balloon) => {
        const explodeTime = 5000 + Math.random() * 10000;
        setTimeout(() => {
          balloon.explode();
        }, explodeTime);
      });
    } else {
      // 禁用重力
      gravityEnabled = false;
      engine.gravity.y = 0;
      toggleButton.textContent = `启用\n重力`;
    }
  });
}

function main() {
  // 初始化物理引擎和渲染器
  const setup = setupEngineAndRender();
  if (!setup) {
    console.error("engine 和 render 初始化失败");
  } else {
    const { engine, render, parentContainer, canvas } = setup;

    const world = engine.world;
    // 创建物理世界边界
    createBoundaries(world, parentContainer);

    // 创建气球
    let remainingBalloons = 20;
    const balloons = createBalloons(world, remainingBalloons, parentContainer, (explodedBalloon) => {
      remainingBalloons--;
      console.log(`剩余气球: ${remainingBalloons}`);
      if (remainingBalloons === 0) {
        console.log("气球全部爆炸💥💥💥");
      }
    });
    // 启动引擎和渲染器
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    //==========================================================================================
    //=========================================== 运行中 ========================================
    //==========================================================================================
    // 为每帧添加随机力
    Events.on(engine, "beforeUpdate", () => {
      applyRandomForces(balloons);
    });

    // 监视更新画布尺寸
    Events.on(engine, "before", () => {
      const rect = parentContainer.getBoundingClientRect();

      canvas.width = rect.right - rect.left;
      canvas.height = rect.top - rect.bottom;
    })

    // 更新气球 DOM 的位置
    Events.on(engine, "afterUpdate", () => {
      balloons.forEach((balloon) => balloon.updatePosition());
    })

    // 设置重力切换按钮逻辑
    setupToggle(engine, balloons);
    }
}

export default main;