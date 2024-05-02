const { Pool } = require('pg');

const pool = new Pool({
    host: 'dpg-coptdlv79t8c7385uvlg-a',
    user: 'luispost',
    password: 'E51vLBh9CpTL94YNdQC6mA8aRsC82yMc',
    database: 'firstapi_8by2',
    port: 5432
});

const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM users;');
        console.log(response.rows);
        // res.send('Users');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserById = async (req, res)  => {
    // res.send('User ID ' + req.params.id);
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => { 
    const { name, email } = req.body;

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)' , [name,email]);
    console.log(response);
    // res.send('User created');
    res.json({
        message: 'User Added Succefully',
        body: {
            user: {name,email}
        }
    })
}

const deleteUser = async (req, res) => { 
    // res.send('User Delete ' + req.params.id);
    const id = req.params.id;
    const response = await pool.query("DELETE FROM users WHERE id = $1;", [id]);
    console.log(response);
    res.json(`User ${id} delete successfully`);
}

const UpdateUser = async (req, res) => { 
    const id = req.params.id;
    const { name, email } = req.body;
    // console.log(id, name, email);
    const response = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3;", [name,email,id]);
    console.log(response);
    res.send('User update successfully');
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    UpdateUser
};
