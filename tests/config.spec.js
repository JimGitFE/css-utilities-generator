const { filterClasses } = require('../dist/helpers.js');
const { createConfigFile, deleteConfigFile } = require('../dist/tests/util.js');

// onlyDictionary Config

test('Accept only keys & values in dictionary {"onlyDictionary": true} ', () => {
    // Test proeprties in dictionary
    const attributes = ["height-25px", "anykey-anyvalue"]
    
    // Usage
    createConfigFile({"onlyDictionary": true});
    
    expect(filterClasses(attributes)).toEqual([
        
    ]);
});

test('Accept any property key & value {"onlyDictionary": false}', () => {
    // Test any properties
    const attributes = ["height-2rem", "anykey-anyvalue"]
    
    // Usage
    createConfigFile({"onlyDictionary": false});
    
    expect(filterClasses(attributes)).toEqual([ 
        { fullClass: 'height-2rem', classKey: 'height', classValue: '2rem' }, 
        { fullClass: 'anykey-anyvalue', classKey: 'anykey', classValue: 'anyvalue' }, 
    ]);
});

test('Accept any property key & value {"onlyDictionary": false}', () => {
    // Test any properties
    const attributes = ["height-2rem", "anykey-anyvalue"]
    
    // Usage
    createConfigFile({"onlyDictionary": false});
    
    expect(filterClasses(attributes)).toEqual([ 
        { fullClass: 'height-2rem', classKey: 'height', classValue: '2rem' }, 
        { fullClass: 'anykey-anyvalue', classKey: 'anykey', classValue: 'anyvalue' }, 
    ]);
});

// acceptAnyKey Config

test('Accept any key but dictionary values {"acceptAnyKey": true, "acceptAnyValue": false}', () => {
    // Test any properties
    const attributes = ["height-2rem", "height-someHeight", "anykey-25"]
    
    // Usage
    createConfigFile({"acceptAnyKey": true, "acceptAnyValue": false});
    console.log(filterClasses(attributes))
    
    expect(filterClasses(attributes)).toEqual([ 
        { fullClass: 'anykey-25', classKey: 'anykey', classValue: '25' },
    ]);
});

// acceptAnyValue Config

test('Accept any values but dictionary keys {"acceptAnyValue": true}', () => {
    // Test any properties
    const attributes = ["height-2rem", "height-someHeight", "anykey-25", "w-inherit"]
    
    // Usage
    createConfigFile("");
    console.log(filterClasses(attributes))
    
    expect(filterClasses(attributes)).toEqual([ 
        { fullClass: 'w-inherit', classKey: 'width', classValue: 'inherit' },
    ]);
});

deleteConfigFile();