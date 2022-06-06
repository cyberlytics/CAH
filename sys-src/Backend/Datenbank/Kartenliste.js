import mongoose from "mongoose";

const { Schema, model} = mongoose;

const Karteliste = new Schema({
    KartenText: String,
});


const Karte = model('Karte', Karteliste);

export default Karte;