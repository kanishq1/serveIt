module.exports = (sequelize, DataTypes) => {
	const provider = sequelize.define(
		"provider",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			status: { type: DataTypes.INTEGER },
			docs: { type: DataTypes.JSONB },
			// status : 0 - applied, 1-verified, 2-rejected
			// login_id: { type: DataTypes.BIGINT },
			// service_id: { type: DataTypes.BIGINT },
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
	return provider;
};
