const db = require('../Database/mySql');

const test = (req, res) => {
    res.json("Test Working");
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: "Enter the Email and password",
            });
        }

        let sql = "SELECT * FROM agent_details WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }

            if (result.length === 0) {
                return res.json({
                    error: "User does not exist",
                });
            }

            const user = result[0];

            if (user.password === password) {
                // Successful login
                res.send(user);
                console.log("Login Successful:", user);
            } else {
                // Incorrect password
                res.json({
                    error: "Username or password is incorrect",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

const getOrders = (req, res) => {
    try {
        const { agent_id, status, dod } = req.body;
        // console.log(status);
        // console.log(dod);
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            return `${day}-${month}-${year}`;
        };
        console.log(currentDate);
        const date = new Date();
        const currentDate = formatDate(date);
        // console.log(currentDate);
        if (status === "all") {
            let sql = 'SELECT * FROM delivery_orders WHERE agent_id = ? AND dod = ?';
            db.query(sql, [agent_id,currentDate] , (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Internal Server Error',
                    });
                }
                res.json(result);
                // console.log(result);
            });  
        } else {
            let sql
            if (dod === 'previous') {
                sql = 'SELECT * FROM delivery_orders WHERE agent_id = ? AND status = ? AND dod != ?';   
            } else {
                sql = 'SELECT * FROM delivery_orders WHERE agent_id = ? AND status = ? AND dod = ?';  
            }
            db.query(sql, [agent_id,status,currentDate] , (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Internal Server Error',
                    });
                }
                res.json(result);
                // console.log(result[0].dod);
                // console.log(result);
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    test,
    loginUser,
    getOrders
}