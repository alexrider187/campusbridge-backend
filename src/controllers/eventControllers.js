import Event from '../models/Event.js';

//create events
//post/api/events
export const createEvent = async ( req, res ) => {
  try {
    const { title, date, location, description } = req.body;

    if(req.user.role !=='lecturer') {
      return res.status(403).json({ message: 'Only lecturer are allowed to create events' });
    }

    if(!title || !date || !location || !description) {
      return res.status(400).json({ message: 'All fields are required'});
    }

    const event = await Event.create({ 
      title,
      date,
      location, 
      description, 
      createdBy: req.user._id,
    });
    res.status(201).json(event);
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//get event
//get/api/events
export const getEvents = async ( req, res ) => {
  try {
    const events = await Event.find()
    .populate('createdBy', 'firstName lastName role')
    .sort({ createdAt: -1 });

    res.json(events)
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//get single event
//get/api/event/:id
export const getEventById = async ( req, res ) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'firstName lastName role');

    if(!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch(err) {
    return res.status(500).json({ message: 'Event not found' });
  }
};

//update events
//put/api/events/:id
export const updateEvent = async ( req, res ) => {
  try {
    const event = await Event.findById(req.params.id);

    if(!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if(event.createdBy.toString() !==req.user._id.toString()) {
      return res.status(400).json({ message: 'Not authorized to update this event' });
    }

    const { title, date, location, description} = req.body;

    event.title = title || event.title,
    event.date = date || event.date,
    event.location = location || event.location,
    event.description = description || event.description

    await event.save();
    res.json(event);
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//delete event
//delete/api/events/:id
export const deleteEvent = async ( req, res ) => {
  try {
    const event = await Event.findById(req.params.id);

    if(!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if(event.createdBy.toString() !==req.user._id.toString()) {
      return res.status(400).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch(err) {
    return res.status(500).json({ message: 'Server error' });
  }
};