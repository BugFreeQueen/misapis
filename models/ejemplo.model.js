//import { strip } from 'colors';
import colors from 'colors';
import mongoose from 'mongoose';

const ejemploSchema = new mongoose.Schema({
   nombre:{
       type: String,
       required : true
    
   },
   apellido:{
    type: String,
    required: true
   },
  edad:{
    type: Number,
    require: false
  },
  contacto:{
    type: [String],
    required: false
  },
});

const Ejemplo = mongoose.model('Ejemlo', ejemploSchema);

export default Ejemplo;
