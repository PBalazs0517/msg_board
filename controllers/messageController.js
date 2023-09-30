const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { DateTime } = require('luxon');

exports.message_list = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().exec()

    res.render('index', { 
        title: 'Message Board load',
        message_list: allMessages, 
    })
})

exports.send_message = [
    body('user_name', )
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('You can not leave the name empty')
        .isLength({max: 50})
        .withMessage('Name can not be longer than 50 character'),
    body("message")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('You can not leave the name empty')
        .isLength({max: 300})
        .withMessage('Message can not be longer than 50 character'),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const allMessages = await Message.find().exec();

        const message = new Message({
            name: req.body.user_name,
            msg: req.body.message,
        });

        if(!errors.isEmpty()) {
            res.render('index', {
                title: 'Message Board',
                message_list: allMessages,
                message: message,
                error_list: errors.array(),
            });

            return;
        } else {
            await message.save();
            const allMessages = await Message.find().exec();

            res.redirect('/')
        }
    })

    
]