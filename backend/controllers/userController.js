const Agenda = require('../models/userModel.js');
const initializeUserAgenda = require('../utils/initializeUserAgenda.js');

async function loginUser(req, res) {
  const { email } = req.body;

  try {
    let usuario = await Agenda.findOne({ emailUsuario: email });

    if (!usuario) {
      usuario = await initializeUserAgenda(email);
    }

    res.status(200).json({ message: 'Login bem-sucedido', data: usuario });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getUserAgenda(req, res) {
  const { email } = req.params;

  try {
    const usuario = await Agenda.findOne({ emailUsuario: email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a agenda', error });
  }
}

async function addReminder(req, res) {
  const { emailUsuario, mes, diaDoMes, descricao, horaInicial } = req.body;

  try {
    // Converte `horaInicial` em um objeto Date
    const horaInicialDate = new Date();
    horaInicialDate.setHours(horaInicial); // Define a hora
    horaInicialDate.setMinutes(0);         // Define os minutos como 0
    horaInicialDate.setSeconds(0);         // Define os segundos como 0

    // Atualiza o documento do usuário com o novo lembrete
    await Agenda.updateOne(
      { emailUsuario, "meses.mes": mes, "meses.dias.diaDoMes": diaDoMes },
      {
        $push: {
          "meses.$[mes].dias.$[dia].lembretes": {
            descricao,
            horaInicial: horaInicialDate // Passa o valor convertido
          }
        }
      },
      {
        arrayFilters: [{ "mes.mes": mes }, { "dia.diaDoMes": diaDoMes }]
      }
    );

    res.status(200).json({ message: 'Lembrete adicionado com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar lembrete:', error);
    res.status(500).json({ message: 'Erro ao adicionar lembrete.' });
  }
}

module.exports = { loginUser, getUserAgenda, addReminder };
