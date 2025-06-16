import ShiftsSchemaModel from "../shifts/ShiftsSchema.js";


const mockShifts = [
    {
        shiftId: "6812cc401688c01721b89d5d",
        name: "Yoav",
        shifts: {
            sunday: ["middle", "evening", "night", "morning"],
            monday: ["night", "morning", "evening"],
            tuesday: ["middle", "evening"],
            wednesday: ["night", "morning"],
            thursday: ["middle", "evening", "morning"],
            friday: ["middle", "night"],
            saturday: ["night", "middle"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420c4",
        name: "Alice",
        shifts: {
            sunday: ["middle"],
            monday: ["night"],
            tuesday: ["middle", "evening"],
            wednesday: ["morning", "night"],
            thursday: ["morning"],
            friday: [],
            saturday: ["evening", "morning", "middle"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420c6",
        name: "Bob",
        shifts: {
            sunday: ["night"],
            monday: ["morning", "night", "evening"],
            tuesday: ["evening"],
            wednesday: ["middle", "night", "morning"],
            thursday: ["morning"],
            friday: [],
            saturday: ["night", "middle", "morning"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420c8",
        name: "Carol",
        shifts: {
            sunday: [],
            monday: ["middle", "morning", "evening", "night"],
            tuesday: ["middle", "morning", "evening"],
            wednesday: ["middle", "evening"],
            thursday: ["middle"],
            friday: ["middle", "morning"],
            saturday: ["middle"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420ca",
        name: "Dave",
        shifts: {
            sunday: ["middle", "evening", "morning", "night"],
            monday: ["night", "morning", "evening"],
            tuesday: ["morning"],
            wednesday: ["night", "evening"],
            thursday: ["middle"],
            friday: ["morning", "night", "evening"],
            saturday: ["middle", "morning"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420cc",
        name: "Eve",
        shifts: {
            sunday: ["night", "middle", "morning", "evening"],
            monday: ["night"],
            tuesday: ["middle", "evening"],
            wednesday: ["evening", "middle", "night"],
            thursday: ["night", "middle"],
            friday: ["night", "morning"],
            saturday: ["evening"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420ce",
        name: "Frank",
        shifts: {
            sunday: ["evening", "middle", "night"],
            monday: ["middle", "night", "evening"],
            tuesday: ["middle", "night"],
            wednesday: ["evening", "night"],
            thursday: ["night", "middle", "morning"],
            friday: ["morning", "middle"],
            saturday: ["middle"]
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420d0",
        name: "Grace",
        shifts: {
            sunday: ["middle", "morning", "night", "evening"],
            monday: ["evening"],
            tuesday: ["morning", "middle"],
            wednesday: ["middle", "evening"],
            thursday: ["night"],
            friday: ["evening", "middle"],
            saturday: []
        }
    },
    {
        shiftId: "684dcc90e26e0fedbc8420d2",
        name: "Heidi",
        shifts: {
            sunday: [],
            monday: [],
            tuesday: ["evening", "middle"],
            wednesday: ["evening", "night", "morning"],
            thursday: ["middle", "night", "evening"],
            friday: ["middle", "morning", "night"],
            saturday: ["middle"]
        }
    }
];


export default async function migrate(req, res) {
    try {
        console.log("Starting Mock Shifts Migration...");

        for (const shift of mockShifts) {
            const newShift = new ShiftsSchemaModel(shift);
            console.log("Inserting shift:", newShift);
            await newShift.save();
        }
        console.log("Mock Shifts Migration completed successfully.");
        res.status(200).json({ message: 'Mock shifts inserted successfully.' });
    } catch (error) {
        console.error("Error during Mock Shifts Migration:", error);
        res.status(500).json({ message: 'Migration failed', error: error.message });
    }
};


