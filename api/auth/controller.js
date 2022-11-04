const db = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const USERNAME_EXISTS_QUERY = "SELECT FROM users WHERE username = $1";

    db.query(USERNAME_EXISTS_QUERY, [username], (error, data) => {
        if (error) res.status(500).json(error);

        if (data.length > 0) {
            return res.status(409).json({
                message: "A user with that username already exists",
            });
        }
    });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    const CREATE_NEW_USER_QUERY =
        "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";

    db.query(
        CREATE_NEW_USER_QUERY,
        [username, hashedPassword],
        (error, data) => {
            if (error) return res.status(500).json(error);

            return res.status(201).json(data);
        }
    );
};

const signIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log("Username: ", username);
    console.log("Password: ", password);

    const GET_USER_BY_USERNAME_QUERY =
        "SELECT * FROM users WHERE username = $1";
    db.query(GET_USER_BY_USERNAME_QUERY, [username], async (error, data) => {
        if (error) return res.status(500).json(data);

        if (data.rows.length === 0) {
            console.log("Username doesnt exist");
            return res.status(404).json({
                message: "A user with that username doesn't exist",
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            data.rows[0].password
        );

        if (!validPassword)
            return res.status(400).json({ error: "Invalid Password" });

        const token = jwt.sign({ id: data.rows[0].id }, "secretkey", {
            expiresIn: "1800s",
        });

        const { id, username } = data.rows[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
            .status(200)
            .json({
                id: id,
                username: username,
            });
    });
};

const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
    })
        .status(200)
        .json({
            message: "User has been logged out",
        });
};

module.exports = {
    signUp,
    signIn,
    logout,
};
