import { Schema, model } from 'mongoose'

const PaymentSchema = new Schema({
  chatId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  status: { type: String, default: 'created' },
})

export default model('Payment', PaymentSchema);
