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
