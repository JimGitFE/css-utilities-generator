import { readConfigFile } from "./utils/css";

/** Commands to Action, [isExecutable, pathToExecutable | log text] */
const commandsMap: CommandsMap = {
    'init': { short: "-i", action: [true, 'dist/cli/command/init.js'] },
    'generate': { short: "-g", action: [true, 'dist/cli/command/generator.js'] },
    'check': { short: "-c", action: [true, 'dist/cli/command/check.js'] },
    'watch': { short: "-w", action: [true, 'dist/cli/command/watch.js'] },
    'help': { short: "-h", action: [false, 'Help\n Available commands:\n- init\n- generate\n- check'] }
} as const;

/* User Config (sourced from cuconfig.json) */
const units  = readConfigFile().units || "px"; 
const { extendKeys, extendValues } = readConfigFile()

const dictionary: Dictionary  = {
    shortValues: {
        // Usual but not specific to: 
        a: 'auto',
        n: 'none',
        i: 'inherit',
        
        /** display, ex. flex */
        f: 'flex',
        b: 'block',
        g: 'grid',

        /** flex-direction, ex.  column */
        co: 'column',
        cr: 'column-reverse',
        ro: 'row',
        rr: 'row-reverse',
        
        /** justify-content, ex. Center */
        c: 'center',
        s: 'start',
        e: 'end',
        ba: 'baseline',
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
        sc: 'scroll',
        // n: 'none',
        // a: 'auto',

        /** Position */
        re: 'relative',
        ab: 'absolute',
        fi: 'fixed',
        sti: 'sticky',
    },
    shortKeys:{
    /** Margin */
    m: {name: 'margin', valueExtension: units},
    ml: {name: 'margin-left', valueExtension: units},
    mr: {name: 'margin-right', valueExtension: units},
    mt: {name: 'margin-top', valueExtension: units},
    mb: {name: 'margin-bottom', valueExtension: units},

    /** Padding */
    p: {name: 'padding', valueExtension: units},
    pl: {name: 'padding-left', valueExtension: units},
    pr: {name: 'padding-right', valueExtension: units},
    pt: {name: 'padding-top', valueExtension: units},
    pb: {name: 'padding-bottom', valueExtension: units},

    /** Width */
    w: {name: 'width', valueExtension: "%"},
    h: {name: 'height', valueExtension: "%"},
    mnw: {name: 'min-width', valueExtension: "%"},
    mnh: {name: 'min-height', valueExtension: "%"},
    mxw: {name: 'max-width', valueExtension: "%"},
    mxh: {name: 'max-height', valueExtension: "%"},
    
    /** Font */
    f: {name: 'font', valueExtension: ''},
    fs: {name: 'font-size', valueExtension: units},
    fw: {name: 'font-weight', valueExtension: ''},
    fl: {name: 'font-style', valueExtension: ''},
    ft: {name: 'font-family', valueExtension: ''},
    fv: {name: 'font-variant', valueExtension: ''},
    fh: {name: 'font-stretch', valueExtension: ''},

    d: {name: 'display', valueExtension: ''},
    jc: {name: 'justify-content', valueExtension: ''},
    ai: {name: 'align-items', valueExtension: ''},
    as: {name: 'align-self', valueExtension: ''},
    ac: {name: 'align-content', valueExtension: ''},

    /** Flex */
    // fs: {name: 'flex-shrink', type: ''},
    // fg: {name: 'flex-grow', type: ''},
    fd: {name: 'flex-direction', valueExtension: ''},
    // fb: {name: 'flex-basis', type: ''},
    // fl: {name: 'flex', type: ''},
    // fw: {name: 'flex-wrap', type: ''},
    z: {name: 'z-index', valueExtension: ''},
    gap: { name: "gap", valueExtension: units },

    /** Background */
    bg: { name: "background", valueExtension: "" },
    bgc: { name: "background-color", valueExtension: "" },
    bgi: { name: "background-image", valueExtension: "" },
    bgp: { name: "background-position", valueExtension: "" },

    /* Grid */
    gtc: {name: 'grid-template-columns', valueExtension: ''},
    gtr: {name: 'grid-template-rows', valueExtension: ''},
    gta: {name: 'grid-template-areas', valueExtension: ''},
    gt: {name: 'grid-template', valueExtension: ''},
    ga: {name: 'grid-auto-columns', valueExtension: ''},
    gar: {name: 'grid-auto-rows', valueExtension: ''},
    gac: {name: 'grid-auto-flow', valueExtension: ''},
    gg: {name: 'grid-gap', valueExtension: units},
    gc: {name: 'grid-column', valueExtension: ''},
    gr: {name: 'grid-row', valueExtension: ''},
    g: {name: 'grid', valueExtension: ''},

    /** Border */
    b: {name: 'border', valueExtension: 'px solid'},
    bto: {name: 'border-top', valueExtension: 'px solid'},
    bbo: {name: 'border-bottom', valueExtension: 'px solid'},
    ble: {name: 'border-left', valueExtension: 'px solid'},
    bri: {name: 'border-right', valueExtension: 'px solid'},
    br: {name: 'border-radius', valueExtension: units},

    /** Other */
    o: {name: 'opacity', valueExtension: '%'},
    ov: {name: 'overflow', valueExtension: ''},

    /** Position */
    top: { name: "top", valueExtension: "" },
    left: { name: "left", valueExtension: "" },
    right: { name: "right", valueExtension: "" },
    bottom: { name: "bottom", valueExtension: "" },
    pos: {name: 'position', valueExtension: ''},
    
    /** Color */
    c: {name: 'color', valueExtension: ''},
    
    /** MISC */
    cu: {name: 'cursor', valueExtension: ''},
    pe: { name: "pointer-events", valueExtension: "" },

    }
} as const

const [shortKeys, shortValues]: [Dictionary["shortKeys"], Dictionary["shortValues"]] = [{...dictionary.shortKeys, ...extendKeys}, {...dictionary.shortValues, ...extendValues}];
export { shortKeys, shortValues, commandsMap };