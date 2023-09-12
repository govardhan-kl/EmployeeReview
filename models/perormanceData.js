const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    ReviewTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:{
        type: String
    },
    ReviewBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isReviewed:{
        type: Boolean,
        required: true
    }
},{
    timestamps:true
})


const PerformanceData = mongoose.model('PerformanceData',performanceSchema);

module.exports = PerformanceData