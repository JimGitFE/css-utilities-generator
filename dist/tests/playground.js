"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
// console.log(filterClasses(["c--color-functional-alert-100"])) // {color: var(--color-functional-alert-100)}
// console.log(filterClasses(["color--color-functional-alert-100"])) // {color: var(--color-functional-alert-100)}
// console.log(filterClasses(["d-flex"])) // {display: flex}
// console.log(filterClasses(["d-f"])) // {display: flex}
// console.log(filterClasses(["display-f"])) // {display: flex}
// console.log(filterClasses(["display-flex"])) // {display: flex}
// console.log(filterClasses(["fs-125"])) // {font-size: 125abc}
// console.log(filterClasses(["fi-any"])) // {filter: any}
// /* with config:
//  * acceptAnyValue: true
//  */
// console.log(filterClasses(["h-100"])) // {height: 100px}
// console.log(filterClasses(["h-100%"])) // {height: 100%}
// console.log(filterClasses(["h-mxc"])) // {height: max-content}
// console.log(filterClasses(["height-100"])) //
// /* with config:
// * onlyDictionary: false
// */
// console.log(filterClasses(["h-100"])) // {height: 100px}
// console.log(filterClasses(["h-100%"])) // {height: 100%}
// console.log(filterClasses(["h-mxc"])) // {height: max-content}
// console.log(filterClasses(["height-100"])) // {height: 100px}
// /* with config:
// * acceptAnyKey: true
// */
// console.log(filterClasses(["h-100"])) // {height: 100px}
// console.log(filterClasses(["height-100"])) // {height: 100px}
// console.log(filterClasses(["h-mxc"])) // {height: max-content}
// console.log(filterClasses(["h-100%"])) //
// /* with config:
// * onlyDictionary: true
// */
// console.log(filterClasses(["h-100"])) // {height: 100px}
// console.log(filterClasses(["h-mxc"])) // {height: max-content}
// console.log(filterClasses(["h-100%"])) //
// console.log(filterClasses(["height-100"])) //
// console.log(filterClasses(["h-100", "bto-2"])) //
(0, helpers_1.filterClasses)(["h-50-hover"])[3];
(0, helpers_1.filterClasses)(["h-50hover"])[3];
(0, helpers_1.filterClasses)(["h-50"]);
//# sourceMappingURL=playground.js.map