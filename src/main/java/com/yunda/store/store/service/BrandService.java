package com.yunda.store.store.service;


import com.yunda.store.store.domain.BrandDO;

import java.util.List;
import java.util.Map;

/**
 * 驿站品牌信息
 * 
 * @author jincheng.ding
 * @email ${email}
 * @date 2018-04-28 11:17:15
 */
public interface BrandService {
	
	BrandDO get(Integer id);
	
	List<BrandDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(BrandDO brand);
	
	int update(BrandDO brand);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);

    List<BrandDO> listByReviewStatus(int reviewStatus);

	boolean exit(Map<String,Object> params);
}
