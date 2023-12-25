# BIZ_CARD_BACKEND

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [endpoints](#endpoints)

## Installation

run the project with: pnpm run

## Usage

### if using rest then request can look loke this :
    METHOD http://localHost:8080/api/v1/{users or cards}/endpoint
replace users or card with what you need and add another endpoint if you need 
+ # endpoints
## users
#### POST
+ /users - register new user
+ /users/login - login for exist user
#### GET
+ /users - admin get all users
+ /users/:id - admin get user by id or user get himeself
#### PUT
+ /users/:id - user edit himself
#### PATCH
+ /users/:id - user edit if he is buisness or not
#### DELETE 
+ /users/:id - user delete himself or admin delete user

## cards
#### GET
+ /cards - get all cards
+ /cards/:id - get card by
+ /cards/my-cards - user get his cards
#### POST
+ /cards - buisness user create new card
#### PUT
+ /cards/:id - user edit his own card
#### PATCH
+ /cards/:id - user like card
#### DELETE 
+ /cards/:id - user delete his own card or admin delete card
