import bcrypt from 'bcrypt';
let users = [
    {
        id: '1',
        username: 'yunjae',
        password: '12345',
        name: '윤재',
        email: 'kang4609@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
];

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export async function findById(id) {
    return users.find((user) => user.id === id);
}
