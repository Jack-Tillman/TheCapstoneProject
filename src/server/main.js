require('dotenv').config()

const stripe_key = "sk_test_51O4ri0Hfk6TyDeClXsavHZ9Gp2ULD6C9RSif4hhtIuCfjc6wK8tsmi4yrwlr3gkkXmy3LOhBGUyGRYJVCShvjUWt00RzuTg4IO"

const express = require('express');
const router = require('vite-express');
const app = express();
let cors = require('cors');

const stripe = require('stripe')(stripe_key);

const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cors());

const db = require('./db/client');
db.connect();

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.post("/checkout", async(req, res) => {
 
  //Stripe calls items lineItems in the API call
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
      //organize data how Stripe wants with price as id
      lineItems.push(
          {
              price: item.stripe_id,
              quantity: item.quantity
          }
      )
  })

  const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
  })

  res.send(JSON.stringify({
      url: session.url
  }))
})

router.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

module.exports = router;