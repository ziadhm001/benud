import mongoose from "mongoose"

const Schema = mongoose.Schema

const benodSchema = new Schema({
    projectId: mongoose.Types.ObjectId,
    bandName: String,
    bandReceived: String,
    bandHesabat: Array,
})

benodSchema.statics.addHesab = async function (_id, classType) {
    const id = new mongoose.Types.ObjectId();
    const hesab = await this.findOneAndUpdate(
      { _id },
      { $push: { bandHesabat: { _id: id, date: '', type: '', paid: 0, notes: '', classType } } }
    );
    return id;
  };
benodSchema.statics.getHesabat = async function (_id, classType){
    const band = await this.findOne({_id}).select('bandHesabat')
    console.log(_id, classType)
    console.log(band)
    if(band)
        if(Array.isArray(band.bandHesabat))
        return band.bandHesabat.filter(hesab => hesab.classType === classType)
    return null
}

benodSchema.statics.getAll = async function (projectId){
    const benod = await this.find({projectId})
    return benod
}

benodSchema.statics.addBand = async function (bandName, projectId){
    const band = await this.create({bandName, projectId, bandReceived: '0', bandHesabat: []})
    return band
}

benodSchema.statics.addData = async function (userId, _id, projectName, projectLocation, benodId) {
    const updatedClient = await this.findOneAndUpdate(
      { userId, _id },
      { $push: { clientData: { _id: new mongoose.Types.ObjectId(), projectName, projectLocation, benodId} } },
      { new: true } // Add this option to return the updated document
    );
  
    if (updatedClient) {
      const newElements = updatedClient.clientData.slice(-1); // Get the last element in the clientData array
  
      return newElements;
    }
  
    return null;
};

export default mongoose.model("Benod", benodSchema)
