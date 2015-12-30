Ninjas = new Mongo.Collection('ninjas');

var Schemas = {}; /* This was missing in the tutorial*/

Schemas.Ninja = new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 25
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 25,
        index: true,
        unique: true
    },
    score: {
        type: Number,
        label: "Score",
        min: 0
    },
    status: {
        type: Boolean,
        label: "Status"
    },
    jobsCompleted: {
        type: Number,
        label: "Jobs Completed",
        min: 0
    }
});

Ninjas.attachSchema(Schemas.Ninja);

Ninjas.helpers({
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
});

Ninjas.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

/* Methods */

Meteor.methods({
    addNinja(ninja) {
        if (! Meteor.userId()) {
            return
        }

        Ninjas.insert({
            firstName: ninja.firstName,
            lastName: ninja.lastName,
            score: 0,
            status: true,
            jobsCompleted: 0
        });
    },
    editNinja(ninja) {
        if (!Meteor.userId()) {
            return
        }
        console.dir(ninja);
        Ninjas.update({ _id: ninja._id} , {
            $set: {
                firstName: ninja.firstName,
                lastName: ninja.lastName
            }
        });

    },
    assignNinja(ninja) {
        if (! Meteor.userId()) {
            return
        }

        Ninjas.update(ninja, {
            $set: {status: false}
        });
    }
});

/* PUBLICATION */

if (Meteor.isServer) {
    Meteor.publish('ninjas', function() {
        return Ninjas.find();
    });

    Meteor.publish('ninja', function(id) {
        return Ninjas.find({_id: id});
    });
}