const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.finAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preencha o campo nome' });
    }

    const contasctsExists = await ContactsRepository.findByEmail(email);

    if (contasctsExists) {
      return response.status(400).json({ error: 'Esse email existe' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contasctsExists = await ContactsRepository.findById(id);

    if (!contasctsExists) {
      return response.status(404).json({ error: 'Usuario n existe' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Preencha o campo nome' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'Esse email existe e está em uso' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Apagar um registro

    const { id } = request.params;
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
