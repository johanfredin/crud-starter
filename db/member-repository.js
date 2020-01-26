let members = [
    {
        id: 1,
        name: 'Johan',
        age: 33
    }, 
    {
        id: 2,
        name: 'Evelyn',
        age: 34
    }
]

const memberRepository = {
    getMembers: () => members,

    getMember: (id) => members[id - 1],
    
    addMember: (member) => members.push(member),
    
    editMember: (id, modifiedMember) => {
        members[id - 1] = modifiedMember;
    },

    deleteMember: function(id) {
        let deleteMember = members[id - 1];
        members.splice(id - 1);
        return deleteMember;
    },

    deleteAllMembers: () => members = []
};

module.exports = memberRepository;