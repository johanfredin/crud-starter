const express = require('express');
const router = express.Router();
const memberRepository = require('./../db/member-repository');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

// Get all
router.get('/members/', (req, res) => {
    const members = memberRepository.getMembers();
    res.status(STATUS_OK).json(members);
});

// Get one
router.get('/members/:id', (req, res) => {
    const id = req.params.id;
    const member = memberRepository.getMember(id);
    if(member) {
        res.status(STATUS_OK).json(member);
    } else {
        res.status(STATUS_NOT_FOUND).json({ msg: "No member found with id=" + id});
    }
});

// Add one
router.post('/members/', (req, res) => {
    const newMember = req.body;
    memberRepository.addMember(newMember);
    res.status(STATUS_OK).json({
        'msg': 'member added',
        'member': newMember
    });
});

// Update one
router.put('/members/:id', (req, res) => {
    const modifiedMember = req.body;
    memberRepository.editMember(modifiedMember);
    res.status(STATUS_OK).json({
        'msg': 'member updated',
        'member': modifiedMember
    });
})

// Delete one
router.delete('/members/:id', (req, res) => {
    const id = req.params.id;
    const member = memberRepository.deleteMember(id);
    if(member) {
        res.status(STATUS_OK).json({'msg' : 'Member deleted', 'member': member});
    } else {
        res.status(STATUS_NOT_FOUND).json({ msg: "No member found with id=" + id});
    }
})

// Delete all
router.delete('/members/', (req, res) => {
    memberRepository.deleteAllMembers();
    res.status(STATUS_OK).json({'msg': 'Members deleted'});
})

module.exports = router;