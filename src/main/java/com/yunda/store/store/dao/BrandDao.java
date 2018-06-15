package com.yunda.store.store.dao;

import com.yunda.store.store.domain.BrandDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 驿站品牌信息
 * @author jincheng.ding
 * @email ${email}
 * @date 2018-04-28 11:17:15
 */
@Mapper
public interface BrandDao {

	BrandDO get(Integer id);
	
	List<BrandDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(BrandDO brand);
	
	int update(BrandDO brand);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);

    List<BrandDO> listByReviewStatus(int reviewStatus);

	String getByEnterpriseCode(String enterpriseCode);
}
