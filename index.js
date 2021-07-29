const actionCreator = props => {
	return async (dispatch = false) => {
		try {
			const {
				axios = false,
				handleApiSuccess = false,
				handleApiErrors = e => e,
				//
				method = false,
				url = false,
				config = {},
				body = {},
				//
				actionType = false,
				payload = false,
				more = false,
				//
				beforeFnSync = false,
				beforeFnAsync = false,
				afterFnSync = false,
				afterFnAsync = false
			} = props;

			const res1 = beforeFnSync && beforeFnSync({ ...props });

			const res2 = beforeFnAsync && (await beforeFnAsync({ ...props, res1 }));

			const resAPI = url && axios && (await axios[method](url, body, config));

			const {
				data: { message = "", data = {} }
			} = resAPI ? resAPI : { data: {} };

			const res3 = afterFnSync && afterFnSync({ ...props, res1, res2, resAPI });

			const res4 =
				afterFnAsync &&
				(await afterFnAsync({ ...props, res1, res2, res3, resAPI }));

			const allReturns = { res1, res2, res3, res4, resAPI };

			actionType &&
				dispatch &&
				dispatch({
					type: actionType,
					payload: { ...data, ...allReturns }
				});
			return handleApiSuccess
				? handleApiSuccess({ error: false, message, data, allReturns })
				: { error: false, message, data, allReturns };
		} catch (e) {
			return handleApiErrors(e);
		}
	};
};

const mutationCreator = props => {
	try {
		const {
			handleApiErrors = e => e,
			actionType = false,
			dispatch = false,
			payload = {},
			message = "",
			more = false,
			fn = false
		} = props;
		const res1 = fn && fn({ ...props });
		const action = {
			type: actionType,
			payload
		};
		dispatch(action);
		return { message, res1 };
	} catch (e) {
		return handleApiErrors(e);
	}
};

module.exports = { actionCreator, mutationCreator };
