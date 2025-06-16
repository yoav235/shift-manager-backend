import ShiftsSchemaModel from "../shifts/ShiftsSchema.js";


const mockShifts = [
    {
        shiftId: "68167334caa9bed5412ca0fd",
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
        shiftId: "6849e427f98b65e34d4b508b",
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
        shiftId: "6849e427f98b65e34d4b508d",
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
        shiftId: "6849e428f98b65e34d4b508f",
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
        shiftId: "6849e428f98b65e34d4b5091",
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
        shiftId: "6849e428f98b65e34d4b5093",
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
        shiftId: "6849e429f98b65e34d4b5095",
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
        shiftId: "6849e429f98b65e34d4b5097",
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
        shiftId: "6849e42af98b65e34d4b5099",
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


