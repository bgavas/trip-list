const mongoose = require('mongoose');

let TripSchema = new mongoose.Schema({
    distance_travelled: {
        type: Number
    },
    driver_rating: {
        type: Number
    },
    rider_rating: {
        type: Number
    },
    start_zip_code: {
        type: String
    },
    end_zip_code: {
        type: String
    },
    charity_id: {
        type: String
    },
    requested_car_category: {
        type: String
    },
    free_credit_used: {
        type: Number
    },
    surge_factor: {
        type: Number
    },
    color: {
        type: String
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    },
    Date: {
        type: String
    },
    PRCP: {
        type: Number
    },
    TMAX: {
        type: Number
    },
    TMIN: {
        type: Number
    },
    AWND: {
        type: Number
    },
    GustSpeed2: {
        type: Number
    },
    Fog: {
        type: Number
    },
    HeavyFog: {
        type: Number
    },
    Thunder: {
        type: Number
    },
    start: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    end: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    complete_date: {
        type: Date
    },
    start_date: {
        type: Date
    }
});

// Create model
let Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
