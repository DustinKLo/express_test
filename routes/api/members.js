const express = require('express');
const router = express.Router();
const uuid = require('uuid');

let members = require('../../Members');

// gets all members
router.get('/', (req, res) => {
	res.json(members);
});

// get single member
router.get('/:id', (req, res) => {
	const member = members.filter(x => x.id === parseInt(req.params.id));
	if(member.length === 0) {
		res.json({});
	} else {
		res.status(400).json(member[0]);
	}
});

// create member
router.post('/', (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active'
	};
	
	if(!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'no name foo!' });
	}
	members.push(newMember);
	res.send(newMember);
});

// update member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		const updMember = req.body;
		members.forEach(member => {
			if(member.id === parseInt(req.params.id)) {
				member.name = updMember.name ? updMember.name : member.name;
				member.email = updMember.email ? updMember.email : member.email;

				return res.json({ msg: 'Member updated', member });
			}
		});
	} else {
		res.status(400).json({ msg: `No member found with the id of ${req.params.id}` });
	}
});

// delete member
// get single member
router.delete('/:id', (req, res) => {
	members = members.filter(x => x.id !== parseInt(req.params.id));
	res.json(members);
});

module.exports = router;
