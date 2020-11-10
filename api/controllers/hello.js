const hello = (ctx) => {
    return `hola ${ctx.params.email}`
}
module.exports = {
    hello
}