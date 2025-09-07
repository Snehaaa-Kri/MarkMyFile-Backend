import UserModel from '../models/user.model.js'

const userController = {
    //update userRole - by admin //not needed for now
    //delete user
    deleteUser: async (req, res) => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ success: true, message: 'User deleted successfully', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default userController;