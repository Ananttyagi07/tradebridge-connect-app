// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Collaboration
 * @notice Manage exporter-micromanufacturer collaboration workflow
 * @dev Sample requests, quality checks, and production orders
 */
contract Collaboration {

    enum RequestStatus {
        PENDING,           // 0 - Request sent, waiting for response
        SAMPLE_SENT,       // 1 - Manufacturer sent sample
        QUALITY_APPROVED,  // 2 - Exporter approved quality
        QUALITY_REJECTED,  // 3 - Exporter rejected quality
        ORDER_PLACED,      // 4 - Production order placed
        COMPLETED,         // 5 - Order completed
        CANCELLED          // 6 - Request cancelled
    }

    struct CollaborationRequest {
        uint256 id;
        address exporter;
        address microManufacturer;
        uint256 productId; // Reference to product in ProductListing contract
        string productName;
        uint256 requestedQuantity;
        uint256 pricePerUnit;
        string specifications; // IPFS hash with detailed requirements
        RequestStatus status;
        string sampleIpfsHash; // IPFS hash for sample images/docs
        string qualityNotes; // Exporter's quality check notes
        uint256 createdAt;
        uint256 updatedAt;
    }

    // State variables
    uint256 private requestCounter;
    mapping(uint256 => CollaborationRequest) public requests;
    mapping(address => uint256[]) public exporterRequests;
    mapping(address => uint256[]) public manufacturerRequests;

    // Events
    event RequestCreated(
        uint256 indexed requestId,
        address indexed exporter,
        address indexed microManufacturer,
        uint256 productId,
        uint256 quantity
    );

    event SampleSubmitted(
        uint256 indexed requestId,
        string sampleIpfsHash
    );

    event QualityChecked(
        uint256 indexed requestId,
        bool approved,
        string notes
    );

    event OrderPlaced(
        uint256 indexed requestId,
        uint256 quantity,
        uint256 totalPrice
    );

    event RequestCancelled(uint256 indexed requestId);

    // Modifiers
    modifier onlyExporter(uint256 _requestId) {
        require(requests[_requestId].exporter == msg.sender, "Not request exporter");
        _;
    }

    modifier onlyManufacturer(uint256 _requestId) {
        require(requests[_requestId].microManufacturer == msg.sender, "Not request manufacturer");
        _;
    }

    modifier requestExists(uint256 _requestId) {
        require(_requestId > 0 && _requestId <= requestCounter, "Request does not exist");
        _;
    }

    /**
     * @notice Create collaboration request to micro-manufacturer
     * @param _manufacturer Micro-manufacturer address
     * @param _productId Product ID from ProductListing contract
     * @param _productName Product name
     * @param _quantity Requested quantity
     * @param _pricePerUnit Offered price per unit
     * @param _specifications IPFS hash with detailed specs
     */
    function createRequest(
        address _manufacturer,
        uint256 _productId,
        string memory _productName,
        uint256 _quantity,
        uint256 _pricePerUnit,
        string memory _specifications
    ) external returns (uint256) {
        require(_manufacturer != address(0), "Invalid manufacturer");
        require(_manufacturer != msg.sender, "Cannot request from self");
        require(_quantity > 0, "Quantity must be > 0");
        require(_pricePerUnit > 0, "Price must be > 0");

        requestCounter++;

        requests[requestCounter] = CollaborationRequest({
            id: requestCounter,
            exporter: msg.sender,
            microManufacturer: _manufacturer,
            productId: _productId,
            productName: _productName,
            requestedQuantity: _quantity,
            pricePerUnit: _pricePerUnit,
            specifications: _specifications,
            status: RequestStatus.PENDING,
            sampleIpfsHash: "",
            qualityNotes: "",
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        exporterRequests[msg.sender].push(requestCounter);
        manufacturerRequests[_manufacturer].push(requestCounter);

        emit RequestCreated(
            requestCounter,
            msg.sender,
            _manufacturer,
            _productId,
            _quantity
        );

        return requestCounter;
    }

    /**
     * @notice Manufacturer submits sample
     * @param _requestId Request ID
     * @param _sampleIpfsHash IPFS hash with sample images/docs
     */
    function submitSample(uint256 _requestId, string memory _sampleIpfsHash)
        external
        requestExists(_requestId)
        onlyManufacturer(_requestId)
    {
        require(requests[_requestId].status == RequestStatus.PENDING, "Invalid status");
        require(bytes(_sampleIpfsHash).length > 0, "IPFS hash required");

        requests[_requestId].status = RequestStatus.SAMPLE_SENT;
        requests[_requestId].sampleIpfsHash = _sampleIpfsHash;
        requests[_requestId].updatedAt = block.timestamp;

        emit SampleSubmitted(_requestId, _sampleIpfsHash);
    }

    /**
     * @notice Exporter performs quality check on sample
     * @param _requestId Request ID
     * @param _approved Whether quality is approved
     * @param _notes Quality check notes
     */
    function checkQuality(
        uint256 _requestId,
        bool _approved,
        string memory _notes
    )
        external
        requestExists(_requestId)
        onlyExporter(_requestId)
    {
        require(requests[_requestId].status == RequestStatus.SAMPLE_SENT, "Sample not submitted");

        requests[_requestId].status = _approved ? RequestStatus.QUALITY_APPROVED : RequestStatus.QUALITY_REJECTED;
        requests[_requestId].qualityNotes = _notes;
        requests[_requestId].updatedAt = block.timestamp;

        emit QualityChecked(_requestId, _approved, _notes);
    }

    /**
     * @notice Exporter places production order after quality approval
     * @param _requestId Request ID
     * @param _quantity Final order quantity (can differ from initial request)
     */
    function placeOrder(uint256 _requestId, uint256 _quantity)
        external
        payable
        requestExists(_requestId)
        onlyExporter(_requestId)
    {
        require(requests[_requestId].status == RequestStatus.QUALITY_APPROVED, "Quality not approved");
        require(_quantity > 0, "Quantity must be > 0");

        uint256 totalPrice = _quantity * requests[_requestId].pricePerUnit;
        require(msg.value >= totalPrice, "Insufficient payment");

        requests[_requestId].status = RequestStatus.ORDER_PLACED;
        requests[_requestId].requestedQuantity = _quantity;
        requests[_requestId].updatedAt = block.timestamp;

        emit OrderPlaced(_requestId, _quantity, totalPrice);
    }

    /**
     * @notice Mark order as completed (for MVP - later integrate with escrow)
     * @param _requestId Request ID
     */
    function completeOrder(uint256 _requestId)
        external
        requestExists(_requestId)
        onlyExporter(_requestId)
    {
        require(requests[_requestId].status == RequestStatus.ORDER_PLACED, "No active order");

        requests[_requestId].status = RequestStatus.COMPLETED;
        requests[_requestId].updatedAt = block.timestamp;

        // Transfer payment to manufacturer
        uint256 amount = requests[_requestId].requestedQuantity * requests[_requestId].pricePerUnit;
        payable(requests[_requestId].microManufacturer).transfer(amount);
    }

    /**
     * @notice Cancel request (only if pending or sample sent)
     * @param _requestId Request ID
     */
    function cancelRequest(uint256 _requestId)
        external
        requestExists(_requestId)
        onlyExporter(_requestId)
    {
        require(
            requests[_requestId].status == RequestStatus.PENDING ||
            requests[_requestId].status == RequestStatus.SAMPLE_SENT,
            "Cannot cancel at this stage"
        );

        requests[_requestId].status = RequestStatus.CANCELLED;
        requests[_requestId].updatedAt = block.timestamp;

        emit RequestCancelled(_requestId);
    }

    /**
     * @notice Get request details
     * @param _requestId Request ID
     */
    function getRequest(uint256 _requestId)
        external
        view
        requestExists(_requestId)
        returns (CollaborationRequest memory)
    {
        return requests[_requestId];
    }

    /**
     * @notice Get all requests for an exporter
     * @param _exporter Exporter address
     */
    function getExporterRequests(address _exporter)
        external
        view
        returns (uint256[] memory)
    {
        return exporterRequests[_exporter];
    }

    /**
     * @notice Get all requests for a manufacturer
     * @param _manufacturer Manufacturer address
     */
    function getManufacturerRequests(address _manufacturer)
        external
        view
        returns (uint256[] memory)
    {
        return manufacturerRequests[_manufacturer];
    }

    /**
     * @notice Get pending requests for manufacturer
     * @param _manufacturer Manufacturer address
     */
    function getPendingRequests(address _manufacturer)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory allRequests = manufacturerRequests[_manufacturer];
        uint256 pendingCount = 0;

        // Count pending
        for (uint256 i = 0; i < allRequests.length; i++) {
            if (requests[allRequests[i]].status == RequestStatus.PENDING) {
                pendingCount++;
            }
        }

        // Build array
        uint256[] memory pending = new uint256[](pendingCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allRequests.length; i++) {
            if (requests[allRequests[i]].status == RequestStatus.PENDING) {
                pending[index] = allRequests[i];
                index++;
            }
        }

        return pending;
    }

    /**
     * @notice Get total requests count
     */
    function getTotalRequests() external view returns (uint256) {
        return requestCounter;
    }
}
