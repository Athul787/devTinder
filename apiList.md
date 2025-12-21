# DevTinder APIs

## authRouter

POST /signup
POST /login
POST /logout

## profileRouter

GET /profile/view
GET /profile/edit
GET /profile/password

## connectionRequestRouter

POST /request/send/:status/:userId //interested or ignored

POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

## userRouter

GET /user/connections
GET /user/requests
GET /user/feed
