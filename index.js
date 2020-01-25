const express = require('express');
const memberRepository = require('./db/member-repository')

const PORT = 3000;
const app = express();

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Server listeing on port ${PORT}`));

// Get all
app.get('/members/', (req, res) => {
    const members = memberRepository.getMembers();
    res.status(STATUS_OK).json(members);
});

// Get one
app.get('/members/:id', (req, res) => {
    const id = req.params.id;
    const member = memberRepository.getMember(id);
    if(member) {
        res.status(STATUS_OK).json(member);
    } else {
        res.status(STATUS_NOT_FOUND).json({ msg: "No member found with id=" + id});
    }
});

// Add one
app.post('/members/', (req, res) => {
    const newMember = req.body;
    memberRepository.addMember(newMember);
    res.status(STATUS_OK).json({
        'msg': 'member added',
        'member': newMember
    });
});

// Update one
app.put('/members/:id', (req, res) => {
    const modifiedMember = req.body;
    memberRepository.editMember(modifiedMember);
    res.status(STATUS_OK).json({
        'msg': 'member updated',
        'member': modifiedMember
    });
})

// Delete one
app.delete('/members:/id', (req, res) => {
    const id = req.params.id;
    const member = memberRepository.getMember(id);
    memberRepository.deleteMember(id);
    if(member) {
        res.status(STATUS_OK).json(member);
    } else {
        res.status(STATUS_NOT_FOUND).json({ msg: "No member found with id=" + id});
    }
})

// Delete all
app.delete('/members/', (req, res) => {
    memberRepository.deleteAllMembers();
    res.status(STATUS_OK).json({'msg': 'Members deleted'});
})
