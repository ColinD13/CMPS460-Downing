const pool = require("../dbs/db");

const getCards = async (req, res) => {
  try {
    const result = await pool.query("select * from public.cards");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Players retrieval query fail" });
  }
};

const postCard = async (req, res) => {
  try {
    console.log("POST body:", req.body);
    const { id, card_name, card_image_url } = req.body;

    const result = await pool.query(
      "insert into public.cards (id, card_name, card_image_url) values ($1, $2, $3)",
      [id, card_name, card_image_url],
    );

    res.status(201).json({ response: "Added the information you requested" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getCommanders = async (req, res) => {
  try {
    const result = await pool.query("select * from public.commanders");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Card retrieval query fail" });
  }
};

const postCommander = async (req, res) => {
  try {
    console.log("POST body:", req.body);
    const { id, commander_name, commander_image_url } = req.body;

    const result = await pool.query(
      "insert into public.commanders (commander_name, commander_image_url, id) values ($1, $2, $3)",
      [commander_name, commander_image_url, id],
    );

    res.status(201).json({ response: "Added the information you requested" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getSeenCard = async (req, res) => {
  try {
    const result = await pool.query("select * from public.seen_cards");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Card retrieval query fail" });
  }
};

const postSeenCard = async (req, res) => {
  try {
    console.log("POST body:", req.body);
    const { id, seen_card_name, seen_card_image_url } = req.body;

    const result = await pool.query(
      "insert into public.seen_cards (seen_card_name, seen_card_image_url, id) values ($1, $2, $3)",
      [seen_card_name, seen_card_image_url, id],
    );

    res.status(201).json({ response: "Added the information you requested" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCards, postCard, getCommanders, postCommander,getSeenCard, postSeenCard };
