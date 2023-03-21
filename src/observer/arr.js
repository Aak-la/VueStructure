let oldArrayProtoMethods = Array.prototype
export let ArrayProtoMethods = Object.create(oldArrayProtoMethods)
let methods = ["push", "pop", "unshift", "shift", "splice"]
methods.forEach(item => {
    ArrayProtoMethods[item] = function (...args) {
        let result = oldArrayProtoMethods[item].apply(this, args)
        let inserted
        switch (item) {
            case "push":
            case "unshift":
                inserted = args
                break;
            case "splice":
                inserted = args.splice(2);
                break;
        }

        let ob = this.__ob__
        if (inserted) {
            ob.ObserverArray(inserted)
        }
        return result
    }
})