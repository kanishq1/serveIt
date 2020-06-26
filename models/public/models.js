const db = {};
// Define all your models here

//Models/tables
// User Profile
db.login = require('./login.js').Login;
db.admin = require('./login').Admin;

// //Images
// db.images = require('./images').Images;

// //Clubs/Dept
// db.clubs = require('./clubs').Clubs;

// //Mess
// db.mess = require('./mess').Mess;

// // PRDrive
// db.pr = {}
// db.pr.subEvent = require('./PRDrive/subEvents').subEvents;
// db.pr.event = require('./PRDrive/event').Events;
// db.pr.registrations = require('./PRDrive/registration').Registrations;
// db.pr.clubs = require('./PRDrive/event').Clubs;

// // Notices and Event Management
// db.en = require('./EventsandNotices/event').EN;
// db.bookmarks = require('./bookmarks').Bookmarks;

// // Exam Schedule
// db.exam = require('./Exam Schedule/examSchedule').ExamSchedule;

// // Complaints
// db.complaints = require('./Complaints/complaints').Complaints;

// // Cabpool
// db.cabpool = require('./Cabpool/cabpool').Cabpool;
// db.passengers = require('./Cabpool/passengers').Passengers;

module.exports = db;
