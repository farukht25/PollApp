const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  pollName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  optionCount: {
    type: Number,
    required: true,
    max:4
  },
  option1:{type:String, required:false,maxlength:20,minlength:1},
  vote1:{type:String, required:false,maxlength:20,minlength:1},
  option2:{type:String, required:false,maxlength:20,minlength:1},
  vote2:{type:String, required:false,maxlength:20,minlength:1},
  option3:{type:String, required:false,maxlength:20,minlength:1},
  vote3:{type:String, required:false,maxlength:20,minlength:1},
  option4:{type:String, required:false,maxlength:20,minlength:1},
  vote4:{type:String, required:false,maxlength:20,minlength:1}
}, {
  timestamps: true,
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;