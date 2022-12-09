

module.exports = app => {
  //configurar las rutas

  const authRoutes = require("./auth.routes");
  app.use("/api/auth", authRoutes)

  const postsRoutes = require("./posts.routes");
  app.use("/api/post", postsRoutes)

  const uploadRoutes = require("./upload.routes");
  app.use("/api/upload", uploadRoutes)

  const commentsRoutes = require("./comments.routes");
  app.use("/api/comment", commentsRoutes)


}