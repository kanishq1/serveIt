const db = require("../public/db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Login = sequelize.define('login', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    // org_id: { type:DataTypes.BIGINT }, 
    name: { type: DataTypes.TEXT },
    email: { type: DataTypes.TEXT },
    mobile: { type: DataTypes.TEXT },
    hostel: { type: DataTypes.TEXT },
    room_no: { type: DataTypes.TEXT },
    bits_id: { type: DataTypes.TEXT },
    branch1: {
        type: DataTypes.TEXT,
        defaultValue: 'none'
    },
    branch2: {
        type: DataTypes.TEXT,
        defaultValue: 'none'
    },
    current_year: { type: DataTypes.BIGINT },
    /**
     * 1: male
     * 2: female
     * 3: other
     */
    sex: { type: DataTypes.INTEGER },
    /**
     * u - Undergrad
     * m - M.E
     * p - PhD
     * f - Faculty
     */
    /* role: {
        type: DataTypes.TEXT,
        defaultValue: 'u'
    }, */
    // address: { type: DataTypes.JSONB },
    // other_data: { type: DataTypes.JSONB },

    // Verifications
    /**
     * 0 - Not verified
     * 1 - Verified
     */
    mobile_verified: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    // app_verified: { type: DataTypes.DATE },

    // login_secret: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     defaultValue: DataTypes.UUIDV4
    // },
    new_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE    
}, {
    underscored: true
});

// Assumption, other than CSA, no other admin has more than two permissions.
module.exports.Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    
    /**
     * 0 - CSA
     * 1 - Coordi
     * 2 - Complaints
     */
    role: { type: DataTypes.INTEGER, defaultValue: 0 },
    
    /**
     * 0 - CSA
     * 1 - Devsoc
     * 2 - Some other club/dept
     */
    organization: { type: DataTypes.INTEGER }, // In case of club/dept coordinator, they get access to only their repective PR, Events, Notices, etc
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE    
}, {
    underscored: true
});