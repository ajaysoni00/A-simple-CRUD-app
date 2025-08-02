import express from "express";
const router = express.Router();
import {
  getContact,
  showContactPage,
  addContact,
  addContactPage,
  updateContact,
  updateContactPage,
  deleteContact,
} from "../controller/contact.controller.js";

router.get("/", getContact);

router.get("/show-contact/:id", showContactPage);

router.get("/add-contact", addContactPage);

router.post("/add-contact", addContact);

router.get("/update-contact/:id", updateContactPage);

router.post("/update-contact/:id", updateContact);

router.get("/delete-contact/:id", deleteContact);

export default router;
