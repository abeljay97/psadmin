"use strict";

var React = require('react');
var Route = require('react-router');
var Link = Route.Link;

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },
    render: function(){
        var createCourseRow = function(course){
            return (
                <tr key={course.id}>
                    <td><a href={course.watchHref}>Watch</a></td>
                    <td><a href="#">Delete</a></td>
                    <td><Link to="manageCourse" params={{id: course.id}}>{course.title}</Link></td>
                    <td>{course.author.name}</td>
                    <td>{course.category}</td>
                    <td>{course.length}</td>
                </tr>
            );  
        };
        
        return (
            <table className="table">
                <thead>
                    <th></th>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                </thead>
                <tbody>
                    {this.props.courses.map(createCourseRow, this)}
                </tbody>
            </table>
        );
    }
});

module.exports = CourseList;