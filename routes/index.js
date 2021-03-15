var express = require("express");
var router = express.Router();

// var themes = require("../controllers/themeCtrl");
// var atcStrip = require("../controllers/atcStripCtrl");
var login = require("../controllers/loginCtrl");
var atc = require("../controllers/atc-strips-no-cache");
var crud = require("../controllers/crud");
const verify = require("../functions/verifyFunc");
const sercives = require("../controllers/serciveCtrl");
const provider = require("../controllers/providerCtrl");
const request = require("../controllers/requestCtrl");
const community = require("../controllers/communityCtrl");
const admin = require("../controllers/adminCtrl");
// // Login and onboarding
// router.post('/register', login.register);
router.post("/login", login.login);
router.post("/update", verify.user, login.update);
router.post("/updateLink", verify.user, login.updateLink);
router.post("/verify", verify.user, login.verifyUser);
router.get("/profile", verify.user, login.profile);

router.post("/request", verify.user, request.requestService);
router.post("/accept", verify.user, request.acceptService);
router.get("/showServices", verify.user, request.showService);
router.post("/cancelServiceReciever", verify.user, request.cancelServiceReciever);
router.post("/cancelServiceProvider", verify.user, request.cancelServiceProvider);
router.get("/showServiceProvider", verify.user, request.showServiceProvider);
router.get("/showServiceReciever", verify.user, request.showServiceReciever);
router.get("/availableNow", verify.user, request.servicesAvailabeNow);
router.post("/updateStatusRequest", verify.user, request.updateStatus);
router.post("/find", request.findDistance);
router.post("/payment", request.payment);

router.post("/addService", sercives.addService);
router.get("/services", sercives.getAllServices);
router.get("/services/:id", sercives.getServiceById);
router.put("/modifyService", sercives.modifyService);

router.get("/providerServices", verify.user, provider.getAllServicesProvider);
router.post("/joinServices", verify.user, provider.applyService);
router.post("/verifyProvider", verify.user, provider.acceptProviderService);

router.post("/joinCommunity", verify.user, community.joinCommunity);
router.post("/createCommunity", verify.user, community.addCommunity);
router.post("/requestCommunity", verify.user, community.requestCommunity);
router.post("/showCommunities", verify.user, community.showCommunities);
router.post("/verifyUserCommunity", verify.user, community.acceptJoinCommunityRequest);

router.post("/admin/addCommunity", admin.addCommunity);
router.post("/admin/removeCommunity", admin.removeCommunity);
router.post("/admin/login", admin.adminLogin);
router.post("/admin/acceptProvider", admin.acceptProvider);
router.post("/admin/rejectProvider", admin.rejectProvider);
router.get("/admin/services", admin.listService);
router.get("/admin/communities", admin.listCommunities);
router.get("/admin/requestedCommunities", admin.listRequestedCommunities);
router.get("/admin/providers", admin.listProviders);
router.get("/admin/users", admin.listUsers);
router.post("/admin/addServices", admin.addService);
router.post("/admin/acceptCommunity", admin.changeCommunityStaus);
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
