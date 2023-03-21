import { observer } from "./observer/index.js"

export function initState(vm) {
    let ops = vm.$options
    if (ops.data) {
        initData(vm)
    }
    if (ops.props) {
        initProps(vm)
    }
    if (ops.watch) {
        initWatch(vm)
    }
    if (ops.methods) {
        initComputed(vm)
    }
    if (ops.computed) {
        initMethods(vm)
    }

}
function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === "function" ? data.call(vm) : data
    for (const key in data) {
        proxy(vm, "_data", key)
    }
    observer(data)
}
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }

    })

}
function initProps() {

}
function initWatch() {

}
function initComputed() {

}
function initMethods() {

}