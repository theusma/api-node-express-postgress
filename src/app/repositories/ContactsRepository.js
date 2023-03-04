const db = require('../../database');

class ContactsRepository {
  async finAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT contatos.*, categorias.name AS category_name FROM contatos LEFT JOIN categorias ON categorias.id = contatos.category_id ORDER BY contatos.name ${direction}`,
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT contatos.*, categorias.name AS category_name
    FROM contatos
    LEFT JOIN categorias ON categorias.id = contatos.category_id
    WHERE contatos.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contatos WHERE email = $1', [email]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contatos WHERE id = $1', [id]);
    return deleteOp;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query('INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3,  $4) RETURNING *', [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `
    UPDATE contatos
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5 RETURNING *`,

      [name, email, phone, category_id, id],
    );

    return row;
  }
}
module.exports = new ContactsRepository();
