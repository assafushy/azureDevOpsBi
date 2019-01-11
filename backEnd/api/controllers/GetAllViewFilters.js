const ViewFilters = require('../models/viewFilterModel');

module.exports = {
  GetAllViewFilters:GetAllViewFilters
}

async function GetAllViewFilters(req,res){
  let allViewFilters = await ViewFilters.find();
  res.json(allViewFilters);
}