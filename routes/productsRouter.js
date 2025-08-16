import express from 'express';
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("On products-route.");
});

export default router;
