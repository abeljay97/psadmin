"use strict";

var React = require('react');
var Input = require('../common/input');
var DropDown = require('../common/dropDown');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        errors: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <form>
                <h1>Manage Course</h1>
                <Input
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title}/>
                
                <DropDown
                    name="author"
                    label="Author"
                    authors={this.props.authors}
                    value={this.props.course.author}
                    onChange={this.props.onChange}
                    error={this.props.errors.author}
                    />
                
                <Input
                    name="watchHref"
                    label="Course Link"
                    value={this.props.course.watchHref}
                    onChange={this.props.onChange}
                    error={this.props.errors.watchHref}/>
                
                <Input
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category}
                    />
                
                <Input
                    name="length"
                    label="Length"
                    value={this.props.course.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.length}/>
                
                <input type="submit" className="btn btn-default" value="save" onClick={this.props.onSave}></input>
            </form>
        );
    }
});

module.exports = CourseForm;