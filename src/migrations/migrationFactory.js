import mockEmployeesMigration from "./mockEmployeesMigration.js";
import MockShiftsMigration from "./MockShiftsMigration.js";
import SceduleMigartion from "./ScheduleMigration.js";



const MigrationFactory = async (migration) => {
    switch (migration){
        case 'mockEmployeesMigration':
            return mockEmployeesMigration;
        case 'MockShiftsMigration':
            return MockShiftsMigration;
        case 'ScheduleMigration':
            return SceduleMigartion;
        case 'test':
            return async (req, res) => {
                console.log("Test migration executed");
                return {success: true};
            };
    }

}


export default MigrationFactory;