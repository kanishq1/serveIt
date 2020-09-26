module.exports = (sequelize, DataTypes) => {
	const request = sequelize.define(
		"request",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			// reciever_id: { type: DataTypes.BIGINT },
			// provider_id: { type: DataTypes.BIGINT },
			// service_id: { type: DataTypes.BIGINT },
			answers: { type: DataTypes.JSONB },
			status: { type: DataTypes.TEXT },
			rate: { type: DataTypes.TEXT },
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			},
			completed_at: {
				type: DataTypes.DATE,
			},
			updated_at: DataTypes.DATE,
			deleted_at: DataTypes.DATE,
		},
		{
			underscored: true,
		}
	);
	return request;
};
