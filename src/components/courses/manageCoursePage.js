"use strict";

var React = require('react');
var CourseForm = require('./courseForm');
var Initializer = require('../../actions/initializeActions');
var AuthorStore = require('../../stores/authorStore');
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');
var Router = require('react-router');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        return {
            course: {
                id: '',
                title: '',
                watchHref: '',
                author: {},
                length: '',
                category: ''
            },
            authors: [],
            errors: {},
            dirty: false
        };
    },
    componentWillMount: function(){
        AuthorStore.addChangeListener(this.loadDropDownItems);
        Initializer.initApp();
        Initializer.initCourses();
        
        var courseId = this.props.params.id;
        if(courseId){
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },
    componentWillUnmount: function(){
        AuthorStore.removeChangeListener(this.loadDropDownItems);
    },
    loadDropDownItems: function(){
        this.setState({ authors: AuthorStore.getAllAuthors() });
    },
    setCourseState: function(event){
        this.setState({dirty: true});
        var element = event.target.tagName;
        var isElementDropdown = element.toLowerCase().indexOf('select') > -1;
        
        var field = event.target.name;
        var value = event.target.value;
        
        if(isElementDropdown){
            var author = AuthorStore.getAuthorById(value);
            author.name = author.firstName + ' ' + author.lastName;
            this.state.course[field] = author;
        }else{
            this.state.course[field] = value;
        }
        
        return this.setState({course: this.state.course});
    },
    courseFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};
        
        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    saveCourse: function(event){
        event.preventDefault();
        if(!this.courseFormIsValid()){
            return;
        }
        
        if(this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        }else{
            CourseActions.createCourse(this.state.course);
        }
        
        this.setState({dirty: false});
        toastr.success('Course Saved.');
        this.transitionTo('courses');
    },
    render: function(){
        return (
            <CourseForm
                course={this.state.course}
                authors={this.state.authors}
                errors={this.state.errors}
                onChange={this.setCourseState}
                onSave={this.saveCourse}></CourseForm>
        );
    }
});

module.exports = ManageCoursePage;