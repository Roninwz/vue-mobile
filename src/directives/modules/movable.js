/**
 * @author Roninwz
 * @description 跟随鼠标移动指令
 * condition:  元素为相对relative/固定fixed定位/absolute绝对定位
 **/
export default {
  key: 'movable',
  func: {
    bind(el) {
      const agent = window.navigator.userAgent.toLowerCase();
       let start,
        move,
        end;
      // 判断当前是移动端还是PC，移动端监听touch，PC监听mouse
      if (['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod'].some((i) => agent.indexOf(i) > 0)) {
        start = 'touchstart';
        move = 'touchmove';
        end = 'touchend';
      } else {
        start = 'mousedown';
        move = 'mousemove';
        end = 'mouseup';
      }
      // 添加事件开始监听
      el.addEventListener(start, (e) => {
        // 读取事件开始时，触摸或鼠标按下的坐标，以及容器当前所在位置，并声明两个函数对象，供后面添加和取消监听用
        const cur = e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY },
          x = el.offsetLeft,
          y = el.offsetTop,
          prevent = function() {
            event.preventDefault();
          },
          moveFun = function() {
            const wDom = 100; // 移动元素的宽
            const hDom = 100; // 移动元素的高 -- 溢出
            if (event.touches) {
              // left距离
              if (event.touches[0].clientX - cur.x + x > 0) {
                if (event.touches[0].clientX > screen.width) {
                  el.style.left = screen.width - wDom + 'px';
                } else {
                  el.style.left = event.touches[0].clientX - cur.x + x + 'px';
                }
              } else {
                el.style.left = 0 + 'px';
              }

              // top距离
              if (event.touches[0].clientY - cur.y + y > 0) {
                if (event.touches[0].clientY > screen.height - hDom) {
                  el.style.top = screen.height - hDom + 'px';
                } else {
                  el.style.top = event.touches[0].clientY - cur.y + y + 'px';
                }
              } else {
                el.style.top = 0 + 'px';
              }
            } else {
              if (event.clientX - cur.x + x > 0) {
                if (event.clientX > screen.width) {
                  el.style.left = screen.width - wDom + 'px';
                } else {
                  el.style.left = event.clientX - cur.x + x + 'px';
                }
              } else {
                el.style.left = 0 + 'px';
              }
              if (event.clientY - cur.y + y > 0) {
                if (event.clientY > screen.height - hDom) {
                  el.style.top = screen.height - hDom + 'px';
                } else {
                  el.style.top = event.clientY - cur.y + y + 'px';
                }
              } else {
                el.style.top = 0 + 'px';
              }
            }
            // 阻止移动端屏幕移动
            window.addEventListener('touchmove', prevent, { passive: false });
          };
        // 监听move并修改位置
        el.addEventListener(move, moveFun);
        // 声明一个移除处理函数对象
        const endFun = function() {
          el.removeEventListener(move, moveFun);
          el.removeEventListener(move, endFun);
          window.removeEventListener('touchmove', prevent);
        };
        // 监听到事件结束时，移除start以外的监听
        el.addEventListener(end, endFun);
      });
    },
  },
};
