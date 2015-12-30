Requests = new Mongo.Collection('requests');

var Schemas = {};

Schemas.Requests = new SimpleSchema({
    clientName: {
        type: String,
        label: "Client Name"
    },
    target: {
        type: String,
        label: "Target"
    },
    fulfilled: {
        type: Boolean
    }
});

Requests.attachSchema(Schemas.Requests);

Meteor.methods({
    newRequest(request) {
        console.log(request);

        Requests.insert({
            clientName: request.clientName,
            target: request.target,
            fulfilled: false
        });
    },
    updateRequest(request) {
        if (! Meteor.userId()) {
            return
        }

        Requests.update(request, {
            $set: {fullfilled: true}
        });
    }
});

if (Meteor.isServer) {
    Meteor.publish('requests', function() {
        return Requests.find();
    });
}