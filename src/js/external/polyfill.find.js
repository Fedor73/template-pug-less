/* Polyfill service v3.25.1
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 * 
 * UA detected: chrome/68.0.0
 * Features requested: Array.prototype.find
 * 
 * - Object.defineProperty, License: CC0 (required by "Array.prototype.find")
 * - Array.prototype.find, License: CC0 */

(function (undefined) {
    if (!(// In IE8, defineProperty could only act on DOM elements, so full support
        // for the feature requires the ability to set a property on an arbitrary object
        'defineProperty' in Object && (function () {
            try {
                var a = {};
                Object.defineProperty(a, 'test', { value: 42 });
                return true;
            } catch (e) {
                return false
            }
        }()))) {

        // Object.defineProperty
        (function (nativeDefineProperty) {

            var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
            var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
            var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

            Object.defineProperty = function defineProperty(object, property, descriptor) {

                // Where native support exists, assume it
                if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
                    return nativeDefineProperty(object, property, descriptor);
                }

                if (object === null || !(object instanceof Object || typeof object === 'object')) {
                    throw new TypeError('Object.defineProperty called on non-object');
                }

                if (!(descriptor instanceof Object)) {
                    throw new TypeError('Property description must be an object');
                }

                var propertyString = String(property);
                var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
                var getterType = 'get' in descriptor && typeof descriptor.get;
                var setterType = 'set' in descriptor && typeof descriptor.set;

                // handle descriptor.get
                if (getterType) {
                    if (getterType !== 'function') {
                        throw new TypeError('Getter must be a function');
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    Object.__defineGetter__.call(object, propertyString, descriptor.get);
                } else {
                    object[propertyString] = descriptor.value;
                }

                // handle descriptor.set
                if (setterType) {
                    if (setterType !== 'function') {
                        throw new TypeError('Setter must be a function');
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    Object.__defineSetter__.call(object, propertyString, descriptor.set);
                }

                // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
                if ('value' in descriptor) {
                    object[propertyString] = descriptor.value;
                }

                return object;
            };
        }(Object.defineProperty));

    }

    if (!('find' in Array.prototype)) {

        // Array.prototype.find
        Object.defineProperty(Array.prototype, 'find', {
            configurable: true,
            value: function find(callback) {
                if (this === undefined || this === null) {
                    throw new TypeError(this + ' is not an object');
                }

                if (typeof callback !== 'function') {
                    throw new TypeError(callback + ' is not a function');
                }

                var
                    object = Object(this),
                    scope = arguments[1],
                    arraylike = object instanceof String ? object.split('') : object,
                    length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
                    index = -1,
                    element;

                while (++index < length) {
                    if (index in arraylike) {
                        element = arraylike[index];

                        if (callback.call(scope, element, index, object)) {
                            return element;
                        }
                    }
                }
            },
            writable: true
        });

    }

})
    .call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});