import bcrypt from 'bcrypt';
let users = [
    {
        id: '1',
        username: 'bob123',
        password:
            '$2b$12$ZZYTY25nVvU02kmcB75cd.tCOqmeGeJB5Y24B49Kemx6Kw2qmf6We',
        name: 'Bob',
        email: 'kang4609@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: '2',
        username: 'sandy',
        password:
            '$2b$12$ZZYTY25nVvU02kmcB75cd.tCOqmeGeJB5Y24B49Kemx6Kw2qmf6We',
        name: 'Sandy',
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
