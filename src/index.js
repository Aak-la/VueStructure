import { initMixin } from './init';
import { initState } from './initState';
function Vue(options) {
    this._init(options)
    let vm = this
    vm.$options = options,
        initState(vm)
    if (vm) {

    }
}
initMixin(Vue)
export default Vue