const MemberModel = require('./model/MemberModel');

const memberRepository = {
    getMembers: () => {
        return new Promise((resolve, reject) => {
            MemberModel.find().lean().exec((err, members) => {
                if (err) {
                    reject(err);
                }
                console.log(members.length + ' Members fetched from server')
                resolve(members);
            });
        });
    },

    getMember: (id) => {
        return new Promise((resolve, reject) => {
            MemberModel.findById(id).lean().exec((err, member) => {
                if (err) {
                    reject(err);
                }
                resolve(member);
            });
        });
    },

    addMember: (member) => {
        const newMember = new MemberModel({
            name: member.name,
            age: member.age
        });
        return new Promise((resolve, reject) => {
            newMember.save()
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    },

    editMember: (id, modifiedMember) => {
        return new Promise((resolve, reject) => {
            MemberModel.findById(id, (err, member) => {
                if (err) {
                    reject(err);
                } else {
                    member.name = modifiedMember.name
                    member.age = modifiedMember.age
                    member.save().then(resolve(member));
                }
            });
        });
    },

    deleteMember: (id) => {
        return new Promise((resolve, reject) => {
            MemberModel.findByIdAndDelete(id, (err, member) => {
                if (err) {
                    reject(err);
                }
                resolve({ msg: 'Member deleted' });
            });
        });
    },

    deleteAllMembers: () => 'delete all'
};

module.exports = memberRepository;