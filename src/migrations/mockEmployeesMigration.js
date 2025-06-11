import UserSchemaModel from "../users/UserSchema.js";

const mockEmployees = [
    {
        email: "alice@example.com",
        password: "hashedPassword1",
        isManager: false
    },
    {
        email: "bob@example.com",
        password: "hashedPassword2",
        isManager: false
    },
    {
        email: "carol@example.com",
        password: "hashedPassword3",
        isManager: false
    },
    {
        email: "dave@example.com",
        password: "hashedPassword4",
        isManager: false
    },
    {
        email: "eve@example.com",
        password: "hashedPassword5",
        isManager: false
    },
    {
        email: "frank@example.com",
        password: "hashedPassword6",
        isManager: false
    },
    {
        email: "grace@example.com",
        password: "hashedPassword7",
        isManager: false
    },
    {
        email: "heidi@example.com",
        password: "hashedPassword8",
        isManager: false
    }
];



export default async function migrate(req, res) {
    try {
        // Save users one by one to trigger pre-save hook (for password hashing)
        for (const user of mockEmployees) {
            const newUser = new UserSchemaModel(user);
            console.log(newUser);
            await newUser.save();
        }
        res.status(200).json({ message: 'Mock employees inserted successfully.' });
        return {success: true}
    } catch (error) {
        res.status(500).json({ message: 'Migration failed', error: error.message });
        return {success: false}
    }
}
