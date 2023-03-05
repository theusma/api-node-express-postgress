const CategoriesRepository = require('../repositories/CategoriesRepository');
require('express-async-errors');

class CategoryController {
  async index(request, response) {
    const categorias = await CategoriesRepository.findAll();
    response.json(categorias);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preencha o campo nome' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;
    const categoria = await CategoriesRepository.findById(id);
    if (!categoria) {
      return response.status(404).json({ error: 'Categoria não existe' });
    }
    response.json(categoria);
  }

  async delete(request, response) {
    // Apagar um registro

    const { id } = request.params;
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name,
    } = request.body;

    const categoriesExists = await CategoriesRepository.findById(id);

    if (!categoriesExists) {
      return response.status(404).json({ error: 'Categoria n existe' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Preencha o campo nome' });
    }
    const categoria = await CategoriesRepository.update(id, {
      name,
    });

    response.json(categoria);
  }
}

module.exports = new CategoryController();
