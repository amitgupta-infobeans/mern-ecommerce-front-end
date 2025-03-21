# Create api folder in root directory and run the command.
    1) npm i express mongoose jsonwebtoken bcryptjs cors
    2) npm init -y  (it will run first but no problem we can run it after the above command.)    
    3) now change the index.js file to server.js and add "type":"module"  in package.json file.
    4) npm i -g nodemon   ( to install nodemon.)

# Now connect with mongoDB database.
    1) and connect mongoose with database.
    
# Now add User and Product Services.
    1) login User, get all user, and register new user.
    2) add product,
    3) for the product category validation install validator package.
        npm i validator
    4) created product model and added validation at DB level.

# Now Create Cart model,controller and router and add the following api routes:
    1) add to cart
    2) get user cart
    3) edit cart
    4) remove item from cart
    5) clear cart

# Also added Auth token validation using jsonwebtoken with method:  sign and verify.

# Added User Shipping Address API:
    1) add Address
    2) get Address ( return latest added address)