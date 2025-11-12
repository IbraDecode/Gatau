import express from 'express';
const router = express.Router();
router.post('/webhook', express.json(), (req, res) => res.sendStatus(200));
export default router;
