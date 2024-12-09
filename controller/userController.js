const User = require('../models/userModel');

class UserController {
    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const newUser = await User.create({ name, email, password });
            res.status(200).json({ message: 'New User created Successfully', User: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error creating User', error: error.message });
        }
    }

    static async fetchingUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching all Users', error: error.message });
        }
    }

    static async fetchingOneUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching one User', error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const [updatedCount] = await User.update({ name, email, password }, { where: { id } });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'User not found for updating' });
            }

            res.status(200).json({ message: 'User Updated Successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating User', error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await User.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'User not found for deleting' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting User', error: error.message });
        }
    }
}

module.exports = UserController;