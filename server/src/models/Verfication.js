import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const caseSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

caseSchema.methods.toJSON = function () {
  return {
    id: this._id,
    email: this.email,
    fistname: this.fistname,
    lastname: this.lastname,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

export const validateCase = (c) => {
  const schema = {
    email: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  };
  return Joi.validate(c, schema);
};

const Case = mongoose.model('Case', caseSchema);

export default Case;
