

const jwt  = require("jsonwebtoken");


const verifyToken = async(req,res,next)=>{
    try{
        const authHeader = req.headers["authorization"];
        console.log("Auth header:", authHeader);
        const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).send("Access denied");


    const decode= jwt.verify(token , "myscret") ; 
    req.user = decode ; 
    console.log("done")
    next() ; 
    }
    catch (err) {
        return res.status(401).send("Invalid or expired token.");
}
}
module.exports = {verifyToken};