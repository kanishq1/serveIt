module.exports = (sequelize, DataTypes) => {
	const user_community = sequelize.define(
		"user_community",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			status: { type: DataTypes.INTEGER },
			//status : 0 - applied, 1 - accepted, 2-rejected
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
	return user_community;
};
