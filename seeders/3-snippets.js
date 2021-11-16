'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'snippets',
            [
                {
                    title: 'Function Currying',
                    description: `Currying is an advanced technique of working with functions.\n\nIt’s used not only in JavaScript, but in other languages as well. Currying is a transformation of functions that translates a function from callable as \`f(a, b, c)\` into callable as \`f(a)(b)(c)\`. Currying doesn’t call a function. It just transforms it.`,
                    code: `function curry(f) { // curry(f) does the currying transform\n\treturn function(a) {\n\t\treturn function(b) {\n\t\t\treturn f(a, b);\n\t\t};\n\t};\n}\n\nfunction sum(a, b) {\n\treturn a + b;\n}\n\nlet curriedSum = curry(sum);\n\nalert( curriedSum(1)(2) ); // 3`,
                    userId: 1,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Flat array method',
                    description: `The \`flat()\` method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.`,
                    code: 'const arr1 = [0, 1, 2, [3, 4]];\n\nconsole.log(arr1.flat());\n// expected output: [0, 1, 2, 3, 4]\n\nconst arr2 = [0, 1, 2, [[[3, 4]]]];\n\nconsole.log(arr2.flat(2));\n// expected output: [0, 1, 2, [3, 4]]',
                    userId: 1,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'For Loop in JavaScript',
                    description: `I know it may seem like black magic, but a \`for\` loop still exist in JS. This is how you write it if you do not want to use built-in array methods.\n\n\`for (statement 1; statement 2; statement 3);\`\n\n**Statement 1** is executed (one time) before the execution of the code block.\n\n**Statement 2** defines the condition for executing the code block.\n\n**Statement 3** is executed (every time) after the code block has been executed.`,
                    code: 'for (let i = 0; i < N; i++) {\n\t// some code for the array\n}',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Shallow vs Deep Copying',
                    description: `**Shallow Copy**\n\nShallow copy is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. If any of the fields of the object are references to other objects, just the reference addresses are copied i.e., only the memory address is copied.\n\n**Deep copy**\n\nA deep copy copies all fields, and makes copies of dynamically allocated memory pointed to by the fields. A deep copy occurs when an object is copied along with the objects to which it refers.
                    `,
                    code: "const grid = [\n\t[ { x: 0, y: 0, value = 'O' }, { x: 0, y: 1, value = 'X' }, { x: 0, y: 2, value = ' ' } ],\n\t[ { x: 1, y: 0, value = 'O' }, { x: 1, y: 1, value = 'X' }, { x: 1, y: 2, value = ' ' } ],\n\t[ { x: 2, y: 0, value = ' ' }, { x: 2, y: 1, value = ' ' }, { x: 2, y: 2, value = ' ' } ]\n]\n\nconst gridCopy = [...grid];\n\ngridCopy[2][1] = 'X'\n\nconsole.log(gridCopy[2][1]);\n// { x: 2, y: 1, val: 'X' }\n\nconsole.log(grid[2][1]);\n// { x: 2, y: 1, val: 'X' }",
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },

                {
                    title: 'React use Effect hook',
                    description: `The \`useEffect\` hook lets you perform side effects in function components.\n\n**componentDidMount**\n\nWhen the component mounts on the page\n\n**componentDidUpdate**\n\nSomething changed on the component\n\n**componentWillUnmount**\n\nWhen the component is remove from the page`,
                    code: 'useEffect(() => {\n\t// perform side effects\n}, []);\n//the side effect will run when component is mounted\n\nuseEffect(() => {\n\t// perform sideEffects\n});\n//the side effects will run on each re-render\n\nuseEffect(() => {\n\t//perform sideEffects\n\n\t() => {\n\t\t//function that is executed on unmount\n\t}\n}, [dependency array]};\n//the side effects will run each time\n//something included in the dependency array changes',
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Reduce is awesome',
                    description: `The \`reduce()\` method executes a user-supplied “reducer” callback function on each element of the array, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.`,
                    code: 'const array  = [ 5, 4, 7, 8, 9, 2];\n\n//SUM\narray.reduce((a, b) => a + b);\n//Output: 35\n\n//MAX\narray.reduce((a, b) => a > b ? a : b);\n//Output: 9\n\n//MIN\narray.reduce((a, b) => a < b ? a : b);\n//Output: 2',
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Conditional Types',
                    description:
                        'Type overloading can become cumbersome. As our API grows, a developer would have to write a new overload for each case. Conditional types come in clutch to save the day!',
                    code: 'type NameOrId<T extends number | string> = T extends number\n\t? IdLabel\n\t: NameLabel;\n\nfunction createLabel<T extends number | string>(idOrName: T): NameOrId<T> {\n\tthrow "unimplemented"\n}\n\nlet a = createLabel("typescript");\n//NameLabel\n\nlet b = createLabel(2.8);\n//IdLabel\n\nlet c = createLabel(Math.random() ? "hello" : 42);\n//NameLabel | IdLabel',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Keyof Type Operator',
                    description: `If the type has a \`string\` or \`number\` index signature, \`keyof\` will return those types instead.\n\nNote that in this example, \`M\` is just a \`string | number\` - this is because JavaScript object keys are always coerced to a string, so \`obj[0]\` is always the same as \`obj['0']\`.`,
                    code: 'type Arrayish = { [n: number]: unknown };\ntype A = keyof Arrayish;\n//type A = number\n\ntype Mapish = { [k: string]: boolean };\ntype M = keyof Mapish;\n//type M = string | number',
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Mapping undefined',
                    description: `I do not know why I am getting this error. Can someone help me out?\n\n\`Uncaught TypeError: Cannot read property \'tt\' of undefined\``,
                    code: 'function test (t) {\n  if (t === undefined) {\n    console.log(t.tt);\n  }\n  return t;\n}\n\nvar a;\n\nconsole.log(test(a));',
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Socket IO functions',
                    description: `Can someone explain the behavior of these three functions from the Socket IO library? Thanks!`,
                    code: "socket.emit('hello')\n\nsocket.broadcast('hello');\n\nsocket.emit('hello').to('room');",
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },

                {
                    title: 'Objects as React child',
                    description: `I am getting this error \`Objects are not valid as React child\`. What does this mean? Thanks`,
                    code: 'export default function getWeatherFromApiAsync() {\n  return fetch(apiUrl)\n  .then((response) => response.json())\n  .then((responseJson) => {\n    return (\n      <div className="App">\n      {responseJson.map((weather) => (\n        <div>\n          <h6> {weather.coord.lon}</h6>\n        </div>\n      ))}\n  </div>\n)\n  })\n  .catch((error) => {\n    console.error(error);\n  });\n}',
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Redux thunk',
                    description: `I do not understand the following about \`Redux thunk\`. Sometimes we pass a function to the store and other times we pass an object. Can someone explain to me what is going on behind the scenes?`,
                    code: "export const randomAction (randomPayload) => ({\n  type: 'RANDOM_ACTION',\n  payload: 'randomPayload'\n})\n//we call this function and it returns an object that is then dispatched\n\nexport const = (randomArg) => async (dispatch, getState) => {\n  // a function that returns a function\n}",
                    userId: 2,
                    languageId: 1,
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('snippets', null, {});
    }
};
