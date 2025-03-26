const Request = require('../models/requestModel');

// Create a new request
exports.createRequest = async (req, res) => {
  const { from_user, to_user, meeting_location, meeting_time, rental_date, request_role, market_id } = req.body;

  try {
    const newRequest = await Request.create({
      from_user, to_user, meeting_location, meeting_time, rental_date, request_role, market_id
    });
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating request' });
  }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll()
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

// Get request by ID
exports.getRequestById = async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching request' });
  }
};

// Update a request
exports.updateRequest = async (req, res) => {
  const requestId = req.params.id;
  const { meeting_location, meeting_time, rental_date, request_role, market_id } = req.body;

  try {
    const updatedRequest = await Request.update(requestId, {
      meeting_location, meeting_time, rental_date, request_role, market_id
    });
    res.json({ message: 'Request updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating request' });
  }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    await Request.delete(requestId);
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting request' });
  }
};