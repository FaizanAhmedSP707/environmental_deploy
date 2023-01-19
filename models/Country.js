const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema(
    {
        name: String,
        population: Number,
        Average_summer_temperature: Number,
        Average_winter_temperature: Number,
        CO2_pollution_percentage: Number,
        Air_pollution_percentage: Number,
        Clean_water_percentage: Number,
        Water_pollution_percentage: Number,
        CO2_emissions_in_million_metric_tons_per_million: Number
    },
    {timestamps: true}
)