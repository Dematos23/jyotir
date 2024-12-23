const fs = require("fs");
const path = require('path');

async function clients(prisma) {
    const filePath = path.join(__dirname,'data','clients.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await Promise.all(
        data.map(async (client) => {
            await prisma.clients.create({
                data: {
                    name: client.name,
                    lastname: client.lastname,
                    dni: client.dni,
                    email: client.email,
                    phone: client.phone,
                    emergencyContact: client.emergencyContact,
                    district: client.district
                },
            })            
        }));
        
}

module.exports = clients;