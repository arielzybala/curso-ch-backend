const getRoot = async (ctx) => {
  await ctx.render("root", { msg: "MUNDO" });
};

module.exports = { getRoot };
