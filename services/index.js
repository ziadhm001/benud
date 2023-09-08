export function generateCrudMethods(Model) {
  return {
    getAll: () => Model.find().populate("creator", "name"),
    getAllCondition: (data) => Model.find(data).populate("creator", "name"),
    getById: (id) => Model.findById(id).populate("creator", "name"),
    getByCreator: (id) => Model.find({ creator: id }),
    getByAssigned: (id) =>
      Model.find({ assigned: [id] }).populate("creator", "name"),
    getByObject: (object) => Model.findOne(object),
    create: (record) => Model.create(record),
    update: (id, record) => Model.findByIdAndUpdate(id, record, { new: true }),
    delete: (id) => Model.findByIdAndDelete(id),
  };
}
