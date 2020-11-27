require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const { Sequelize } = require("sequelize");
const {User, Account, Movement, Card} = require('../../db.js');
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(`${STRIPE_SECRET_KEY}`);


const getCards = async (ctx) => {
    try {
        const { userId } = ctx.params;
        const cards = await Card.findAll({where: {userId: userId}});
        return {
            message: 'success',
            content: cards
        }
    }
    catch(err){
        console.log(err);
    }
}

const addCard = async (ctx) => {
    try{
        const { userId, cardNumber, expyry, cvc, type, cardName} = ctx.params;
        const expMonth = expyry.split('/')[0];
        const expYear = expyry.split('/')[1];
        const account = await Account.findOne({where: {userId: userId }});
        const user = await User.findOne({where: {id: userId}});
        const card = await Card.create({
            cardNumber: cardNumber,
            expirationDate: expyry,
            securityCode: cvc,
            bank: 'Go-bank',
            type:type,
            cardName: cardName,
            userId: user.id
        });
        const customerId = account.customer;
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              number: cardNumber,
              exp_month: expMonth,
              exp_year: expYear,
              cvc: cvc,
            },
            billing_details:{
                address:{
                    city: user.city,
                    country: 'CO',
                    postal_code: "111211",
                },
                email: user.email,
                name: `${user.name} ${user.lastname}`,
                phone: user.phone
            },
            metadata: {cardId: card.id}
          });
        const attachedPay = await stripe.paymentMethods.attach(paymentMethod.id, {customer: customerId})
        return {
            message: 'success',
            content: card
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    getCards,
    addCard
}