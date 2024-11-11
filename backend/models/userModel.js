const mongoose = require('mongoose');

const lembreteSchema = new mongoose.Schema({
  horaInicial: { type: Date, required: true },
  descricao: { type: String, required: true },
});

const diaSchema = new mongoose.Schema({
  diaDoMes: { type: Number, required: true },
  lembretes: [lembreteSchema],
});

const mesSchema = new mongoose.Schema({
  mes: { type: Number, required: true },
  dias: [diaSchema],
});

const agendaSchema = new mongoose.Schema({
  emailUsuario: { type: String, unique: true, required: true },
  ano: { type: Number, required: true },
  meses: [mesSchema],
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
