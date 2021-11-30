require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})



module.exports = {
    seed: (req, res) => {
        sequelize.query(`


        create table guests (
            guest_id SERIAL PRIMARY KEY, 
            first_name VARCHAR,
            last_name VARCHAR,
            phone_number VARCHAR(15),
            dish_selected varchar
        );

        insert into guests (first_name, last_name, phone_number, dish_selected)
        values ('MJ', 'DeRouen', '(888) 443-9090', 'Mac and Cheese'),
            ('Eloise', 'Crabtree', '(777) 889-2323', 'Spaghetti'),
            ('Ryker', 'Dupuy', '(111) 222-3333', 'Ham and Cheese sandwiches')
            ;
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    getGuests: (req, res) => {
        sequelize.query(`
        SELECT * FROM guests;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    createGuest: (req, res) => {
        let {
            firstName,
            lastName,
            phoneNumber,
            dishSelected,
            
        } = req.body;

        sequelize
            .query(
                `insert into guests  
        first_name = '${firstName}',
        last_name = '${lastName}',
        phone_number = '${phoneNumber}',
        dish_selected = ${dishSelected}
        `
            )
            .then(() => res.sendStatus(200))
            .catch((err) => console.log(err));
    },
    deleteGuest: (req, res) => {
        let {id} = req.params 
        sequelize.query(`
        DELETE
            FROM guests
            WHERE guest_id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}


