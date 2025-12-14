// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RoleRegistry
 * @notice Decentralized role activation system for TradeChain
 * @dev No admin, no backend - purely rule-based verification via staking
 */
contract RoleRegistry {

    enum Role {
        NONE,              // 0 - No role assigned
        IMPORTER,          // 1 - Buyer/importer role
        EXPORTER,          // 2 - Seller/exporter role
        MICRO_MANUFACTURER // 3 - Micro-manufacturer role
    }

    // State variables
    mapping(address => Role) public roles;
    mapping(address => bool) public blacklisted;

    // Events
    event RoleActivated(address indexed user, Role role, uint256 stakeAmount);
    event RoleRevoked(address indexed user, Role previousRole);

    // Modifiers
    modifier notBlacklisted() {
        require(!blacklisted[msg.sender], "Account is blacklisted");
        _;
    }

    modifier hasNoRole() {
        require(roles[msg.sender] == Role.NONE, "Role already assigned");
        _;
    }

    /**
     * @notice Activate importer role with 0.01 ETH stake
     * @dev Stake demonstrates economic commitment
     */
    function activateImporter() external payable notBlacklisted hasNoRole {
        require(msg.value >= 0.01 ether, "Importer requires 0.01 ETH stake");

        roles[msg.sender] = Role.IMPORTER;
        emit RoleActivated(msg.sender, Role.IMPORTER, msg.value);
    }

    /**
     * @notice Activate exporter role with 0.05 ETH stake
     * @dev Higher stake for sellers (economic security)
     */
    function activateExporter() external payable notBlacklisted hasNoRole {
        require(msg.value >= 0.05 ether, "Exporter requires 0.05 ETH stake");

        roles[msg.sender] = Role.EXPORTER;
        emit RoleActivated(msg.sender, Role.EXPORTER, msg.value);
    }

    /**
     * @notice Activate micro-manufacturer role (no stake required)
     * @dev Free for small manufacturers to encourage participation
     */
    function activateMicroManufacturer() external notBlacklisted hasNoRole {
        roles[msg.sender] = Role.MICRO_MANUFACTURER;
        emit RoleActivated(msg.sender, Role.MICRO_MANUFACTURER, 0);
    }

    /**
     * @notice Get role for any address
     * @param user Address to query
     * @return Role enum value
     */
    function getRole(address user) external view returns (Role) {
        return roles[user];
    }

    /**
     * @notice Check if address has a specific role
     * @param user Address to check
     * @param role Role to verify
     * @return bool True if user has the role
     */
    function hasRole(address user, Role role) external view returns (bool) {
        return roles[user] == role;
    }

    /**
     * @notice Get total contract balance (all stakes)
     * @return uint256 Contract balance in wei
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
