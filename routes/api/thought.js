const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const thoughts = await Thought.create(req.body);
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id/reactions', async (req,res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, { $push: { reactions: req.body } }, { new: true });
        console.log(thought);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'Thoughts deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;