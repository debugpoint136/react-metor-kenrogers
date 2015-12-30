EditNinja = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
      Meteor.subscribe('ninja', this.props.ninja);
        return {
            ninja: Ninjas.findOne(this.props.ninja)
        };
    },
    editNinja(e) {
        e.preventDefault();
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();

        var ninja = this.data.ninja; /* this is missing in tutorial*/

        ninja.firstName = firstName;
        ninja.lastName = lastName ;

        Meteor.call('editNinja', ninja, function(error, result) {
            if (error) {
              return sAlert.error( error.reason, { effect: 'genie'});
            } else {
              $('#firstName').val('');
              $('#lastName').val('');

                FlowRouter.go('/ninjas');
                return sAlert.success('Ninja successfully edited!', {
                    effect: 'genie'
                });

            }
        });
        $('#firstName').val();
        $('#lastName').val();
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <h1>Edit Ninja</h1>

                        <form onSubmit={this.editNinja} id="edit-ninja-form" action="#">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name: </label>
                                <input type="text" id="firstName" name="firstName" className="form-control" defaultValue={this.data.ninja.firstName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name: </label>
                                <input type="text" id="lastName" name="lastName" className="form-control" defaultValue={this.data.ninja.lastName}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Save Ninja</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});