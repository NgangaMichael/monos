const Vendor = require('../models/vendorModel');

class VendorController {
    static async createVendor(req, res) {
        try {
            const { businessName, email, password } = req.body;
            const newVendor = await Vendor.create({ businessName, email, password });
            res.status(200).json({ message: 'New Vendor created Successfully', Vendor: newVendor });
        } catch (error) {
            res.status(500).json({ message: 'Error creating Vendor', error: error.message });
        }
    }

    static async fetchingVendors(req, res) {
        try {
            const vendors = await Vendor.findAll();
            res.json(vendors);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching all Vendors', error: error.message });
        }
    }

    static async fetchingOneVendor(req, res) {
        try {
            const { id } = req.params;
            const vendor = await Vendor.findByPk(id);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            res.json(vendor);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching one Vendor', error: error.message });
        }
    }

    static async updateVendor(req, res) {
        try {
            const { id } = req.params;
            const { businessName, email, password } = req.body;

            const [updatedCount] = await Vendor.update({ businessName, email, password }, { where: { id } });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Vendor not found for updating' });
            }

            res.status(200).json({ message: 'Vendor Updated Successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating Vendor', error: error.message });
        }
    }

    static async deleteVendor(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await Vendor.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Vendor not found for deleting' });
            }

            res.status(200).json({ message: 'Vendor deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Vendor', error: error.message });
        }
    }
}

module.exports = VendorController;