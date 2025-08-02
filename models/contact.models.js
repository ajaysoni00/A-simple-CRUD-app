import mongoose from "mongoose";
import Mpaginate from "mongoose-paginate-v2";

const contactSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});
contactSchema.plugin(Mpaginate);
const Contact = mongoose.model("Contact", contactSchema);
// Export the Contact model for use in other files
export default Contact;
