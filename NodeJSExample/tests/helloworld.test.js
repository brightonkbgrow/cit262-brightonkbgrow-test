const { name } = require('../src/helloworld');
console.log(`Name in helloworld.test.js: ${name}`); // Add this line

test('hello function should log "Hello, Brighton Grow!" to the console', () => {
    expect(name).toBe('Brighton Grow');
});

