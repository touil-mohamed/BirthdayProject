const giftController = require("../controller/gift.controller");
const express = require("express");
const routes = express();

routes.get("",function(req,res){
  giftController.getAllGift(req,res);
});
routes.get("/:id",function(req,res){
  giftController.getGiftById(req,res);
});
routes.get("/List/:id",function(req,res){
  giftController.getGiftsByListId(req,res);
});
routes.post("/create",function(req,res){
  giftController.createGift(req,res);
});
routes.patch("/update/:id",function(req,res){
  giftController.updateGift(req,res);
});
module.exports = {
  routes,
};
