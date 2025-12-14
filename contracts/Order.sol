// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Order
 * @notice Manage importer orders with simple escrow
 * @dev Orders from importers to exporters
 */
contract Order {

    enum OrderStatus {
        PENDING,        // 0 - Order placed, awaiting exporter confirmation
        CONFIRMED,      // 1 - Exporter confirmed, production starting
        IN_PRODUCTION,  // 2 - Manufacturing in progress
        SHIPPED,        // 3 - Order shipped
        DELIVERED,      // 4 - Order delivered, payment released
        CANCELLED,      // 5 - Order cancelled, refund issued
        DISPUTED        // 6 - Dispute raised (future: arbitration)
    }

    struct OrderDetails {
        uint256 id;
        address importer;
        address exporter;
        uint256 productId;
        string productName;
        uint256 quantity;
        uint256 pricePerUnit;
        uint256 totalPrice;
        OrderStatus status;
        string shippingDetails; // IPFS hash with shipping info
        uint256 createdAt;
        uint256 updatedAt;
    }

    // State variables
    uint256 private orderCounter;
    mapping(uint256 => OrderDetails) public orders;
    mapping(address => uint256[]) public importerOrders;
    mapping(address => uint256[]) public exporterOrders;
    mapping(uint256 => uint256) public escrow; // orderId => escrowed amount

    // Events
    event OrderPlaced(
        uint256 indexed orderId,
        address indexed importer,
        address indexed exporter,
        uint256 productId,
        uint256 quantity,
        uint256 totalPrice
    );

    event OrderConfirmed(uint256 indexed orderId);
    event OrderStatusUpdated(uint256 indexed orderId, OrderStatus status);
    event OrderDelivered(uint256 indexed orderId);
    event PaymentReleased(uint256 indexed orderId, uint256 amount);
    event OrderCancelled(uint256 indexed orderId);
    event RefundIssued(uint256 indexed orderId, uint256 amount);

    // Modifiers
    modifier onlyImporter(uint256 _orderId) {
        require(orders[_orderId].importer == msg.sender, "Not order importer");
        _;
    }

    modifier onlyExporter(uint256 _orderId) {
        require(orders[_orderId].exporter == msg.sender, "Not order exporter");
        _;
    }

    modifier orderExists(uint256 _orderId) {
        require(_orderId > 0 && _orderId <= orderCounter, "Order does not exist");
        _;
    }

    /**
     * @notice Place an order (by importer)
     * @param _exporter Exporter address
     * @param _productId Product ID from ProductListing
     * @param _productName Product name
     * @param _quantity Order quantity
     * @param _pricePerUnit Price per unit
     */
    function placeOrder(
        address _exporter,
        uint256 _productId,
        string memory _productName,
        uint256 _quantity,
        uint256 _pricePerUnit
    ) external payable returns (uint256) {
        require(_exporter != address(0), "Invalid exporter");
        require(_exporter != msg.sender, "Cannot order from self");
        require(_quantity > 0, "Quantity must be > 0");
        require(_pricePerUnit > 0, "Price must be > 0");

        uint256 totalPrice = _quantity * _pricePerUnit;
        require(msg.value >= totalPrice, "Insufficient payment");

        orderCounter++;

        orders[orderCounter] = OrderDetails({
            id: orderCounter,
            importer: msg.sender,
            exporter: _exporter,
            productId: _productId,
            productName: _productName,
            quantity: _quantity,
            pricePerUnit: _pricePerUnit,
            totalPrice: totalPrice,
            status: OrderStatus.PENDING,
            shippingDetails: "",
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        // Hold payment in escrow
        escrow[orderCounter] = msg.value;

        importerOrders[msg.sender].push(orderCounter);
        exporterOrders[_exporter].push(orderCounter);

        emit OrderPlaced(
            orderCounter,
            msg.sender,
            _exporter,
            _productId,
            _quantity,
            totalPrice
        );

        return orderCounter;
    }

    /**
     * @notice Confirm order (by exporter)
     * @param _orderId Order ID
     */
    function confirmOrder(uint256 _orderId)
        external
        orderExists(_orderId)
        onlyExporter(_orderId)
    {
        require(orders[_orderId].status == OrderStatus.PENDING, "Order not pending");

        orders[_orderId].status = OrderStatus.CONFIRMED;
        orders[_orderId].updatedAt = block.timestamp;

        emit OrderConfirmed(_orderId);
    }

    /**
     * @notice Update order status (by exporter)
     * @param _orderId Order ID
     * @param _status New status
     */
    function updateOrderStatus(uint256 _orderId, OrderStatus _status)
        external
        orderExists(_orderId)
        onlyExporter(_orderId)
    {
        require(_status != OrderStatus.PENDING, "Cannot revert to pending");
        require(_status != OrderStatus.CANCELLED, "Use cancelOrder function");
        require(orders[_orderId].status != OrderStatus.DELIVERED, "Order already delivered");
        require(orders[_orderId].status != OrderStatus.CANCELLED, "Order cancelled");

        orders[_orderId].status = _status;
        orders[_orderId].updatedAt = block.timestamp;

        emit OrderStatusUpdated(_orderId, _status);
    }

    /**
     * @notice Add shipping details (by exporter)
     * @param _orderId Order ID
     * @param _shippingIpfsHash IPFS hash with shipping/tracking info
     */
    function addShippingDetails(uint256 _orderId, string memory _shippingIpfsHash)
        external
        orderExists(_orderId)
        onlyExporter(_orderId)
    {
        require(bytes(_shippingIpfsHash).length > 0, "IPFS hash required");

        orders[_orderId].shippingDetails = _shippingIpfsHash;
        orders[_orderId].updatedAt = block.timestamp;
    }

    /**
     * @notice Confirm delivery and release payment (by importer)
     * @param _orderId Order ID
     */
    function confirmDelivery(uint256 _orderId)
        external
        orderExists(_orderId)
        onlyImporter(_orderId)
    {
        require(orders[_orderId].status == OrderStatus.SHIPPED, "Order not shipped");
        require(escrow[_orderId] > 0, "No escrowed funds");

        orders[_orderId].status = OrderStatus.DELIVERED;
        orders[_orderId].updatedAt = block.timestamp;

        // Release payment to exporter
        uint256 amount = escrow[_orderId];
        escrow[_orderId] = 0;

        payable(orders[_orderId].exporter).transfer(amount);

        emit OrderDelivered(_orderId);
        emit PaymentReleased(_orderId, amount);
    }

    /**
     * @notice Cancel order (by importer, only if pending or confirmed)
     * @param _orderId Order ID
     */
    function cancelOrder(uint256 _orderId)
        external
        orderExists(_orderId)
        onlyImporter(_orderId)
    {
        require(
            orders[_orderId].status == OrderStatus.PENDING ||
            orders[_orderId].status == OrderStatus.CONFIRMED,
            "Cannot cancel at this stage"
        );
        require(escrow[_orderId] > 0, "No escrowed funds");

        orders[_orderId].status = OrderStatus.CANCELLED;
        orders[_orderId].updatedAt = block.timestamp;

        // Refund importer
        uint256 refundAmount = escrow[_orderId];
        escrow[_orderId] = 0;

        payable(orders[_orderId].importer).transfer(refundAmount);

        emit OrderCancelled(_orderId);
        emit RefundIssued(_orderId, refundAmount);
    }

    /**
     * @notice Get order details
     * @param _orderId Order ID
     */
    function getOrder(uint256 _orderId)
        external
        view
        orderExists(_orderId)
        returns (OrderDetails memory)
    {
        return orders[_orderId];
    }

    /**
     * @notice Get all orders for an importer
     * @param _importer Importer address
     */
    function getImporterOrders(address _importer)
        external
        view
        returns (uint256[] memory)
    {
        return importerOrders[_importer];
    }

    /**
     * @notice Get all orders for an exporter
     * @param _exporter Exporter address
     */
    function getExporterOrders(address _exporter)
        external
        view
        returns (uint256[] memory)
    {
        return exporterOrders[_exporter];
    }

    /**
     * @notice Get pending orders for exporter (need confirmation)
     * @param _exporter Exporter address
     */
    function getPendingOrders(address _exporter)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory allOrders = exporterOrders[_exporter];
        uint256 pendingCount = 0;

        // Count pending
        for (uint256 i = 0; i < allOrders.length; i++) {
            if (orders[allOrders[i]].status == OrderStatus.PENDING) {
                pendingCount++;
            }
        }

        // Build array
        uint256[] memory pending = new uint256[](pendingCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allOrders.length; i++) {
            if (orders[allOrders[i]].status == OrderStatus.PENDING) {
                pending[index] = allOrders[i];
                index++;
            }
        }

        return pending;
    }

    /**
     * @notice Get escrowed amount for an order
     * @param _orderId Order ID
     */
    function getEscrowAmount(uint256 _orderId)
        external
        view
        orderExists(_orderId)
        returns (uint256)
    {
        return escrow[_orderId];
    }

    /**
     * @notice Get total orders count
     */
    function getTotalOrders() external view returns (uint256) {
        return orderCounter;
    }
}
