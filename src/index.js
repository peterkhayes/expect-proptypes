const util = require("util");

function validate (input, expectedPropTypes, allowExtraProps) {

  // must be an object to validate props
  const isObj = input != null &&
    typeof input === "object" &&
    Object.getPrototypeOf(input) === Object.prototype;

  if (!isObj) {
    throw new Error(`cannot validate props for non-object \`${util.inspect(input)}\``);
  }

  if (!allowExtraProps) {
    const extraProps = Object.keys(input)
      .filter((key) => !expectedPropTypes.hasOwnProperty(key));
    if (extraProps.length > 0) {
      throw new Error(`object has extra props: ${extraProps.join(", ")}`)
    }
  }

  // now validate props
  const errors = Object.keys(expectedPropTypes)
    .map((prop) => {
      const err = expectedPropTypes[prop](input, prop, expectedPropTypes.name || "expect", "prop")
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