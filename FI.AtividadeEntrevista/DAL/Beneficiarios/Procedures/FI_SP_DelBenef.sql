﻿CREATE PROC FI_SP_DelBenef
	@ID			BIGINT
AS
BEGIN
	DELETE BENEFICIARIOS
	WHERE ID = @ID

	SELECT @ID
END