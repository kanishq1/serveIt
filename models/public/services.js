module.exports = (sequelize, DataTypes) => {
	const services = sequelize.define(
		"services",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			description: { type: DataTypes.TEXT },
			questions: { type: DataTypes.JSONB },
			price: { type: DataTypes.INTEGER },
			certificateRequired: { type: DataTypes.BOOLEAN },
			priceType: { type: DataTypes.TEXT },
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: DataTypes.DATE,
			deleted_at: DataTypes.DATE,
		},
		{
			timestamps: false,
			underscored: true,
		}
	);
	return services;
};
