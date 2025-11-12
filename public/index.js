import express from 'express';
export default function run(){ const app=express(); app.get('/',(req,res)=>res.send('E-Brains public index')); return app; }
