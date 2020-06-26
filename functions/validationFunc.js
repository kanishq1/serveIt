const Joi = require('@hapi/joi');

// Events and Notices Validation
module.exports.envalidation = (req, res, next) => {
    const organization = req.user.organization;
    const role = req.user.role
    const event = req.body.Event;
    if (role === 0 && !event.organization) {
        return res.status(400).json({
            success: false,
            error: 'Pls fill organization. Bad request'
        })
    }
    if (role === 1) {
        event.organization = organization;
    }
    const schema = Joi.object({
        name: Joi.string().required(),
        summary: Joi.string().required(),
        tag: Joi.number().required(),
        start: Joi.date().required(),
        end: Joi.date(),
        location: Joi.string(),
        organization: Joi.number().required(),
        writer: Joi.string().required(),
        event: Joi.boolean().required(),
        attached_docs: Joi.array().items(Joi.string())
    });
    const { data, error } = schema.validate(event);
    if (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request'
        });
    } else {
        return next();
    }
}

// Complaints Validation
module.exports.complaintsvalidation = (req, res, next) => {
    const complaint = req.body;
    const schema = Joi.object({
        complaint_title: Joi.string().required(),
        complaint_details: Joi.string().required(),
    });
    const { data, error } = schema.validate(complaint);
    if (error) {
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request'
        });
    } else {
        return next();
    }
}

// Validation for subEvents
module.exports.subeventvalidation = (req, res, next) => {
    const subEvent = req.body;
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string(),
        price: Joi.number().required(),
        date: Joi.date(),
        combo: Joi.boolean(),
        combo_ids: Joi.array(),
        tshirt: Joi.boolean().required(),
        is_nick: Joi.boolean(),
        price_nick: Joi.string(),
        available_sizes: Joi.array().items(Joi.string()),
        images: Joi.array(),
        organization: Joi.number()
    });
    if (!req.body.organization && req.user.role === 0) {
        return res.status(400).json({
            success: false,
            error: 'Pls specify organization. Bad request.'
        });
    }
    else if (req.user.role === 1 && (req.body.organization != req.user.organization)) {
        return res.status(400).json({
            success: false,
            error: 'Unauthorized organization. Bad request.'
        });
    } else {
        const cond1 = subEvent.tshirt && (typeof subEvent.is_nick === 'undefined' || typeof subEvent.available_sizes === 'undefined');
        const cond2 = !subEvent.tshirt && (typeof subEvent.is_nick !== 'undefined' || typeof subEvent.available_sizes !== 'undefined' || typeof subEvent.price_nick !== 'undefined');
        const cond3 = subEvent.is_nick && typeof subEvent.price_nick === 'undefined';
        if (cond1 || cond2 || cond3) {
            return res.status(400).json({
                success: false,
                error: 'Bad request. Invalid constaints.'
            })
        }
        if (req.user.role === 1) {
            req.body.organization = req.user.organization;
        }
        const { data, error } = schema.validate(subEvent);
        if (error) {
            console.log(error);
            return res.status(200).json({
                success: false,
                error: 'Invalid fields constraints. Bad request'
            })
        }
        return next();
    }
}

// Validation for subEvents
module.exports.prvalidation = (req, res, next) => {
    const subEvents = req.body.subEvents;
    const subEventscombo = req.body.subEventscombo;
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string(),
        price: Joi.number().required(),
        date: Joi.date(),
        combo: Joi.boolean(),
        combo_ids: Joi.array(),
        tshirt: Joi.boolean(),
        is_nick: Joi.boolean(),
        price_nick: Joi.string(),
        available_sizes: Joi.array(),
        images: Joi.array()
    }) 
    if (!req.body.organization && req.user.role === 0) {
        return res.status(400).json({
            success: false,
            error: 'Pls specify organization. Bad request.'
        });
    }
    else if (req.user.role === 1 && (req.body.organization != req.user.organization)) {
        return res.status(400).json({
            success: false,
            error: 'Unauthorized organization. Bad request.'
        });
    } else {
        if (req.user.role === 1) {
            req.body.organization = req.user.organization;
        }
        for (let i = 0; i < subEvents.length; i++) {
            console.log(i);
            const subEvent = subEvents[i];
            const { data, error } = schema.validate(subEvent);
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid fields constraints. Bad request'
                });
            }
        }    
        console.log('out of loop');
        for (let i = 0; i < subEventscombo.length; i++) {
            console.log(i);
            const subEvent = subEventscombo[i];
            const { data, error } = schema.validate(subEvent);
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid fields constraints. Bad request'
                });
            }
        }
        return next();   
    }
}

// Validation for images
module.exports.imagevalidation = (req, res, next) => {
    const image = req.body.image;
    const schema = Joi.object({
        image: Joi.string().required(), // makes sure atleast image link is entered 
        profile_image: Joi.boolean(),
        background_image: Joi.boolean()
    });
    const { data, error } = schema.validate(image);
    if (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request'
        });
    } else {
        return next();
    }
}

// Validation for profile
module.exports.profilevalidation = (req, res, next) => {
    const schema = Joi.object({
        roomNo: Joi.string(),
        mobile: Joi.string().required(),
        hostel: Joi.string(),
        bitsId: Joi.string().required(),
        sex: Joi.number(),
    });
    const { data, error } = schema.validate(req.body);
    if (error) {
        // console.log(error);
        return res.status(200).json({
            success: false,
            error: 'Invalid fields constraints. Bad request'
        });
    } else {
        return next();
    }
}

// Validation for registration details
module.exports.registrationvalidation = (req, res, next) => {
    const schema = Joi.object({
        subeventId: Joi.number().required(),
        count: Joi.number().required(),
        combo_ids: Joi.array(),
        price: Joi.string().required(),
        size: Joi.string(),
        nick: Joi.string()
    });
    const { data, error } = schema.validate(req.body);
    if (error) {
        // console.log(error);
        return res.status(200).json({
            success: false,
            error: 'Invalid fields constraints. Bad request'
        });
    } else {
        return next();
    }
}

// Validation for registration details
module.exports.cabpoolvalidation = (req, res, next) => {
    const schema = Joi.object({
        pickup_location: Joi.string().required(),
        drop_location: Joi.string().required(),
        capacity: Joi.number().required(),
        date_time: Joi.date().required(),
        admin: Joi.boolean().required(),
        description: Joi.string(),
    });
    const { data, error } = schema.validate(req.body);
    if (error) {
        // console.log(error);
        return res.status(200).json({
            success: false,
            error: 'Invalid fields constraints. Bad request'
        });
    } else {
        return next();
    }
}