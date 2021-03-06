const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    family_name: { type: String, required: true, maxlength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.first_name}, ${this.family_name}`;
    }
    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function() {
    let lifetime_string = "";
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += " - ";
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear();
    }
    return lifetime_string;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function() {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function() {
    return this.date_of_birth ?
        DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) :
        "";
});

AuthorSchema.virtual("date_of_birth_HTML_formatted").get(function() {
    return this.date_of_birth ?
        this.date_of_birth.toLocaleDateString("en-CA") :
        "";
});

AuthorSchema.virtual("date_of_death_formatted").get(function() {
    return this.date_of_death ?
        DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) :
        "";
});

AuthorSchema.virtual("date_of_death_HTML_formatted").get(function() {
    return this.date_of_death ?
        this.date_of_death.toLocaleDateString("en-CA") :
        "";
});
module.exports = mongoose.model("Author", AuthorSchema);