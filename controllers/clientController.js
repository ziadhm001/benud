import mongoose from "mongoose";
import Client from "../models/client.js";

const updateClient = async (req, res, next) => {
  const  userId  = req.user._id;
  const { name, phoneNumber, _id } = req.body;
  try {
    let client
    if(name)
      client = await Client.updateOne({_id, userId},{name})
    if(phoneNumber)
      client = await Client.updateOne({_id, userId},{phoneNumber})
    res.status(201).json({ client });
  } catch (err) {
    next(err);
  }
};

const createClient = async (req, res, next) => {
  const { _id } = req.user;
  try {
    console.log(_id)
    const client = await Client.create({name: ' ', phoneNumber: ' ', userId: _id})
    res.status(201).json({ client });
  } catch (err) {
    next(err);
  }
};

const getClients = async (req, res, next) => {
    const { _id } = req.user;
    console.log(req.user)
    try {
      const clients = await Client.getAll(_id)
      res.status(201).json({ clients });
    } catch (err) {
      next(err);
    }
  };

const getClientData = async (req, res, next) => {
    const userId = req.user._id;
    const { _id } = req.params
    try {
      const clientData = await Client.getData(userId, _id)
      res.status(201).json({ customerData: clientData.clientData || [] });
    } catch (err) {
      next(err);
    }
  };

const addClientData = async (req, res, next) => {
    const userId = req.user._id;
    const { _id, projectName, projectLocation } = req.body
    try {
      const clientData = await Client.addData(userId, _id, projectName, projectLocation)
      res.status(201).json({ clientData });
    } catch (err) {
      next(err);
    }
  };
export {
  createClient,
  getClients,
  getClientData,
  addClientData,
  updateClient
};