package com.yunda.store.store.dao;

import java.util.List;
import java.util.Map;

import com.yunda.store.store.domain.ShopDO;
import com.yunda.store.store.domain.vo.ShopVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 物业门店管理信息
 * @author jincheng.ding
 * @email ${email}
 * @date 2018-04-28 11:17:15
 */
@Mapper
public interface ShopDao {

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

	String searchProvinceById(Integer provinceId);

	String searchCityById(@Param("provinceId")Integer provinceId, @Param("cityId")Integer cityId);

	String searchCountyById(@Param("provinceId")Integer provinceId, @Param("cityId")Integer cityId, @Param("countyId")Integer countyId);

    Map<String,Object> getShopInfo(ShopDO shop);

	Map<String,Object> getAreaInfo(@Param("countyId")Integer countyId, @Param("cityId")Integer cityId);

}
