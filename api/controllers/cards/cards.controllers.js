
// Ejemplo de las funciones que irían en controllers
// const { Card } = require("../db");

// module.exports = async (ctx) => {
//   // Recibe el ctx (contexto) que son todos los datos

//   let json; // siempre se debe definir
//   await Card.create(ctx.params)
//     .then((data) => {
//       json = { data }; // Luego toma la respuesta que da
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return json; // Y se retorna
// };

// //------------------------------------------------------------------------------------------

// //Otro ejemplo en la carpeta controllers  en este caso  getCard.js

// const { Card } = require("../db");

// module.exports = async (ctx) => {
//   const { cardNumber, expirationDate, securityCode, bank } = ctx.params;
//   let json;
//   await Card.findOne({ where: { cardNumber: cardNumber } })
//     .then((data) => {
//       json = data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return json;
// };