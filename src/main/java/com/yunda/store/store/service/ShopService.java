package com.yunda.store.store.service;

import com.yunda.store.store.domain.ShopDO;
import com.yunda.store.store.domain.vo.ShopVO;

import java.util.List;
import java.util.Map;

/**
 * 物业门店管理信息
 * 
 * @author jincheng.ding
 * @email ${email}
 * @date 2018-04-28 11:17:15
 */
public interface ShopService {
	
	ShopDO get(Integer id);
	
	List<ShopVO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(ShopDO shop);
	
	int update(ShopDO shop);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);

    List<Map<String,Object>> searchProvince();

	List<Map<String,Object>> searchCity(Integer provinceId);

	List<Map<String,Object>> searchCounty(Integer cityId);

	List<Map<String, Object>> searchBrand(Map<String, Object> map);

	Map<String, Object> getShopInfo(ShopDO shop);

    List<Map<String, Object>> searchBranch(Map<String, Object> map);

	/**
	 * 获取敏感词组
	 *
	 * @return
	 */
	public List<Map<String, Object>> getSensitiveWords();

    boolean exit(Map<String,Object> params);
}
