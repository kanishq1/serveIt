var express = require("express");
var router = express.Router();

// var themes = require("../controllers/themeCtrl");
// var atcStrip = require("../controllers/atcStripCtrl");
var login = require("../controllers/loginCtrl");
var atc = require("../controllers/atc-strips-no-cache");
var crud = require("../controllers/crud");
const verify = require("../functions/verifyFunc");
const sercives = require("../controllers/serciveCtrl");
const request = require("../controllers/requestCtrl");
const community = require("../controllers/communityCtrl");
// // Login and onboarding
// router.post('/register', login.register);
router.post("/login", login.login);
router.post("/update", verify.user, login.update);
router.post("/updateLink", verify.user, login.updateLink);
router.post("/verify", verify.user, login.verifyUser);
router.get("/verify", verify.user, login.checkVerify);

router.post("/request", verify.user, request.requestService);
router.post("/accept", verify.user, request.acceptService);
router.get("/showServices", verify.user, request.showService);
router.post("/cancelServiceReciever", verify.user, request.cancelServiceReciever);
router.post("/cancelServiceProvider", verify.user, request.cancelServiceProvider);
router.get("/showServiceProvider", verify.user, request.showServiceProvider);
router.get("/showServiceReciever", verify.user, request.showServiceReciever);
router.get("/availableNow", verify.user, request.servicesAvailabeNow);
router.post("/updateStatus", verify.user, request.updateStatus);
router.post("/find", request.findDistance);

router.post("/addService", verify.user, sercives.addService);
router.get("/services", verify.user, sercives.getAllServices);
router.post("/joinServices", verify.user, sercives.applyService);
router.post("/verifyProvider", verify.user, sercives.acceptProviderService);

router.post("/joinCommunity", verify.user, community.joinCommunity);
router.post("/createCommunity", verify.user, community.addCommunity);
// // ATC and the ATC Strips
// router.get('/atc/strips', atc.getAll);
// router.get('/atc/progress/strip', atc.get);
// router.post('/atc/strip/create', atc.create);
// router.delete('/atc/strip/delete', atc.delete);

// router.post("/request/permission", login.requestPermission);
// router.post("/grant/permission", login.allotPermission);
// router.get("/get/user/team", login.getUserTeams);
// router.get('/search/user', login.userFullTs);

router.post("/create/kv", verify.user, crud.create);
router.get("/get/kv", crud.get);

module.exports = router;
