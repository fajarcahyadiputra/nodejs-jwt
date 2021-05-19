const express = require('express');
const jwt     = require('jsonwebtoken');

const app     = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

const User    = [
    {
        "email": "fajar@gmail.com",
        "password": "1234567"
    },
    {
        "email": "asep@gmail.com",
        "password": "1234567"
    },
    {
        "email": "ajis@gmail.com",
        "password": "1234567"
    }
]

const createToken = (data, secret, expired)=>{
    return jwt.sign({data}, secret, {expiresIn: expired})
}


app.post('/login', (req, res) => {
    try {
        const {email, password} = req.body;
        const user = User.find((data)=> data.email == email);
        if(user){
            if(user.password != password){
                res.status(500).json({
                    message: "password wrong"
                });
            }
        const token = createToken(user, "fajar","10m");
         res.json({
             token
         });
        }else{
            res.status(404).json({
                message: 'Email Wrong'
            });
        }
        
    } catch (error) {
        console.log(error);
    }
});
app.post('/refreshToken', (req, res) => {
    try {
        const {token, email} = req.body;
        jwt.verify(token, 'fajar', function(err, dataEncode){
            if(err){
                 return res.status(500).json({
                     message: err.message
                 });
            }
        const newToken = createToken(dataEncode.data, 'fajar', '10m');
         return res.json({
             newToken
         });
        })
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});