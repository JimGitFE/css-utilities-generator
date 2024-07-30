import { filterClasses } from "../helpers";

console.log(filterClasses(["c--color-functional-alert-100"])) // {color: var(--color-functional-alert-100)}
console.log(filterClasses(["color--color-functional-alert-100"])) // {color: var(--color-functional-alert-100)}

console.log(filterClasses(["d-flex"])) // {display: flex}
console.log(filterClasses(["d-f"])) // {display: flex}
console.log(filterClasses(["display-f"])) // {display: flex}
console.log(filterClasses(["display-flex"])) // {display: flex}

console.log(filterClasses(["fs-125"])) // {font-size: 125abc}
console.log(filterClasses(["fi-any"])) // {filter: any}