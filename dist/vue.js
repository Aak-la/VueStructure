(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {};
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    var oldArrayProtoMethods = Array.prototype;
    var ArrayProtoMethods = Object.create(oldArrayProtoMethods);
    var methods = ["push", "pop", "unshift", "shift", "splice"];
    methods.forEach(function (item) {
      ArrayProtoMethods[item] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var result = oldArrayProtoMethods[item].apply(this, args);
        var inserted;
        switch (item) {
          case "push":
          case "unshift":
            inserted = args;
            break;
          case "splice":
            inserted = args.splice(2);
            break;
        }
        var ob = this.__ob__;
        if (inserted) {
          ob.ObserverArray(inserted);
        }
        return result;
      };
    });

    function observer(data) {
      if (_typeof(data) != 'object' || data == null) {
        return data;
      }
      return new Observer(data);
    }
    var Observer = /*#__PURE__*/function () {
      function Observer(value) {
        _classCallCheck(this, Observer);
        Object.defineProperty(value, "__ob__", {
          enumerable: false,
          value: this
        });
        if (Array.isArray(value)) {
          value.__proto__ = ArrayProtoMethods;
          this.ObserverArray(value);
        } else {
          this.walk(value);
        }
      }
      _createClass(Observer, [{
        key: "walk",
        value: function walk(data) {
          var keys = Object.keys(data);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = data[key];
            defineReactive(data, key, value);
          }
        }
      }, {
        key: "ObserverArray",
        value: function ObserverArray(value) {
          for (var i = 0; i < value.length; i++) {
            observer(value[i]);
          }
        }
      }]);
      return Observer;
    }();
    function defineReactive(data, key, value) {
      observer(value);
      Object.defineProperty(data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          if (newValue == value) return value;
          observer(newValue);
          value = newValue;
        }
      });
    }

    function initState(vm) {
      var ops = vm.$options;
      if (ops.data) {
        initData(vm);
      }
      if (ops.props) ;
      if (ops.watch) ;
      if (ops.methods) ;
      if (ops.computed) ;
    }
    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === "function" ? data.call(vm) : data;
      for (var key in data) {
        proxy(vm, "_data", key);
      }
      observer(data);
    }
    function proxy(vm, source, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[source][key];
        },
        set: function set(newValue) {
          vm[source][key] = newValue;
        }
      });
    }

    function Vue(options) {
      this._init(options);
      var vm = this;
      vm.$options = options, initState(vm);
    }
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
