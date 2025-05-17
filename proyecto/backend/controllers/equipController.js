const Equip = require('../models/Equip');

const equipController = {
    // GET /equips - obtindre tots els equips
    getAll: (req, res) => {
        Equip.getAll((err, equips) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir els equips.' });
            }
            res.json(equips);
        });
    },

    // GET /equips/:id - obtindre un equip per ID
    getById: (req, res) => {
        const id = req.params.id;

        Equip.getById(id, (err, equip) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtenir l\'equip.' });
            }
            if (!equip) {
                return res.status(404).json({ message: 'Equip no trobat.' });
            }
            res.json(equip);
        });
    },

    // POST /equips - crear un nou equip
    create: (req, res) => {
        const nouEquip = req.body;

        Equip.create(nouEquip, (err, resultat) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear l\'equip.' });
            }
            res.status(201).json({ message: 'Equip creat correctament', id: resultat.insertId });
        });
    }
};

module.exports = equipController;
