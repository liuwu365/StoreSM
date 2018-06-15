package com.yunda.store.store.service.impl;

import com.yunda.store.common.utils.StringUtil;
import com.yunda.store.common.utils.StringUtils;
import com.yunda.store.store.dao.BrandDao;
import com.yunda.store.store.dao.ShopDao;
import com.yunda.store.store.domain.ShopDO;
import com.yunda.store.store.domain.vo.ShopVO;
import com.yunda.store.store.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Service
public class ShopServiceImpl implements ShopService {
	@Autowired
	private ShopDao shopDao;
	@Autowired
	private BrandDao brandDao;
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public ShopDO get(Integer id){
		return shopDao.get(id);
	}
	
	@Override
	public List<ShopVO> list(Map<String, Object> map){
		List<ShopVO> list = null;
		try {
			list = shopDao.list(map);
			if (list != null && list.size()>0){
				for (ShopVO shop:list) {

					String enterpriseName =brandDao.getByEnterpriseCode(shop.getEnterpriseCode());

					shop.setEnterpriseName(enterpriseName);
					if (shop.getProvinceId() != null && shop.getCityId() != null && shop.getCountyId() != null) {
						String provinceName = shopDao.searchProvinceById(shop.getProvinceId());
						String cityName = shopDao.searchCityById(shop.getProvinceId(),shop.getCityId());
						String countyName = shopDao.searchCountyById(shop.getProvinceId(),shop.getCityId(),shop.getCountyId());
						shop.setProvinceName(provinceName);
						shop.setCityName(cityName);
						shop.setCountyName(countyName);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	public int count(Map<String, Object> map){
		return shopDao.count(map);
	}
	
	@Override
	public int save(ShopDO shop){
		return shopDao.save(shop);
	}
	
	@Override
	public int update(ShopDO shop){
		return shopDao.update(shop);
	}
	
	@Override
	public int remove(Integer id){
		return shopDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return shopDao.batchRemove(ids);
	}

	@Override
	public List<Map<String,Object>> searchProvince() {
		return shopDao.searchProvince();
	}

	@Override
	public List<Map<String, Object>> searchCity(Integer provinceId) {
		return shopDao.searchCity(provinceId);
	}

	@Override
	public List<Map<String, Object>> searchCounty(Integer cityId) {
		return shopDao.searchCounty(cityId);
	}

	@Override
	public List<Map<String, Object>> searchBrand(Map<String, Object> map) {
		return shopDao.searchBrand(map);
	}

	@Override
	public Map<String, Object> getShopInfo(ShopDO shop) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (shop.getCountyId() != null && !StringUtil.isNullStr(shop.getCountyId().toString())) {
				StringBuffer sb1 =
						new StringBuffer(
								"select  A.AREA_NM as county,B.AREA_NM as city,C.AREA_NM as province   from  ydserver.base_area_local  A left join   ydserver.base_area_local  B  on A.CITY_ID=B.CITY_ID and B.COUNTY_ID =0     left join   ydserver.base_area_local  C on A.PROVINCE_ID=C.PROVINCE_ID  and C.CITY_ID=0 and C.COUNTY_ID =0  where A.county_id = ");
				sb1.append(shop.getCountyId());
				sb1.append(" and A.city_id=").append(shop.getCityId());
				List<Map<String, Object>> list = jdbcTemplate.queryForList(sb1.toString());
				if (list != null && list.size() == 1) {
					if (StringUtil.isNotNullStr(shop.getStreetDetail())) {
						map.put("street", list.get(0).get("province").toString() + list.get(0).get("city")
								+ list.get(0).get("county") + shop.getStreet() + shop.getStreetDetail());
					} else {
						map.put("street", list.get(0).get("province").toString() + list.get(0).get("city")
								+ list.get(0).get("county") + shop.getStreet());
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return map;
	}

	@Override
	public List<Map<String, Object>> searchBranch(Map<String, Object> map) {
		StringBuffer sb  =new StringBuffer("select t.bm as id,CONCAT(t.mc,'(',t.bm,')') as text from ydserver.gs t where t.lb in (2,21,22)");
		if(!StringUtils.isEmpty(map.get("q").toString())){
			sb.append("and (t.mc like '%").append(map.get("q").toString()).append("%'");
			sb.append(" or t.bm like '%").append(map.get("q").toString()).append("%')");
		}
		return jdbcTemplate.queryForList(sb.toString());
	}

	@Override
	public List<Map<String, Object>> getSensitiveWords() {
		String sql = "select word_name from ydwr.ydwr_sensitive_words WHERE delete_flag =0";
		return jdbcTemplate.queryForList(sql);
	}

	@Override
	public boolean exit(Map<String, Object> params) {
		boolean exit;
		exit = shopDao.list(params).size() > 0;
		return exit;
	}
}
