
## MVP
- [ ] GEOLOCALIZACIÓN, SOLO DESDE LA POSICIÓN DEL QUE ABRE LA APLICACIÓN.
- [ ] CRUD.
- [ ] MURO DE PUBLICACIONES Y COMENTARIOS.
- [ ] ROLES: USUARIO, ADMIN, USUARIOS VERIFICADOS( POR RATING(COUNT) Y PUBLICACIONES). like.
- [ ] AGREGAR CONTACTO, 
- [ ] API GOOGLE.MAP.

seed... sembrar una base de datos programaticamente, facker, 

## BONUS
- [ ] FAV Y LIKE, RENDERIZANDO EN TU MURO.
- [ ] GEOLOCALIZACIÓN, POR SEARCH.
- [ ] CHAT INTERNO DE COMUNCIACIÓN.
- [ ] ENVIO DE CORREOS ELECTRÓNICOS.
- [ ] PUBLICACIÓN DE VIDEOS.
- [ ] PUBLICIDAD.
- [ ] EVENTOS Y RATING.
- [ ] GRUPOS.


# APIs

- API Google
- Cloudinary

# URL ( ROUTES CLIENT ) / PAGES


| URI path      | Description              | Protect    |
| ------------- | ------------------------ | ---------- |
| `/`           | HOME PAGE: donde incluimos, login, sing up, about us. ( navbar, footer )         |      NO      |
| `/post`       | MURO DE PUBLICACIONES: modal create post, visualización, comentarios, likes, redirect profile, your profile, reportar post( llega un aviso al admin)          |       SI     |        
| `/profile`    | usuario en detalle- mis publicaciones, mis amigos, mi perfil, imagen, description, email, username, |      SI      |  
| `/admin-panel`| panel de dirección: ver usuarios, recibe report de post, CRUD de usuarios, CRUD de post. |      SI,SOLO ADMIN      | 
| `/about-us`   | Información developers. Contacto Modal. |      NO      | 




# CONTEXTOS

- [ ] Usuario Global.
- [ ] Post Global.

# COMPONENTES

- [ ] NAVBAR (NAVIDATION)
- [ ] FOOTER
- [ ] FORM LOGIN
- [ ] FORM SING UP
- [ ] FORM NEW POST
- [ ] FORM EDIT POST
- [ ] FORM CONTACT
- [ ] TOASTER (REACT-BOOTSTRAP)
- [ ] POST CARD(MURO DE PUBLICACIONES)
- [ ] POST LEAST
- [ ] LOADER(SPINNER) 
- [ ] USER-MESSEGE
- [ ] GOOGLE.MAP (DUDA, DONDE INCORPORARLO)
- [ ] FRIEND ( INTERACCIÓN )



# ROUTES SERVER

## AUTH & INDEX

| HTTP Method | URI path     | Description              | 
| ----------- | ------------ | ------------------------ |   
| POST        | `/signup`    | Signup page              |            
| POST        | `/login`     | Login page post          |      
| GET         | `/verify`    | Verification of the user |          

## USER

| HTTP Method | URI path                         | Description           | 
| ----------- | -------------------------------- | --------------------- | 
| GET         | `/userAll`                       | User profiles         |  
| GET         | `/userOneDetails/:user_id`       | Update user settings  |     
| POST        | `/saveUser`                      | Change user           |      

## POSTER

| HTTP Method | URI path                         | Description           | 
| ----------- | -------------------------------- | --------------------- | 
| GET         | `/posterAll`                     | All info poster       |      
| GET         | `/posterOneDetails/{poster_id}`  | Only one poster       |      
| POST        | `/posterSave`                    | Change info poster    |      

