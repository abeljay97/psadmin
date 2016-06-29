"use strict";

var React = require('react');

var DropDown = React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired,
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render: function(){
        var createSelectOption = function(author){
            return (
                <option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
            );
        };
        
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select className="form-control" name={this.props.name} onChange={this.props.onChange} value={this.props.value.id}>
                    <option>Select Author</option>
                    {this.props.authors.map(createSelectOption, this)}
                </select>
            </div>
        );
    }
});

module.exports = DropDown;