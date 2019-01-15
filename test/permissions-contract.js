const PermissionsContract = artifacts.require("PermissionsContract");

contract('PermissionsContract', (accounts) => {
  it('should grant permission from account1 to account2', async () => {
    const instance = await PermissionsContract.deployed();
    const grantedReceipt = await instance.grantPermission(accounts[1], { from: accounts[0] });
    assert.equal(grantedReceipt.receipt.status, true, "Contract call failed");

    const hasPermission = await instance.hasPermission.call(accounts[0], { from: accounts[1] });
    assert.equal(hasPermission, true, "Permission not stored on contract");
  });

  it('should revoke an existing permission', async () => {
    const instance = await PermissionsContract.deployed();
    const granted = await instance.grantPermission(accounts[1], { from: accounts[0] });
    assert.equal(granted.receipt.status, true, "Contract call failed");

    let hasPermission = await instance.hasPermission.call(accounts[0], { from: accounts[1] });
    assert.equal(hasPermission, true, "Permission not stored on contract");

    const revoked = await instance.revokePermission(accounts[1], { from: accounts[0] });
    assert.equal(revoked.receipt.status, true, "Contract call failed");

    hasPermission = await instance.hasPermission.call(accounts[0], { from: accounts[1] });
    assert.equal(hasPermission, false, "Permission not updated on contract");
  });
});
