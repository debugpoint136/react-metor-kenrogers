NewNinja = React.createClass({
    addNinja(e) {
        e.preventDefault();
        var firstName = $('#first_name').val();
        var lastName = $('#last_name').val();

        var ninja = { firstName: firstName, lastName: lastName };

        Meteor.call('addNinja', ninja, function (error, result) {
            if (error) {
                return sAlert.error(error.reason, {
                    effect: 'genie'
                });
            } else {
                $('#first_name').val();
                $('#first_name').val();

                return sAlert.success('Ninja successfully created!', {
                    effect: 'genie'
                });
            }
        });
        $('#first_name').val('');
        $('#last_name').val('');

    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-8">
                        <h1>Add Ninja</h1>
                        <form id="new-ninja-form" onSubmit={this.addNinja}>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name : </label>
                                <input type="text" id="first_name" name="first_name" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name : </label>
                                <input type="text" id="last_name" name="last_name" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Add Ninja</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});