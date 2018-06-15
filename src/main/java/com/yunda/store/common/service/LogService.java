package com.yunda.store.common.service;

import org.springframework.stereotype.Service;

import com.yunda.store.common.domain.LogDO;
import com.yunda.store.common.domain.PageDO;
import com.yunda.store.common.utils.Query;
@Service
public interface LogService {
	void save(LogDO logDO);
	PageDO<LogDO> queryList(Query query);
	int remove(Long id);
	int batchRemove(Long[] ids);
}
