const Agenda = require('../models/userModel.js');

async function initializeUserAgenda(emailUsuario) {
  try {
    let agenda = await Agenda.findOne({ emailUsuario });

    if (!agenda) {
      const anoAtual = new Date().getFullYear();
      const diasNoMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      const meses = diasNoMes.map((dias, index) => ({
        mes: index + 1,
        dias: Array.from({ length: dias }, (_, i) => ({
          diaDoMes: i + 1,
          lembretes: [],
        })),
      }));

      agenda = new Agenda({
        emailUsuario,
        ano: anoAtual,
        meses,
      });

      await agenda.save();
      console.log(`Agenda completa criada para o usuário ${emailUsuario}`);
    }
    return agenda;
  } catch (error) {
    console.error('Erro ao inicializar a agenda:', error);
  }
}

module.exports = initializeUserAgenda;
