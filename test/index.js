const expect = require("expect");
const pt     = require("proptypes");

expect.extend(require("../src"));

const shape = {
  num: pt.number.isRequired,
  str: pt.string.isRequired,
  optional: pt.any,
  obj: pt.shape({
    arr: pt.arrayOf(pt.string).isRequired,
  }).isRequired,
};

function shouldThrow (fn, msg) {
  try {
    fn();
  } catch (err) {
    if (err.message !== msg) {
      const mochaErr = new Error("Incorrect error message");
      mochaErr.actual = err.message;
      mochaErr.expected = msg;
      mochaErr.showDiff = true;
      throw mochaErr;
    }
    return;
  }
  throw new Error("Expected fn to throw, but it didn't");
}

describe("#toHaveProps", () => {

  it("fails if actual value is a non-object", () => {
    shouldThrow(
      () => expect(4).toHaveProps(shape),
      "cannot validate props for non-object `4`"
    );
  });

  it("fails if actual value is null", () => {
    shouldThrow(
      () => expect(null).toHaveProps(shape),
      "cannot validate props for non-object `null`"
    );
  });

  it("fails if actual value is undefined", () => {
    shouldThrow(
      () => expect(undefined).toHaveProps(shape),
      "cannot validate props for non-object `undefined`"
    );
  });

  it("fails if actual value is an array", () => {
    shouldThrow(
      () => expect([1, 2, 3]).toHaveProps(shape),
      "cannot validate props for non-object `[ 1, 2, 3 ]`"
    );
  });

  it("fails if a validator is not a function", () => {
    shouldThrow(
      () => expect({}).toHaveProps({foo: "bar"}),
      "invalid validator (not a function): bar"
    );
  });

  it("fails if actual value does not match expected shape", () => {
    const input = {
      num: "asdf",
      obj: {
        arr: ["a", "b", true],
      },
    };

    shouldThrow(
      () => expect(input).toHaveProps(shape),
      `invalid propTypes
 - Invalid prop \`num\` of type \`string\` supplied to \`expectation\`, expected \`number\`.
 - Required prop \`str\` was not specified in \`expectation\`.
 - Invalid prop \`obj.arr[2]\` of type \`boolean\` supplied to \`expectation\`, expected \`string\`.`
    );
  });

  it("fails if extra props are provided", () => {
    const input = {
      num: Infinity,
      str: "Hello",
      extraProperty: "property",
      obj: {
        bool: false,
        arr: ["a", "b", "asdf"],
      },
    };

    shouldThrow(
      () => expect(input).toHaveProps(shape),
      `input has extra props: extraProperty`
    );
  });

  it("can add shape name to errors", () => {
    const namedShape = {
      __name__: "My Shape",
      num: pt.number,
    };
    const input = {
      num: "1",
    };

    shouldThrow(
      () => expect(input).toHaveProps(namedShape),
      `invalid propTypes
 - Invalid prop \`num\` of type \`string\` supplied to \`My Shape\`, expected \`number\`.`
    );
  });

  it("passes if actual value matches expected shape", () => {
    const input = {
      num: Infinity,
      str: "Hello",
      obj: {
        bool: false,
        arr: ["a", "b", "asdf"],
      },
    };
    expect(input).toHaveProps(shape);
  });

});

describe("#toContainProps", () => {

  it("fails if actual value is a non-object", () => {
    shouldThrow(
      () => expect(4).toContainProps(shape),
      "cannot validate props for non-object `4`"
    );
  });

  it("fails if actual value is null", () => {
    shouldThrow(
      () => expect(null).toContainProps(shape),
      "cannot validate props for non-object `null`"
    );
  });

  it("fails if actual value is undefined", () => {
    shouldThrow(
      () => expect(undefined).toContainProps(shape),
      "cannot validate props for non-object `undefined`"
    );
  });

  it("fails if actual value is an array", () => {
    shouldThrow(
      () => expect([1, 2, 3]).toContainProps(shape),
      "cannot validate props for non-object `[ 1, 2, 3 ]`"
    );
  });

  it("fails if a validator is not a function", () => {
    shouldThrow(
      () => expect({}).toContainProps({foo: "bar"}),
      "invalid validator (not a function): bar"
    );
  });

  it("fails if actual value does not match expected shape", () => {
    const input = {
      num: "asdf",
      obj: {
        arr: ["a", "b", true],
      },
    };

    shouldThrow(
      () => expect(input).toContainProps(shape),
      `invalid propTypes
 - Invalid prop \`num\` of type \`string\` supplied to \`expectation\`, expected \`number\`.
 - Required prop \`str\` was not specified in \`expectation\`.
 - Invalid prop \`obj.arr[2]\` of type \`boolean\` supplied to \`expectation\`, expected \`string\`.`
    );
  });

  it("passes if extra props are provided", () => {
    const input = {
      num: Infinity,
      str: "Hello",
      extraProperty: "property",
      obj: {
        bool: false,
        arr: ["a", "b", "asdf"],
      },
    };
    expect(input).toContainProps(shape);
  });

  it("can add shape name to errors", () => {
    const namedShape = {
      __name__: "My Shape",
      num: pt.number,
    };
    const input = {
      num: "1",
      foo: "bar",
    };

    shouldThrow(
      () => expect(input).toContainProps(namedShape),
      `invalid propTypes
 - Invalid prop \`num\` of type \`string\` supplied to \`My Shape\`, expected \`number\`.`
    );
  });

  it("passes if actual value matches expected shape", () => {
    const input = {
      num: Infinity,
      str: "Hello",
      obj: {
        bool: false,
        arr: ["a", "b", "asdf"],
      },
    };
    expect(input).toContainProps(shape);
  });

});