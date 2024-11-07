The Tubonge Application is chat application developed for users who love to upload their photos and videos . The chat will enable also new users to create new bio and update them .
This a backend application only, used to test for the following functions on API's such as Postman, Insomnia among others

The application utilizes the CRUD methodology in the API's testing, thus anyone can use it for the frontend part .

HOW TO USE THE Backend Systems

git clone https://github.com/Festongithub/Tubonge.git

cd Tubonge/Chat_Room/server

run nodemon

Open either the Postman API and Insomnia .

The following are the API's involved:

The Chats API',
router.post('/userChat', createChat);
router.get('/:userId', findUserChat);
router.get('/find/:firstId/:secondId', findChat);

The Message API's

router.post('/send', createMessage);
router.get('/find/:chatId', getMessage);

The Rooms API's
router.post('/create', createRoom);
router.post('/join', joinRoom);
router.post('/leave', leaveRoom);
router.get('/find', roomFinding);

The Users API's
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers)


