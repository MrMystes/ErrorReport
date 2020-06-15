import { getErrorMessage } from '../src/index';

interface errorInfo {
    line: number
    column: number
    filename: string
};

interface ErrorMessage {
    message: string
    stack: Array<errorInfo>
};

const fixtureChromeStack: string = `TypeError: Error raised
at bar http://192.168.31.8:8000/c.js:2:9
at foo http://192.168.31.8:8000/b.js:4:15
at calc http://192.168.31.8:8000/a.js:4:3
at <anonymous>:1:11
at http://192.168.31.8:8000/a.js:22:3
`
const fixtureFirefoxStack: string = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`

test('getErrorMessage(fixtureChromeStack) equal chromeExpected', () => {
    const chromeExpected: ErrorMessage = {
        message: 'TypeError: Error raised',
        stack:
            [{ line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
            { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
            { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
            { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' }]
    }
    expect(getErrorMessage(fixtureChromeStack)).toEqual(chromeExpected)
})

test('getErrorMessage(fixtureFirefoxStack) equal firefoxExpected', () => {
    const firefoxExpected: ErrorMessage = {
        message: '',
        stack:
            [{ line: 2, column: 9, filename: 'http://192.168.31.8:8000/c.js' },
            { line: 4, column: 15, filename: 'http://192.168.31.8:8000/b.js' },
            { line: 4, column: 3, filename: 'http://192.168.31.8:8000/a.js' },
            { line: 22, column: 3, filename: 'http://192.168.31.8:8000/a.js' }]
    }
    expect(getErrorMessage(fixtureFirefoxStack)).toEqual(firefoxExpected)
})

test('getErrorMessage() equal emptyExpected', () => {
    const emptyExpected: ErrorMessage = {
        message: '',
        stack: []
    }
    expect(getErrorMessage()).toEqual(emptyExpected)
})