

module.exports = app => {
  //configurar las rutas

  const authRoutes = require("./auth.routes");
  app.use("/api/auth", authRoutes)

  const postsRoutes = require("./posts.routes");
  app.use("/api/posts", postsRoutes)

  const uploadRoutes = require("./upload.routes");
  app.use("/api/upload", uploadRoutes)


}