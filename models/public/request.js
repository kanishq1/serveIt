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
			provider_id: { type: DataTypes.BIGINT },
			// service_id: { type: DataTypes.BIGINT },
			time: { type: DataTypes.DATE },
			type: { type: DataTypes.TEXT },
			instructions: { type: DataTypes.TEXT },
			//  type : on demand or Scheduled
			unit: { type: DataTypes.TEXT },
			answers: { type: DataTypes.JSONB },
			status: { type: DataTypes.INTEGER },
			// 0 - requestd, 1 - accepeted, 2 - not accepted by any one, 3 - in progress, 4 - completed, 5- left in between, -1 : cancelled by reciever
			price: { type: DataTypes.TEXT },
			reciver_community: { type: DataTypes.BIGINT },
			provider_community: { type: DataTypes.BIGINT },
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
