import { render } from "ejs";
import Contact from "../models/contact.models.js";
import mongoose from "mongoose";

export const getContact = async (req, res) => {
  try {
    let { page = 1, limit = 6 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const result = await Contact.paginate({}, options);
    // res.json(result);
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      page: result.page,
      pagingCounter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    res.status(500).render("500", { message: error.message });
  }
};

export const showContactPage = async (req, res) => {
  const id = req.params.id;

  // ✅ Step 1: Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { message: "Invalid Object ID." });
  }

  try {
    // ✅ Step 2: Try to find the contact
    const contact = await Contact.findById(id);

    // ✅ Step 3: If not found, render 404
    if (!contact) {
      return res.status(404).render("404", { message: "Contact not found." });
    }

    // ✅ Step 4: Found, render the contact page
    res.render("show-contact.ejs", { contact });
  } catch (error) {
    // ✅ Step 5: Catch unexpected errors
    res.status(500).render("500", { message: "Something went wrong!" });
  }
};

export const addContactPage = (req, res) => {
  try {
    res.render("add-contact.ejs");
  } catch (error) {
    res.status(500).render("500", { message: error.message });
  }
};

export const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).render("500", { message: error.message });
  }
};

export const updateContactPage = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { message: "Invalid Object ID." });
  }
  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res
        .status(404)
        .render("404", { message: "Contact Does Not Exists!" });
    }
    res.render("update-contact", { contact });
  } catch (error) {
    res.status(500).render("500", { message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).render("500", { message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { message: "Invalid Object ID." });
  }
  try {
    await Contact.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).render("500", { message: error.message });
  }
};
