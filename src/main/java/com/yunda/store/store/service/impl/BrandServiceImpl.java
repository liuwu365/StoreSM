package com.yunda.store.store.service.impl;

import com.yunda.store.store.dao.BrandDao;
import com.yunda.store.store.domain.BrandDO;
import com.yunda.store.store.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class BrandServiceImpl implements BrandService {
	@Autowired
	private BrandDao brandDao;
	
	@Override
	public BrandDO get(Integer id){
		return brandDao.get(id);
	}
	
	@Override
	public List<BrandDO> list(Map<String, Object> map){
		return brandDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return brandDao.count(map);
	}
	
	@Override
	public int save(BrandDO brand){
		return brandDao.save(brand);
	}
	
	@Override
	public int update(BrandDO brand){
		return brandDao.update(brand);
	}
	
	@Override
	public int remove(Integer id){
		return brandDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return brandDao.batchRemove(ids);
	}

	@Override
	public List<BrandDO> listByReviewStatus(int reviewStatus) {
		return brandDao.listByReviewStatus(reviewStatus);
	}

	@Override
	public boolean exit(Map<String, Object> params) {
		boolean exit;
		exit = brandDao.list(params).size() > 0;
		return exit;
	}

}
