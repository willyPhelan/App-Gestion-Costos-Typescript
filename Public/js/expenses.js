"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    ArrayList.prototype.add = function (item) {
        this.items.push(item);
    };
    ArrayList.prototype.get = function (index) {
        var item = this.items.filter(function (f, i) {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    };
    ArrayList.prototype.createFrom = function (value) {
        this.items = __spreadArray([], value, true);
    };
    ArrayList.prototype.getAll = function () {
        return this.items;
    };
    return ArrayList;
}());
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses = new ArrayList();
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    };
    Expenses.prototype.get = function (index) {
        return this.expenses.get(index);
    };
    Expenses.prototype.getItems = function () {
        return this.expenses.getAll();
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.expenses.getAll().reduce(function (acc, item) {
            return acc += _this.convertCurrency(item, _this.finalCurrency);
        }, 0);
        return "".concat(this.finalCurrency, " $").concat(total.toFixed(2).toString());
    };
    Expenses.prototype.remove = function (id) {
        var items = this.getItems().filter(function (item) {
            return item.id !== id;
        });
        this.expenses.createFrom(items);
        return true;
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'ARG':
                        return item.cost.number * 280;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'ARG':
                switch (currency) {
                    case 'USD':
                        return item.cost.number / 280;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default: return 0;
        }
    };
    return Expenses;
}());
