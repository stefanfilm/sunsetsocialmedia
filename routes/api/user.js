const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;