import Announcement from '../models/Announcement.js';

// Create announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (req.user.role !== 'lecturer') {
      return res.status(403).json({ message: 'Only lecturers are allowed to create announcements' });
    }

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and Content are required' });
    }

    const announcement = await Announcement.create({
      title,
      content,
      createdBy: req.user._id, 
    });

    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all announcements
export const getAnnouncement = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('createdBy', 'firstName lastName role') // ✅ Fix
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get single announcement
// GET /api/announcements/:id
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('createdBy', 'firstName lastName role');

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


//put/api/announcements
export const updateAnnouncement = async ( req, res ) => {
  try {

    const { title, content } = req.body;

    const announcement = await Announcement.findById(req.params.id);

    if(!announcement) {
      return res.status(404).json({ message:  'Announcement not found' });
    }

    if(announcement.createdBy.toString() !==req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this announcement'});
    }

    if(title) announcement.title = title;
    if(content) announcement.content = content;

    const updatedAnnouncement = await announcement.save();

    res.json({
      message: 'Announcement updated successfully',
      announcement: updatedAnnouncement,
    });
   } catch(err) {
    return res.status(500).json({ message: 'Server error' });
   }
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this announcement' });
    }

    await announcement.deleteOne();
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
