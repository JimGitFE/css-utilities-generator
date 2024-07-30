"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
console.log((0, helpers_1.filterClasses)(["c--color-functional-alert-100"])); // {color: var(--color-functional-alert-100)}
console.log((0, helpers_1.filterClasses)(["color--color-functional-alert-100"])); // {color: var(--color-functional-alert-100)}
console.log((0, helpers_1.filterClasses)(["d-flex"])); // {display: flex}
console.log((0, helpers_1.filterClasses)(["d-f"])); // {display: flex}
console.log((0, helpers_1.filterClasses)(["display-f"])); // {display: flex}
console.log((0, helpers_1.filterClasses)(["display-flex"])); // {display: flex}
console.log((0, helpers_1.filterClasses)(["fs-125"])); // {font-size: 125abc}
console.log((0, helpers_1.filterClasses)(["fi-any"])); // {filter: any}
//# sourceMappingURL=test.js.map