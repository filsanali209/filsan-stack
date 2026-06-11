beforeAll(() => {
   console.log('Before all tests');
});

afterAll(() => {
   console.log('After all tests');
});

beforeEach(() => {
   console.log('Before each test');
});

afterEach(() => {
   console.log('After each test');
});

test('first test', () => {
   console.log('Executing first test');
   expect(true).toBe(true);
});

test('second test', () => {
   console.log('Executing second test');
   expect(true).toBe(true);
});
