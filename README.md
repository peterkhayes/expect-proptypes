# expect-proptypes
This library extends [expect](https://github.com/mjackson/expect) to allow for assertions about object shapes, using React's PropTypes library or the standalone [proptypes library](https://www.npmjs.com/package/proptypes) on npm.

## Usage
```js
const {PropTypes} = require("react");

// Extend expect with this library.
const expect = require("expect");
const expectPropTypes = require("expect-proptypes")
expect.extend(expectPropTypes);

// Find some object you want to check the shape of
const obj = {
  num: 1,
  foo: "bar",
};

// `toHaveProps` does not allow additional props
expect(obj).toHaveProps({
  num: PropTypes.number.isRequired,
  foo: PropTypes.string.isRequired,
  optional: PropTypes.bool,
});

// `toContainProps` allows additional propses
expect(obj).toContainProps({
  num: PropTypes.number.isRequired,
});
```

## What if I want more detailed types?
Consider using my library [extended-proptypes](https://www.npmjs.com/package/extended-proptypes), which adds many useful validators, such as dates,constants, constants and regex matching for strings and object keys.