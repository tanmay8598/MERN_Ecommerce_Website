import nodemailer from 'nodemailer'

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'solutionsrna@gmail.com',
    pass: 'lucknow@123',
  },
})

contactEmail.verify((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Ready to Send')
  }
})

const emailController = (req, res) => {
  const uname = req.body.name
//   const items = JSON.stringify(req.body.items)
// const items = req.body.items
//   const {_id, name, price, qty} = items
//   const shippingAddress = req.body.shippingAddress
//   const paymentMethod = req.body.paymentMethod
//   const email = req.body.email
const prname = req.body.prname
const orderID = req.body.orderID
const shippingPrice = req.body.shippingPrice
const shippingAddress =JSON.stringify(req.body.shippingAddress)
const totalPrice = req.body.totalPrice
const orderItems = req.body.orderItems
const item = orderItems.map(item => 
        item.name
)
console.log(item);
  

  const mail = {
    from: '"8 Senses 👻" <info@8senses.com>',
    to: 'global1osh@gmail.com',
    subject: 'Order confirmation 8senses',
    html: `  
    <p>UserID: ${uname}</p>
    <p>orderID: ${orderID} </p>
    <p>Products: ${item}</p>
    <p>Shipping Price: ${shippingPrice}</p>
    <p>Shipping Address: ${shippingAddress}</p>
    <p>Total Price: ${totalPrice}</p>
    

    `,
  }
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'ERROR' })
      console.log("error");
    } else {
      res.json({ status: 'Message Sent' })
      console.log("sent");
    }
  })
}

export default emailController