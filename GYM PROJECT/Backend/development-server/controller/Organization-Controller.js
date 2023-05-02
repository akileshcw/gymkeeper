const {Organization} = require('../models')
const {Op, where} = require('sequelize')
const {v4 : uuidv4} = require('uuid');

async function add_organization(req,res){
  const org = req.body
  const uuid = uuidv4()
  try{
    const or = await Organization.findAll({
      where: {
        name: org.name
      },
      raw:true
    })

    if(Object.keys(or).length != 0){
      return res.status(208).send({message: 'This Organization is already Exists'})
    }

    const nw_org = await Organization.create({
      uuid: uuid,
      name: org.name,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return res.status(200).send({message: 'Successfull'})
  }
  catch(e){
    console.log(e)
  }
}

async function organization_get(req,res){
  try{
    const org = await Organization.findAll({attributes: ['name'],raw :true}) 

    // console.log(org)

    return res.status(200).send({org : org})
  }
  catch(e){
    console.log(e)
  }
}

module.exports = {add_organization,organization_get}