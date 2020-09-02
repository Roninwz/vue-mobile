
/**
 * @author Roninwz
 * function: 注册指令文件
 * use:      ***
 */
import modulesArr from './modules';
const directives = modulesArr;
export default {
  install: (Vue) => {
    if (directives.length && directives.length > 0) {
      directives.map((item) => {
        Vue.directive(item.key, item.func);
      });
    }
  },
};
