const viewFilters = require('../models/viewFilterModel');

module.exports ={
  GetAllViewFilters:GetAllViewFilters,
  AddViewFilter:AddViewFilter,
  DeleteViewFilterById:DeleteViewFilterById,
  UpdateViewFilterById:UpdateViewFilterById
}

async function GetAllViewFilters(req,res){
  let allViewFilters = await viewFilters.find();
  res.json(allViewFilters);
}

async function AddViewFilter(req,res){
  console.log(`Adding view filter: ${JSON.stringify(req.swagger.params.newViewFilter.value)}`);
  let newFilter={};
  try{
    newFilter = await viewFilters.create(req.swagger.params.newViewFilter.value);
  }catch(error){
    console.log(error);
    res.statusCode  = 409;
    res.end(JSON.stringify(error));
  }
  res.json({newFilter});
}

async function DeleteViewFilterById(req,res){
  console.log(`Removing viewFIlter by id : ${req.swagger.params.id.value}`);
  let deletedFilter
  try{
    deletedFilter = await viewFilters.findByIdAndDelete(req.swagger.params.id.value);
  }catch(error){
    console.log(error);
    res.statusCode  = 409;
    res.end(JSON.stringify(error));
  }
  res.json(deletedFilter);
}

async function UpdateViewFilterById(req,res){
  console.log(`Updating viewFilter by id : ${req.swagger.params.id.value}`);
  let updatedViewFilter;
  try{
    updatedViewFilter = await viewFilters.findByIdAndUpdate(req.swagger.params.id.value,req.swagger.params.updatedViewFilter.value);
  }catch(error){
    console.log(error);
    res.statusCode  = 400;
    res.end(JSON.stringify(error));
  }
  res.json(updatedViewFilter);
}