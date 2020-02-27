const express = require('express');
const router = express.Router();
const memberRepository = require('../db/member-repository');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

// Get all
router.get('/members/', (req, res) => {
    memberRepository.getMembers()
        .then(members => res.status(STATUS_OK).json(members))
        .catch(err => res.status(STATUS_NOT_FOUND).json({
            msg: 'Could not retrieve members', error: err
        }));
});

// Get one
router.get('/members/:id', (req, res) => {
    const id = req.params.id;
    memberRepository.getMember(id)
        .then(member => res.json(member))
        .catch(() => res.status(STATUS_NOT_FOUND).json({ msg: "No member found with id=" + id }));
});

// Add one
router.post('/members/', (req, res) => {
    const newMember = req.body;
    memberRepository.addMember(newMember)
        .then(newMember => res.json(newMember))
        .catch(err => res.json(err));
});

// Update one
router.put('/members/:id', (req, res) => {
    const modifiedMember = req.body;
    memberRepository.editMember(modifiedMember)
        .then(modifiedMember => res.json(modifiedMember))
        .catch(err => res.json(err));
})

// Delete one
router.delete('/members/:id', (req, res) => {
    const id = req.params.id;
    memberRepository.deleteMember(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

// Delete all
router.delete('/members/', (req, res) => {
    memberRepository.deleteAllMembers();
    res.status(STATUS_OK).json({ 'msg': 'Members deleted' });
})

module.exports = router;