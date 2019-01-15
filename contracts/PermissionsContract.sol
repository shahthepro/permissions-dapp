pragma solidity >=0.4.25 <0.6.0;

contract PermissionsContract {
    // User/Contract Address => Entity => boolean mapping
    mapping (address => mapping(address => bool)) authorized;

    // Emitted when permission has been granted
    event PermissionGranted(address indexed _entity, address indexed _approvedFor);

    // Emitted when permission for an entity has been revoked
    event PermissionRevoked(address indexed _entity, address indexed _revokedFor);

    constructor() public {}

    function grantPermission(address forAddress) public returns (bool) {
        // Disallow granting permission for self
        require(forAddress != msg.sender, "ERR_OWN_ADDR");

        authorized[forAddress][msg.sender] = true;
        emit PermissionGranted(msg.sender, forAddress);
        return true;
    }

    function revokePermission(address forAddress) public returns (bool) {
        // Don't allow revoke if permission has not been granted
        require(authorized[forAddress][msg.sender], "ERR_NOT_GRANTED");
        
        authorized[forAddress][msg.sender] = false;
        emit PermissionRevoked(msg.sender, forAddress);
        return true;
    }

    function hasPermission(address entity) public view returns (bool) {
        return authorized[msg.sender][entity];
    }
}
