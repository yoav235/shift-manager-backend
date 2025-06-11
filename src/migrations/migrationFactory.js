import mockEmployeesMigration from "./mockEmployeesMigration.js";



const MigrationFactory = async (migration) => {
    switch (migration){
        case 'mockEmployeesMigration':
            return mockEmployeesMigration;
    }
}


export default MigrationFactory;