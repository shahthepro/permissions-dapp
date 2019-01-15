const PermissionsContract = artifacts.require("PermissionsContract");

module.exports = function(deployer) {
  deployer.deploy(PermissionsContract);
};
