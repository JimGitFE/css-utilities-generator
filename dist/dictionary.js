"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortValues = exports.shortKeys = void 0;
const helpers_1 = require("./helpers");
const units = (0, helpers_1.readConfigFile)().units || "px";
const { extendKeys, extendValues } = (0, helpers_1.readConfigFile)();
const dictionary = {
    shortValues: {
        // Usual but not specific to: 
        a: 'auto',
        n: 'none',
        i: 'inherit',
        /** display, ex. flex */
        f: 'flex',
        /** flex-direction, ex.  column */
        co: 'column',
        cr: 'column-reverse',
        ro: 'row',
        rr: 'row-reverse',
        /** justify-content, ex. Center */
        c: 'center',
        fs: 'flex-start',
        fe: 'flex-end',
        sb: 'space-between',
        sa: 'space-around',
        se: 'space-evenly',
        /** width, ex. fit-content */
        fc: 'fit-content',
        mxc: 'max-content',
        mnc: 'min-content',
        /** Other */
        h: 'hidden',
        v: 'visible',
        s: 'scroll',
        // n: 'none',
        // a: 'auto',
        /** Position */
        re: 'relative',
        ab: 'absolute',
        fi: 'fixed',
        sti: 'sticky',
    },
    shortKeys: {
        /** Margin */
        m: { name: 'margin', valueExtension: units },
        ml: { name: 'margin-left', valueExtension: units },
        mr: { name: 'margin-right', valueExtension: units },
        mt: { name: 'margin-top', valueExtension: units },
        mb: { name: 'margin-bottom', valueExtension: units },
        /** Padding */
        p: { name: 'padding', valueExtension: units },
        pl: { name: 'padding-left', valueExtension: units },
        pr: { name: 'padding-right', valueExtension: units },
        pt: { name: 'padding-top', valueExtension: units },
        pb: { name: 'padding-bottom', valueExtension: units },
        /** Width */
        w: { name: 'width', valueExtension: "%" },
        h: { name: 'height', valueExtension: "%" },
        mnw: { name: 'min-width', valueExtension: "%" },
        mnh: { name: 'min-height', valueExtension: "%" },
        mxw: { name: 'max-width', valueExtension: "%" },
        mxh: { name: 'max-height', valueExtension: "%" },
        /** Font */
        f: { name: 'font', valueExtension: '' },
        fs: { name: 'font-size', valueExtension: units },
        fw: { name: 'font-weight', valueExtension: '' },
        fl: { name: 'font-style', valueExtension: '' },
        ft: { name: 'font-family', valueExtension: '' },
        fv: { name: 'font-variant', valueExtension: '' },
        fh: { name: 'font-stretch', valueExtension: '' },
        d: { name: 'display', valueExtension: '' },
        jc: { name: 'justify-content', valueExtension: '' },
        ai: { name: 'align-items', valueExtension: '' },
        as: { name: 'align-self', valueExtension: '' },
        ac: { name: 'align-content', valueExtension: '' },
        /** Flex */
        // fs: {name: 'flex-shrink', type: ''},
        // fg: {name: 'flex-grow', type: ''},
        fd: { name: 'flex-direction', valueExtension: '' },
        // fb: {name: 'flex-basis', type: ''},
        // fl: {name: 'flex', type: ''},
        // fw: {name: 'flex-wrap', type: ''},
        z: { name: 'z-index', valueExtension: '' },
        /* Grid */
        gtc: { name: 'grid-template-columns', valueExtension: '' },
        gtr: { name: 'grid-template-rows', valueExtension: '' },
        gta: { name: 'grid-template-areas', valueExtension: '' },
        gt: { name: 'grid-template', valueExtension: '' },
        ga: { name: 'grid-auto-columns', valueExtension: '' },
        gar: { name: 'grid-auto-rows', valueExtension: '' },
        gac: { name: 'grid-auto-flow', valueExtension: '' },
        gg: { name: 'grid-gap', valueExtension: units },
        gc: { name: 'grid-column', valueExtension: '' },
        gr: { name: 'grid-row', valueExtension: '' },
        g: { name: 'grid', valueExtension: '' },
        /** Border */
        b: { name: 'border', valueExtension: 'px solid' },
        bto: { name: 'border-top', valueExtension: 'px solid' },
        bbo: { name: 'border-bottom', valueExtension: 'px solid' },
        ble: { name: 'border-left', valueExtension: 'px solid' },
        bri: { name: 'border-right', valueExtension: 'px solid' },
        br: { name: 'border-radius', valueExtension: units },
        /** Other */
        o: { name: 'opacity', valueExtension: '%' },
        ov: { name: 'overflow', valueExtension: '' },
        /** Position */
        pos: { name: 'position', valueExtension: '' },
        /** Color */
        c: { name: 'color', valueExtension: '' },
        cu: { name: 'cursor', valueExtension: '' },
    }
};
const [shortKeys, shortValues] = [Object.assign(Object.assign({}, dictionary.shortKeys), extendKeys), Object.assign(Object.assign({}, dictionary.shortValues), extendValues)];
exports.shortKeys = shortKeys;
exports.shortValues = shortValues;
//# sourceMappingURL=dictionary.js.map