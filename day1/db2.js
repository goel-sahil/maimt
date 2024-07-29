const sequelize = require('./models/index');
const User = require('./models/user');

async function main() {
    try {
        await sequelize.sync({ alter: true })
        const user = await User.create({
            name: "Testing",
            email: "Blah",
            password: "1234",
            gender: "Femail"
        });
        console.log(user);

    } catch (error) {
        console.log(error);
    }
}

main();