const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ExampleERC20Module", (m) => {
  const exampleERC20 = m.contract("ExampleERC20");
  return { exampleERC20 };
});
