import Resource from '../models/Resource.js';

//create resource
//post/api/resources
export const createResource = async ( req, res ) => {
  try {
    const { title, description, fileUrl, course } = req.body;

    if(!req.file) {
      return res.status(403).json({ message: 'File is required' });
    }

    const resource = await Resource.create({
      title,
      description,
      fileUrl: req.file.path,
      course,
      uploader: req.user._id
    });

    res.status(201).json(resource); 
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//get/api/ resources
export const getResources = async ( req, res ) => {
  try {
    const resources = await Resource.find()
    .populate('uploader', 'firstName lastName role' )
    .sort({ createdAt: -1});

    res.json(resources);
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//get single resource
//get/api/resources/:id
export const getResourceById = async ( req, res ) => {
  try {
    const resource = await Resource.findById(req.params.id)
    .populate('uploader', 'firstName lastName role');

    if(!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//put/apoi/resources
// PUT /api/resources/:id
export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if the logged-in user is the uploader
    if (resource.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this resource' });
    }

    const { title, description, course } = req.body;

    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.course = course || resource.course;

    // Handle new file (if uploading new one)
    if (req.file) {
      resource.fileUrl = req.file.path;
    }

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (err) {
    console.error('Update Resource Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


//delete/api/resources/:id
export const deleteResource = async ( req, res ) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if(!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if(resource.uploader.toString() !==req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this resource' });
    }

    await resource.deleteOne();
    res.json({message: 'Resource deleted successfully' });
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};