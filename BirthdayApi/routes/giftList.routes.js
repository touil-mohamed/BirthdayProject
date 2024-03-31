const giftListController = require("../controller/giftList.controller");

const express = require("express");
const routes = express();

routes.get("",function(req,res){
  giftListController.getAllGiftList(req,res);
});
routes.get("/active",function(req,res){
  giftListController.getActiveGiftLists(req,res);
});
routes.get("/:id",function(req,res){
  giftListController.getGiftListById(req,res);
});
routes.post("/create",function(req,res){
  giftListController.createGiftList(req,res);
});
routes.patch("/update/:id",function(req,res){
  giftListController.updateGiftList(req,res);
});

module.exports = {
  routes,
};