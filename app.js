const express = require( "express" );
const mongoose = require( "mongoose" );
const app = express();
const { MONGOURI } = require( "./keys" );
const port = 9999;

mongoose.connect( MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} );
mongoose.connection.on( "connected", ()=>{
    console.log( "Mongoose Atlas connected !!!" );
});

mongoose.connection.on( "error", ( error )=>{
    console.log( "OOPS !! Problem in connecting Mongoose atlas !!", error );
});

app.listen( port, ()=> {
    console.log( `App is running on port : ${port} !!`); 
});
