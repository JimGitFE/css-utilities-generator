"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortValues = exports.shortKeys = void 0;
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
    },
    shortKeys: {
        /** Margin */
        m: { name: 'margin', type: 'px' },
        ml: { name: 'margin-left', type: 'px' },
        mr: { name: 'margin-right', type: 'px' },
        mt: { name: 'margin-top', type: 'px' },
        mb: { name: 'margin-bottom', type: 'px' },
        /** Padding */
        p: { name: 'padding', type: 'px' },
        pl: { name: 'padding-left', type: 'px' },
        pr: { name: 'padding-right', type: 'px' },
        pt: { name: 'padding-top', type: 'px' },
        pb: { name: 'padding-bottom', type: 'px' },
        /** Width */
        w: { name: 'width', type: 'px' },
        h: { name: 'height', type: 'px' },
        mnw: { name: 'min-width', type: 'px' },
        mnh: { name: 'min-height', type: 'px' },
        mxw: { name: 'max-width', type: 'px' },
        mxh: { name: 'max-height', type: 'px' },
        /** Font */
        f: { name: 'font', type: '' },
        fs: { name: 'font-size', type: 'px' },
        fw: { name: 'font-weight', type: '' },
        fl: { name: 'font-style', type: '' },
        ft: { name: 'font-family', type: '' },
        fv: { name: 'font-variant', type: '' },
        fh: { name: 'font-stretch', type: '' },
        d: { name: 'display', type: '' },
        jc: { name: 'justify-content', type: '' },
        ai: { name: 'align-items', type: '' },
        as: { name: 'align-self', type: '' },
        ac: { name: 'align-content', type: '' },
        /** Flex */
        // fs: {name: 'flex-shrink', type: ''},
        // fg: {name: 'flex-grow', type: ''},
        fd: { name: 'flex-direction', type: '' },
        // fb: {name: 'flex-basis', type: ''},
        // fl: {name: 'flex', type: ''},
        // fw: {name: 'flex-wrap', type: ''},
        z: { name: 'z-index', type: '' },
        /* Grid */
        gtc: { name: 'grid-template-columns', type: '' },
        gtr: { name: 'grid-template-rows', type: '' },
        gta: { name: 'grid-template-areas', type: '' },
        gt: { name: 'grid-template', type: '' },
        ga: { name: 'grid-auto-columns', type: '' },
        gar: { name: 'grid-auto-rows', type: '' },
        gac: { name: 'grid-auto-flow', type: '' },
        gg: { name: 'grid-gap', type: 'px' },
        gc: { name: 'grid-column', type: '' },
        gr: { name: 'grid-row', type: '' },
        g: { name: 'grid', type: '' }
    }
};
const [shortKeys, shortValues] = [dictionary.shortKeys, dictionary.shortValues];
exports.shortKeys = shortKeys;
exports.shortValues = shortValues;
//# sourceMappingURL=dictionary.js.map