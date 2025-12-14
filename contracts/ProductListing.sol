// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ProductListing
 * @notice Decentralized product catalog for exporters
 * @dev Products stored on-chain, images/docs on IPFS
 */
contract ProductListing {

    struct Product {
        uint256 id;
        address exporter;
        string name;
        string description;
        string category;
        uint256 pricePerUnit; // in wei
        uint256 availableQuantity;
        string ipfsHash; // IPFS hash for product images/details
        bool active;
        uint256 createdAt;
    }

    // State variables
    uint256 private productCounter;
    mapping(uint256 => Product) public products;
    mapping(address => uint256[]) public exporterProducts;

    // Events
    event ProductListed(
        uint256 indexed productId,
        address indexed exporter,
        string name,
        uint256 pricePerUnit,
        uint256 quantity,
        string ipfsHash
    );

    event ProductUpdated(
        uint256 indexed productId,
        uint256 pricePerUnit,
        uint256 quantity
    );

    event ProductDeactivated(uint256 indexed productId);

    event QuantityReduced(
        uint256 indexed productId,
        uint256 reducedBy,
        uint256 newQuantity
    );

    // Modifiers
    modifier onlyExporter(uint256 _productId) {
        require(products[_productId].exporter == msg.sender, "Not product owner");
        _;
    }

    modifier productExists(uint256 _productId) {
        require(_productId > 0 && _productId <= productCounter, "Product does not exist");
        _;
    }

    /**
     * @notice List a new product
     * @param _name Product name
     * @param _description Product description
     * @param _category Product category
     * @param _pricePerUnit Price per unit in wei
     * @param _quantity Available quantity
     * @param _ipfsHash IPFS hash containing product images and details
     */
    function listProduct(
        string memory _name,
        string memory _description,
        string memory _category,
        uint256 _pricePerUnit,
        uint256 _quantity,
        string memory _ipfsHash
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(_pricePerUnit > 0, "Price must be > 0");
        require(_quantity > 0, "Quantity must be > 0");
        require(bytes(_ipfsHash).length > 0, "IPFS hash required");

        productCounter++;

        products[productCounter] = Product({
            id: productCounter,
            exporter: msg.sender,
            name: _name,
            description: _description,
            category: _category,
            pricePerUnit: _pricePerUnit,
            availableQuantity: _quantity,
            ipfsHash: _ipfsHash,
            active: true,
            createdAt: block.timestamp
        });

        exporterProducts[msg.sender].push(productCounter);

        emit ProductListed(
            productCounter,
            msg.sender,
            _name,
            _pricePerUnit,
            _quantity,
            _ipfsHash
        );

        return productCounter;
    }

    /**
     * @notice Update product price and quantity
     * @param _productId Product ID
     * @param _pricePerUnit New price per unit
     * @param _quantity New quantity
     */
    function updateProduct(
        uint256 _productId,
        uint256 _pricePerUnit,
        uint256 _quantity
    ) external productExists(_productId) onlyExporter(_productId) {
        require(products[_productId].active, "Product not active");
        require(_pricePerUnit > 0, "Price must be > 0");

        products[_productId].pricePerUnit = _pricePerUnit;
        products[_productId].availableQuantity = _quantity;

        emit ProductUpdated(_productId, _pricePerUnit, _quantity);
    }

    /**
     * @notice Deactivate a product listing
     * @param _productId Product ID
     */
    function deactivateProduct(uint256 _productId)
        external
        productExists(_productId)
        onlyExporter(_productId)
    {
        products[_productId].active = false;
        emit ProductDeactivated(_productId);
    }

    /**
     * @notice Reduce product quantity (called when order placed)
     * @param _productId Product ID
     * @param _quantity Quantity to reduce
     */
    function reduceQuantity(uint256 _productId, uint256 _quantity)
        external
        productExists(_productId)
        onlyExporter(_productId)
    {
        require(products[_productId].active, "Product not active");
        require(products[_productId].availableQuantity >= _quantity, "Insufficient quantity");

        products[_productId].availableQuantity -= _quantity;

        emit QuantityReduced(_productId, _quantity, products[_productId].availableQuantity);
    }

    /**
     * @notice Get product details
     * @param _productId Product ID
     */
    function getProduct(uint256 _productId)
        external
        view
        productExists(_productId)
        returns (Product memory)
    {
        return products[_productId];
    }

    /**
     * @notice Get all products by an exporter
     * @param _exporter Exporter address
     */
    function getExporterProducts(address _exporter)
        external
        view
        returns (uint256[] memory)
    {
        return exporterProducts[_exporter];
    }

    /**
     * @notice Get all active products (for browsing)
     * @dev Returns product IDs, frontend should fetch details individually
     */
    function getAllActiveProducts() external view returns (uint256[] memory) {
        uint256 activeCount = 0;

        // Count active products
        for (uint256 i = 1; i <= productCounter; i++) {
            if (products[i].active && products[i].availableQuantity > 0) {
                activeCount++;
            }
        }

        // Create array of active product IDs
        uint256[] memory activeProductIds = new uint256[](activeCount);
        uint256 index = 0;

        for (uint256 i = 1; i <= productCounter; i++) {
            if (products[i].active && products[i].availableQuantity > 0) {
                activeProductIds[index] = i;
                index++;
            }
        }

        return activeProductIds;
    }

    /**
     * @notice Get products by category
     * @param _category Category to filter by
     */
    function getProductsByCategory(string memory _category)
        external
        view
        returns (uint256[] memory)
    {
        uint256 count = 0;

        // Count matching products
        for (uint256 i = 1; i <= productCounter; i++) {
            if (
                products[i].active &&
                products[i].availableQuantity > 0 &&
                keccak256(bytes(products[i].category)) == keccak256(bytes(_category))
            ) {
                count++;
            }
        }

        // Create array of matching product IDs
        uint256[] memory matchingProducts = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= productCounter; i++) {
            if (
                products[i].active &&
                products[i].availableQuantity > 0 &&
                keccak256(bytes(products[i].category)) == keccak256(bytes(_category))
            ) {
                matchingProducts[index] = i;
                index++;
            }
        }

        return matchingProducts;
    }

    /**
     * @notice Get total number of products listed
     */
    function getTotalProducts() external view returns (uint256) {
        return productCounter;
    }
}
