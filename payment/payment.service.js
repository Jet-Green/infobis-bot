import PaymentModel from './payment.model.js'

export default {
  async setupPayment(
    /*
      id: chat id u can send message to the chat by id,
      first_name: user name,
      last_name: user last name,
      type: 'private'
    */
    chat
  ) {
    return await PaymentModel.create({
      chatId: chat.id,
      firstName: chat.first_name,
      lastName: chat.last_name,
      status: 'created',
    })
  },
  async getPaymentByChatId(chatId) {
    return await PaymentModel.findOne({ chatId })
  }
}