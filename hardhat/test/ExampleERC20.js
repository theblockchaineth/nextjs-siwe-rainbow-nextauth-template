const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("ExampleERC20", function () {
  async function deployExampleERC20Fixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ExampleERC20 = await ethers.getContractFactory("ExampleERC20");
    const exampleERC20 = await ExampleERC20.deploy();

    return { exampleERC20, owner, otherAccount };
  }

  describe("Post Deployment Unit Tests", function () {
    it("Full supply to owner", async function () {
      const { exampleERC20, owner } = await loadFixture(
        deployExampleERC20Fixture,
      );
      const ownerBalance = await exampleERC20.balanceOf(owner.address);
      expect(await exampleERC20.totalSupply()).to.equal(ownerBalance);
    });
  });
});
