"use strict";

var React = require('react');
var CourseList = require('./courseList');
var CourseStore = require('../../stores/courseStore');
var Initializer = require('../../actions/initializeActions');
var Link = require('react-router').Link;

var CoursePage = React.createClass({
    getInitialState: function(){
        return {
            courses: []
        };
    },
    componentWillMount: function(){
        CourseStore.addChangeListener(this._onChange);
        Initializer.initCourses();
    },
    componentWillUnmount: function(){
        CourseStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({ courses: CourseStore.getAllCourses() });
    },
    render: function(){
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses}></CourseList>
            </div>
        );
    }
});

module.exports = CoursePage;