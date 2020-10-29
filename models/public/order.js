module.exports = (sequelize, DataTypes) => {
	const order = sequelize.define(
		"order",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			product_name: { type: DataTypes.TEXT },
			order_qty: { type: DataTypes.TEXT },
			value: { type: DataTypes.TEXT },
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
	return order;
};
