module.exports = (sequelize, DataTypes) => {
	const community = sequelize.define(
		"community",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: { type: DataTypes.TEXT },
			description: { type: DataTypes.TEXT },
			address: { type: DataTypes.JSONB },
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			},
			status: { type: DataTypes.INTEGER, defaultValue: 0 },
			// 0 : requested, 1: verified, -1: rejected
			updated_at: DataTypes.DATE,
			deleted_at: DataTypes.DATE,
		},
		{
			underscored: true,
		}
	);
	return community;
};
