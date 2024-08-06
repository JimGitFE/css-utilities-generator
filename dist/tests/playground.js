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
/* with config:
 * acceptAnyValue: true
 */
console.log((0, helpers_1.filterClasses)(["h-100"])); // {height: 100px}
console.log((0, helpers_1.filterClasses)(["h-100%"])); // {height: 100%}
console.log((0, helpers_1.filterClasses)(["h-mxc"])); // {height: max-content}
console.log((0, helpers_1.filterClasses)(["height-100"])); //
/* with config:
* onlyDictionary: false
*/
console.log((0, helpers_1.filterClasses)(["h-100"])); // {height: 100px}
console.log((0, helpers_1.filterClasses)(["h-100%"])); // {height: 100%}
console.log((0, helpers_1.filterClasses)(["h-mxc"])); // {height: max-content}
console.log((0, helpers_1.filterClasses)(["height-100"])); // {height: 100px}
/* with config:
* acceptAnyKey: true
*/
console.log((0, helpers_1.filterClasses)(["h-100"])); // {height: 100px}
console.log((0, helpers_1.filterClasses)(["height-100"])); // {height: 100px}
console.log((0, helpers_1.filterClasses)(["h-mxc"])); // {height: max-content}
console.log((0, helpers_1.filterClasses)(["h-100%"])); //
/* with config:
* onlyDictionary: true
*/
console.log((0, helpers_1.filterClasses)(["h-100"])); // {height: 100px}
console.log((0, helpers_1.filterClasses)(["h-mxc"])); // {height: max-content}
console.log((0, helpers_1.filterClasses)(["h-100%"])); //
console.log((0, helpers_1.filterClasses)(["height-100"])); //
console.log((0, helpers_1.filterClasses)(["h-100", "bto-2"])); //
//# sourceMappingURL=playground.js.map