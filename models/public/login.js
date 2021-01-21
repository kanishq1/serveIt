module.exports = (sequelize, DataTypes) => {
	const login = sequelize.define(
		"login",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			firebase_id: { type: DataTypes.TEXT },
			name: { type: DataTypes.TEXT },

			email: { type: DataTypes.TEXT },
			mobile: { type: DataTypes.TEXT },

			new_user: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},

			sex: { type: DataTypes.INTEGER },
			role: { type: DataTypes.INTEGER, defaultValue: 0 },
			// apartment owner : 1
			// tenant : 0
			address: { type: DataTypes.JSONB },
			// links: { type: DataTypes.JSONB },
			profile_pic: { type: DataTypes.TEXT },
			// Verifications
			verification_docs: { type: DataTypes.JSONB },
			community_id: { type: DataTypes.BIGINT },
			community_verified: {
				type: DataTypes.INTEGER,
				defaultValue: -1,
			},
			mobile_verified: { type: DataTypes.DATE },
			app_verified: { type: DataTypes.DATE },
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: DataTypes.DATE,
			deleted_at: DataTypes.DATE,
		},
		{
			underscored: true,
		}
	);

	return login;
};
