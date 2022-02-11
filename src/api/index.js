import request from "../utils/request";

export function getListByColumnIds(params) {
	return request({
		url: "/open/infor/getList/ByColumnIds",
		method: "GET",
		params,
	});
}

export function getFirstColumn(projectId) {
	return request({
		url: `/columnManagement/getFirstColumn/${projectId}`,
		method: "GET",
	});
}

export function getByColumnIdsList(data) {
	return request({
		url: "/open/infor/getByColumnIds",
		method: "POST",
		data,
	});
}

export function getInfo(id) {
	return request({
		url: `/open/infor/info/${id}`,
		method: "GET",
	});
}

// 保存日志
export function logSave(data) {
	return request({
		url: "/infor/log/save",
		method: "POST",
		data,
	});
}
