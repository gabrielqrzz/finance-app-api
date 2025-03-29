CREATE OR REPLACE FUNCTION get_user_balance(uid UUID)
RETURNS TABLE (
	earnings NUMERIC(10, 2),
	expenses NUMERIC(10, 2),
	investiments NUMERIC(10,2),
	balance NUMERIC(10, 2)
) AS $$
BEGIN
	RETURN QUERY
	SELECT
		SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings,
    	SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses,
    	SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END) AS investiments,
    	(SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) - 
		(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) + 
		SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END))) AS balance
    FROM transactions
    WHERE user_id = get_user_balance.uid;
END; $$
LANGUAGE plpgsql;