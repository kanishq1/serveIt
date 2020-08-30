module.exports = (sequelize, DataTypes) => {
	const service = sequelize.define(
		"service",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: { type: DataTypes.TEXT },
			description: { type: DataTypes.TEXT },
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

	return service;
};
