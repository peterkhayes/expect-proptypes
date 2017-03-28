const util = require("util");

function validate (input, expectedPropTypes, allowExtraProps) {

  // must be an object to validate props
  const isObj = input != null &&
    typeof input === "object" &&
    Object.getPrototypeOf(input) === Object.prototype;

  if (!isObj) {
    throw new Error(`cannot validate props for non-object \`${util.inspect(input)}\``);
  }

  let name = "expectation";
  if (expectedPropTypes.__name__ && typeof expectedPropTypes.__name__ === "string") {
    name = expectedPropTypes.__name__;
    // clone and delete name prop
    expectedPropTypes = Object.assign({}, expectedPropTypes);
    delete expectedPropTypes.__name__;
  }

  if (!allowExtraProps) {
    const extraProps = Object.keys(input)
      .filter((key) => !expectedPropTypes.hasOwnProperty(key));
    if (extraProps.length > 0) {
      throw new Error(`input has extra props: ${extraProps.join(", ")}`)
    }
  }

  // now validate props
  const errors = Object.keys(expectedPropTypes)
    .map((prop) => {
      const validator = expectedPropTypes[prop];
      if (typeof validator !== "function") {
        throw new Error(`invalid validator (not a function): ${validator}`)
      }
      const err = validator(input, prop, name, "prop");
      if (!err) return null;
      return `\n - ${err.message}`;
    })
    .filter(Boolean);

  if (errors.length > 0) {
    throw new Error(`invalid propTypes${errors.join("")}`)
  }

}

module.exports = {

  toHaveProps (expectedPropTypes) {
    validate(this.actual, expectedPropTypes, false);
  },

  toContainProps (expectedPropTypes) {
    validate(this.actual, expectedPropTypes, true);
  },

}