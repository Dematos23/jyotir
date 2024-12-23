const passHash = require("../../src/utils/passHash.js");
const fs = require("fs");
const path = require('path');
async function users(prisma) {
    const filePath = path.join(__dirname,'data','users.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await Promise.all(
        data.map(async (user) => {
            await prisma.users.create({
                data: {
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    password: await passHash(user.password),
                    role: user.role,
                    state: user.state
                },
            })            
        }));
        
}

module.exports = users;