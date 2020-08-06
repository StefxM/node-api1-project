let users = [
	{ id: "1", name: "Izuku Midoriya", bio: "Also known as Deku and All Mights sucessor." },
	{ id: "2", name: "Shoto Todoroki", bio: "Todoroki, son of The new number one hero Endeavor" },
	{ id: "3", name: "All Might", bio: "Toshinori," },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}