import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import Client from "../models/client.js";
import User from "../models/user.js";
import Benod from "../models/benod.js";
function randomChar() {
  var index = Math.floor(Math.random() * 62);
  // Generate Number character
  if (index < 10) {
    return String(index);
    // Generate capital letters
  } else if (index < 36) {
    return String.fromCharCode(index + 55);
  } else {
    // Generate small-case letters
    return String.fromCharCode(index + 61);
  }
}

function randomString(length) {
  var result = "";
  while (length > 0) {
    result += randomChar();
    length--;
  }
  return result;
}

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

const updateBand = async (req, res, next) => {
  const { _id, bandName } = req.body;
  try {
    const band = await Benod.updateOne({_id},{ bandName })
    res.status(201).json({ band });
  } catch (err) {
    next(err);
  }
};

const updateReceieved = async (req, res, next) => {
  const { _id, projectReceieved } = req.body;
  const userId = req.user._id
  try {
    const project = await Client.updateOne(
      { userId, "clientData._id": mongoose.Types.ObjectId.createFromHexString(_id) },
      { $set: { "clientData.$.projectReceieved": projectReceieved } }
    );
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
};

const getReceived = async (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;
  try {
    const project = await Client.findOne(
      { userId },
      { clientData: { $elemMatch: { _id: mongoose.Types.ObjectId.createFromHexString(_id) } } }
    );
    console.log(project);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
};

const endProject = async (req, res, next) => {
  const { _id } = req.body;
  const userId = req.user._id;
  try {
    const project = await Client.findOneAndUpdate(
      { userId },
      { $pull: { clientData: { _id: mongoose.Types.ObjectId.createFromHexString(_id) } } },
      { new: true } // To return the updated document after the update
    );
    console.log(project);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
};

const updateClientData = async (req, res, next) => {
  const  userId  = req.user._id;
  const { projectLocation, projectName, _id } = req.body;
  try {
    let client
    if (projectName) {
      client = await Client.updateOne(
        { userId, "clientData._id": mongoose.Types.ObjectId.createFromHexString(_id) },
        { $set: { "clientData.$.projectName": projectName } }
      );
    }
    
    if (projectLocation) {
      client = await Client.updateOne(
        { userId, "clientData._id": mongoose.Types.ObjectId.createFromHexString(_id) },
        { $set: { "clientData.$.projectLocation": projectLocation } }
      );
    }
  console.log(client)
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

const createClientData = async (req, res, next) => {
  const { _id } = req.body;
  const userId = req.user._id
  try {
    const clientData = await Client.addData(userId, _id, '', '' , '0')
    console.log(clientData[0]._id)
    const projectId = clientData[0]._id
    await Benod.addBand('بند الكهرباء', projectId)
    await Benod.addBand('بند السباكة', projectId)
    await Benod.addBand('بند النجارة', projectId)
    await Benod.addBand('بند الارضيات', projectId)
    await Benod.addBand('بند النقاشة', projectId)
    await Benod.addBand('بند الالوميتال', projectId)
    await Benod.addBand('بند الزجاج', projectId)
    await Benod.addBand('بند الرخام', projectId)
    await Benod.addBand('بند الاكراميات', projectId)
    res.status(201).json({ clientData });
  } catch (err) {
    next(err);
  }
};

const addBand = async (req, res, next) => {
  const { projectId } = req.body;
  try {
    const band = await Benod.addBand('', projectId)
    console.log(band)
    res.status(201).json({ band });
  } catch (err) {
    next(err);
  }
};

const updateHesab = async (req, res, next) => {
  const { notes, type, paid, date, _id } = req.body;
  try {
    let band
    if (notes) {
      band = await Benod.updateOne(
        { "bandHesabat._id": mongoose.Types.ObjectId.createFromHexString(_id) },
        { $set: { "bandHesabat.$.notes": notes } }
      );
    }
    
    if (paid) {
      band = await Benod.updateOne(
        { "bandHesabat._id": mongoose.Types.ObjectId.createFromHexString(_id) },
        { $set: { "bandHesabat.$.paid": paid } }
      );
    }

    if (type) {
      band = await Benod.updateOne(
        { "bandHesabat._id": mongoose.Types.ObjectId.createFromHexString(_id) },
        { $set: { "bandHesabat.$.type": type } }
      );
    }
    if (date) {
      band = await Benod.updateOne(
        { "bandHesabat._id": mongoose.Types.ObjectId.createFromHexString(_id) },
        { $set: { "bandHesabat.$.date": date } }
      );
    }
  console.log(band)
    res.status(201).json({ band });
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

  const getBenod = async (req, res, next) => {
    const { _id } = req.user;
    const {projectId} = req.params
    try {
      console.log(projectId)
      const benod = await Benod.getAll(projectId)
      res.status(201).json({ benod });
    } catch (err) {
      next(err);
    }
  };

  const getHesabat = async (req, res, next) => {
    const { bandId, classType} = req.params
    try {
      const bandHesabat = await Benod.getHesabat(bandId, classType)
      console.log(bandHesabat)
      res.status(201).json({ bandHesabat: bandHesabat || [] });
    } catch (err) {
      next(err);
    }
  };

const getClientData = async (req, res, next) => {
    const userId = req.user._id;
    const { _id } = req.params
    try {
      const clientData = await Client.getData(userId, _id)
      console.log(clientData)
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

  const addHesab = async (req, res, next) => {
    const { _id, classType } = req.body
    try {
      const hesab = await Benod.addHesab(_id, classType)
      console.log(hesab)
      res.status(201).json({ hesab });
    } catch (err) {
      next(err);
    }
  };

  const getAccount = async (req, res, next) => {
    try {
      const client = await Client.findOne({_id: req.params.id});
      const exists = await User.findOne({phoneNumber: client.phoneNumber});
      if(exists)
        res.status(200).json({username: client.phoneNumber})
      const password = randomString(8)
      const user = await User.create({
        phoneNumber: client.phoneNumber,
        email: client.phoneNumber,
        password,
        role: "Client",
        engineer: req.user._id,
        name: client.name,
      })
      res.status(200).json({username: client.phoneNumber, password});
    } catch (err) {
      next(err);
    }
  };
export {
  createClient,
  getClients,
  getClientData,
  createClientData,
  updateClientData,
  addClientData,
  updateClient,
  getAccount,
  getBenod,
  addBand,
  getHesabat,
  updateHesab,
  updateBand,
  addHesab,
  updateReceieved,
  getReceived,
  endProject
};