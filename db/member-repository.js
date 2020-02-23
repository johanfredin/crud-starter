const MemberModel = require('./model/MemberModel');

const memberRepository = {
    getMembers: async () => {
        let members;
        await MemberModel.find().lean().exec((err, result) => {
            if (err) {
                console.log("Error")
            }
            console.log(`${result.length} members returned`); 
            members = result;
        });
        console.log('members', members);
        return members;
    },

    getMember: (id) => 'get',
    
    addMember: async (member) => {
        const newMember = new MemberModel({
            name : member.name,
            age: member.age
        });

        await newMember.save().then(() => console.log('Member added'));
        return newMember;
    },
    
    editMember: (id, modifiedMember) => {
        'edit';
    },

    deleteMember: function(id) {
        return 'delete'
    },

    deleteAllMembers: () => 'delete all'
};

module.exports = memberRepository;