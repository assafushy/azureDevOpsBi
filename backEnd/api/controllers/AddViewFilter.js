const viewFilters = require('../models/viewFilterModel');

module.exports ={
  AddViewFilter:AddViewFilter
}

async function AddViewFilter(req,res){
  console.log(req.swagger.params.newViewFilter.value)
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