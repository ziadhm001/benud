import mongoose from "mongoose"


const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    clientData: {
        type: Array,
        required: false,
    }
})

clientSchema.statics.add = async function (
    name,
    phoneNumber,
    userId,
) {
    // validation
    if (!name || !phoneNumber) {
        throw Error("All fields must be filled")
    }
    const exists = await this.findOne({ phoneNumber })

    if (exists) {
        throw Error("تم تسجيل العميل بالفعل")
    }


    const client = await this.create({
        name,
        phoneNumber,
        userId,
    })

    return client
}

clientSchema.statics.getAll = async function (_id){
    const clients = await this.find({userId: _id}).select('name phoneNumber')
    return clients
}

clientSchema.statics.getData = async function (userId, _id){
    const client = await this.findOne({userId, _id}).select('clientData')
    if(client)
        return client
    return null
}

clientSchema.statics.addData = async function (userId, _id, projectName, projectLocation, projectReceieved) {
    const updatedClient = await this.findOneAndUpdate(
      { userId, _id },
      { $push: { clientData: { _id: new mongoose.Types.ObjectId(), projectName, projectLocation, projectReceieved} } },
      { new: true } // Add this option to return the updated document
    );
  
    if (updatedClient) {
      const newElements = updatedClient.clientData.slice(-1); // Get the last element in the clientData array
  
      return newElements;
    }
  
    return null;
  };
export default mongoose.model("Client", clientSchema)
