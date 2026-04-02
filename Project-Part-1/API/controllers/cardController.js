const pool = require('../dbs/db');

const getCards = async (req, res) => {
    try{
        const result = await pool.query('select * from public.cards');
        res.json(result.rows);
    }catch (err){
        console.error(err);
        res.status(500).json({error : "Players retrieval query fail"});
    }
}

const postCard = async (req, res) => {
    try{
        console.log('POST body:', req.body);
        const { id, card_name, card_image_url} = req.body;

        const result = await pool.query("insert into public.cards (id, card_name, card_image_url) values ($1, $2, $3)", [id, card_name, card_image_url]);

        res.status(201).json({response: "Added the information you requested"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
}

module.exports = { getCards, postCard };