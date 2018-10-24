const express = require('express');
const { Announcement } = require('../models');

const router = express.Router();

//
router.route('/')
    // get all announcements
    .get((req, res) => {
        Announcement.findAll().then((announcements) => {
            res.json({
                announcements,
            });
        });
    })

    // create an announcement
    .post((req, res) => {
        const {
            Title,
            Message,
            ImageLink,
        } = req.body;
        // validate potentially here
        Announcement.create({
            Title,
            Message,
            ImageLink,
        }).then((announcement) => {
            res.json(announcement);
        });
    });

// query by id
router.route('/:id')
    // get a specific announcement by id
    .get((req, res) => {
        Announcement.findById(req.params.id).then((announcement) => {
            res.json(announcement);
        });
    })

    // update a specific announcement by id
    .put((req, res) => {
        const { Title, Message, ImageLink } = req.body;
        Announcement.findById(req.params.id).then((announcement) => {
            const announcementToUpdate = announcement;
            announcementToUpdate.Title = Title;
            announcementToUpdate.Message = Message;
            announcementToUpdate.ImageLink = ImageLink;
            announcementToUpdate.save().then((updatedAnnouncement) => {
                res.json(updatedAnnouncement);
            });
        });
    })

    // delete a specific announcement by id
    .delete((req, res) => {
        const idToDelete = req.params.id;
        Announcement.findById(idToDelete).then((announcement) => {
            announcement.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
