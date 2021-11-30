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
            firstname VARCHAR,
            lastname VARCHAR,
            phonenumber VARCHAR(15),
            dishselected varchar
        );

        insert into guests (firstname, lastname, phonenumber, dishselected)
        values ('MJ', 'DeRouen', '(888) 443-9090', 'Mac and Cheese'),
            ('Eloise', 'Crabtree', '(777) 889-2323', 'Spaghetti'),
            ('Ryker', 'Dupuy', '(111) 222-3333', 'Ham and Cheese sandwiches')
            ;
        `).then(() => {//make sure in the future that in order for sequelizer to work, PG web and console browser properties must all match, better wise to stick to using all lowercase!
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
        console.log(req.body)
        let {
            firstname,
            lastname,
            phonenumber,
            dishselected
            
        } = req.body;
        

        sequelize
            .query(
                `insert into guests (firstname, lastname, phonenumber, dishselected)
                values ('${firstname}', '${lastname}', '${phonenumber}', '${dishselected}');
                `)
            .then((dbRes) => res.sendStatus(200))
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


