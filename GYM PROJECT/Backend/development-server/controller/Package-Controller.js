const {Packages} = require('../models')
const {Op, where} = require('sequelize')
const {v4 : uuidv4} = require('uuid');

async function add_package(req,res){
  const pack = req.body
  const uuid = uuidv4()
  try{
    const pck = await Packages.create({
      uuid : uuid,
      package_name: pack.package_name,
      amount: pack.amount,
      org_name: pack.org_name,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    res.status(200).send({message : 'Successfull'})
  }
  catch(e){
    console.log(e)
  }
}

module.exports = {add_package}