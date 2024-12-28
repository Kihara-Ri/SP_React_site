import { Bodies, Composite, Vector, Body, World } from 'matter-js';
import '../css/balloon.css';

// 随机向量生成函数
function randomVector(){
  const angle = Math.random() * Math.PI * 2;
  return Vector.create(Math.cos(angle), Math.sin(angle));
}

// interface BalloonOptions {
//   x: number;
//   y: number;
//   radius: number;
//   color?: string;
// }

class Balloon {
  public body: Body;
  
  private world: World | null = null;
  private container: string | null = null;
  private isExploded: boolean = false;
  private element: HTMLDivElement;
  private callbacks: Array<(balloon: Balloon) => void> = [];

  constructor(x: number, y: number, radius: number, color = '#e33936') {
    this.body = Bodies.circle(x, y, radius, {
      friction: 0.02,
      frictionAir: 0.03,
      restitution: 0.8,
      render: {
        fillStyle: color,
        strokeStyle: 'black',
        lineWidth: 0
      },
    });
    this.world = null;
    this.container = null;
    this.isExploded = false;

    // 创建 DOM 元素
    this.element = document.createElement("div");
    this.element.className = "balloon";
    this.setupElement(radius, color);
  }
  private setupElement(radius: number, color: string): void {
    // 动态生成渐变背景
    const gradient = this.createGradient(color);

    // 设置 DOM 元素样式
    this.element.style.width = `${radius * 2}px`;
    this.element.style.height = `${radius * 2}px`;
    this.element.style.backgroundColor = gradient; // 使用渐变背景

    // 添加点击事件
    this.element.addEventListener("click", () => this.explode());
  };

  add(world: World, container: string): void {
    this.world = world;
    this.container = container;

    Composite.add(world, this.body);
    const parentContainer = document.querySelector(this.container);
    if (parentContainer) {
      parentContainer.appendChild(this.element);
    }
  };

  updatePosition(): void {
    if (!this.body || !this.container) return;
    const {x, y} = this.body.position;
    
    const container = document.querySelector(this.container) as HTMLElement | null;
    if (!container) return;

    // 获取容器边界
    const containerRect = container.getBoundingClientRect();

    // 考虑页面滚动偏移
    const absoluteLeft = containerRect.left + window.scrollX;
    const absoluteTop = containerRect.top + window.scrollY;

    this.element.style.left = `${absoluteLeft + x}px`;
    this.element.style.top = `${absoluteTop + y}px`;
    this.element.style.transform = `translate(-50%, -50%) rotate(${this.body.angle}rad)`;
  }

  onExplode(callback: (balloon: Balloon) => void): void {
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
  }

  async explode (forceMagnitude = 5, radius = 400, fragmentCount = 25) {
    if(!this.world) {
      console.error("气球上位被添加到物理世界中, 无法爆炸")
      return;
    }
    if (this.isExploded) return; // 如果已经爆炸
    this.isExploded = true;
    console.log("气球爆炸了💥");
    // 调用所有注册的回调函数
    this.callbacks.forEach((callback) => callback(this));

    // 移除DOM元素
    this.element.remove();

    // 模拟膨胀 
    await new Promise<void>((resolve) => {
      const steps = 5;
      const stepTime = 250 / steps;
      let currentScale = 1;
      const expand = () => {
        if (currentScale >= 1.2) {
          resolve(); // 完成膨胀后结束
          return;
        }
        const nextScale = Math.min(1.2, currentScale + 0.04);
        const scaleFactor = nextScale / currentScale;
        currentScale = nextScale;
        Body.scale(this.body, scaleFactor, scaleFactor);
        setTimeout(expand, stepTime);
      };
      expand();
    });

    // 添加碎片
    const {x, y} = this.body.position;
    for (let i = 0; i < fragmentCount; i++) {
      const direction = randomVector();
      const position = Vector.add({x, y}, Vector.mult(direction, radius / 7));
      const fragment = Bodies.circle(position.x, position.y, 2, {
        render: {
          fillStyle: "orange",
          strokeStyle: "orange",
          lineWidth: 1
        }
      });
      Composite.add(this.world, fragment);
      // 给碎片施加初速度
      const velocity = Vector.mult(direction, forceMagnitude);
      Body.setVelocity(fragment, velocity);
    };

    // 施加冲击力
    const bodies = Composite.allBodies(this.world);
    bodies.forEach((body) => {
      // 计算当前物体与气球的距离
      const distance = Vector.magnitude(Vector.sub(body.position, {x, y}));
      if (distance < radius && body !== this.body) {
        // 计算方向和冲击力
        const direction = Vector.normalise(Vector.sub(body.position, {x, y}));
        const force = Vector.mult(direction, forceMagnitude / distance);
        // 应用爆炸力
        Body.applyForce(body, body.position, force);
      }
    });
    // 从物理世界中移除气球
    Composite.remove(this.world, this.body);
  };

  resize(newRadius: number) {
    if(this.world == null) return ;
    const {x, y} = this.body.position;
    Composite.remove(this.world, this.body);
    this.body = Bodies.circle(x, y, newRadius, {
      render: this.body.render
    });
    Composite.add(this.world, this.body);
  };

  // 生成渐变字符串
  private createGradient(baseColor: string): string {
    // 提取颜色值 rgb 格式
    const rgbMatch = baseColor.match(/\d+/g);
    if (!rgbMatch) return baseColor;

    const [r, g, b] = rgbMatch.map(Number);

    // 生成较浅和较深的颜色
    const lighterColor = `rgb(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)})`;
    const darkerColor = `rgb(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(b - 50, 0)})`;

    // 返回CSS渐变字符串
    return `radial-gradient(circle at 50% 30%, ${lighterColor}, ${darkerColor})`;
  }
}

export default Balloon;