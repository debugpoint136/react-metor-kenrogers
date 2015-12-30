Busy = React.createClass({
    propTypes: {},
    mixins: [
         ReactMeteorData
    ],
    getInitialState() {
        return {}
    },
    getMeteorData() {
        Meteor.subscribe('ninjas');
        return {
            ninjas: Ninjas.find({status: false}).fetch()
        }
    },
    renderNinjas() {
        console.log(this.data.ninjas);
        return this.data.ninjas.map((ninja) => {
           return <p key={ninja._id} className="ninja">{ninja.fullName()}</p>;
        });
    },
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>Busy</h1>
                </div>
                <div className="panel-content">
                    {this.renderNinjas()}
                </div>
            </div>
        )
    }
});