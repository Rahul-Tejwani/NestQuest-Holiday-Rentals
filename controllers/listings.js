const Listing = require("../models/listing");
const cloudinary = require("cloudinary").v2; //For storing Listing images in Cloud
const fs = require("fs");

//Requiring libraries for MapBox SDK
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Route to display all the Listings present in the database
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//Route to display form for creating new Listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listingDetail = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listingDetail) {
    req.flash("error", "Requested listing does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listingDetail });
};

module.exports.createListing = async (req, res, next) => {
  //Code for MapBox Geocoding functionality ie to converting Location to Cordinates
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const newListing = new Listing(req.body.listing);
  //To upload Image from Local Storage(/uploads) to Cloudinary
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path)
    .catch((error) => {
      console.log(error);
    });
  let url = uploadResult.secure_url;
  let filename = uploadResult.display_name;
  //To delete file uploaded in the uploads folder
  fs.unlink(req.file.path, (err) => {
    if (err) console.log(err);
  });
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const existingRecord = await Listing.findById(id);
  if (!existingRecord) {
    req.flash("error", "Requested listing does not exist");
    res.redirect("/listings");
  }
  let originalImageUrl = existingRecord.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/c_fill,h_300,w_300"
  );
  res.render("listings/edit.ejs", { existingRecord, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  //For updating the Location/cordinates of the Listing
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  updatedListing.geometry = response.body.features[0].geometry;

  //Uploading Image to update into Cloudinary
  if (typeof req.file !== "undefined") {
    const uploadResult = await cloudinary.uploader
      .upload(req.file.path)
      .catch((error) => {
        console.log(error);
      });
    let url = uploadResult.secure_url;
    let filename = uploadResult.display_name;
    //To delete file uploaded in the uploads folder
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });
    updatedListing.image = { url, filename };
  }
  await updatedListing.save();
  req.flash("success", "Listing updated successfully.");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted successfully.");
  res.redirect("/listings");
};

module.exports.search = async (req, res) => {
  let input = req.query.search.trim().replace(/\s+/g, " "); // Remove starting, ending and middle space remove and add one space in middle.
  if (input == "" || input == " ") {
    //search value empty
    req.flash("error", "Search value empty !!!");
    res.redirect("/listings");
  }

  // Convert first letter of every word capital and rest small.
  let data = input.split("");
  let element = "";
  let flag = false;
  for (let index = 0; index < data.length; index++) {
    if (index == 0 || flag) {
      element = element + data[index].toUpperCase();
    } else {
      element = element + data[index].toLowerCase();
    }
    flag = data[index] == " ";
  }
  let allListings = await Listing.find({
    title: { $regex: element, $options: "i" },
  });
  if (allListings.length != 0) {
    res.locals.success = "Listings searched by Title";
    res.render("listings/index.ejs", { allListings });
    return;
  }
  if (allListings.length == 0) {
    allListings = await Listing.find({
      country: { $regex: element, $options: "i" },
    }).sort({ _id: -1 });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Country";
      res.render("listings/index.ejs", { allListings });
      return;
    }
  }
  if (allListings.length == 0) {
    req.flash("error", "Listings is not here !!!");
    res.redirect("/listings");
  }
};
