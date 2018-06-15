package com.yunda.store.store.controller;

import com.yunda.store.common.controller.BaseController;
import com.yunda.store.common.utils.*;
import com.yunda.store.store.domain.BrandDO;
import com.yunda.store.store.service.BrandService;
import com.yunda.store.system.domain.UserDO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.yunda.store.common.utils.DateUtils.DATE_TIME_PATTERN;


/**
 * 驿站品牌信息
 * 
 * @author jincheng.ding
 * @email ${email}
 * @date 2018-04-28 11:17:15
 */
 
@Controller
@RequestMapping("/store/brand")
public class BrandController extends BaseController {
	@Autowired
	private BrandService brandService;
	
	@GetMapping()
	@RequiresPermissions("store:brand:brand")
	String Brand(){
	    return "store/brand/brand";
	}

	/**
	 * 查询
	 * @param params
	 * @return
	 */
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("store:brand:brand")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<BrandDO> brandList = brandService.list(query);
		int total = brandService.count(query);
		PageUtils pageUtils = new PageUtils(brandList, total);
		return pageUtils;
	}

	/**
	 * 驿站品牌注册
	 * @return
	 */
	@GetMapping("/add")
	@RequiresPermissions("store:brand:add")
	String add(){

	    return "store/brand/add";
	}

	@GetMapping("/edit/{id}")
	@RequiresPermissions("store:brand:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		BrandDO brand = brandService.get(id);
		model.addAttribute("brand", brand);
	    return "store/brand/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("store:brand:add")
	public R save(BrandDO brand){
		UserDO loginUser = getUser();
		String userId = String.valueOf(loginUser.getUserId());
		if (StringUtils.isBlank(userId)) {
			R.error("获取用户编码失败！");
		}
		brand.setCreateBy(userId);
		brand.setEnterpriseCode(String.valueOf(MajorKey.getKeyID()));
		brand.setCreateTime(DateUtils.format(new Date(),DATE_TIME_PATTERN));
		if(brandService.save(brand)>0){
//			Map<String, Object> brandMap = new HashMap<String, Object>();
//			brandMap.put("enterpriseName",brand.getEnterpriseName());
//			brandMap.put("enterpriseAddress",brand.getEnterpriseAddress());
//			brandMap.put("enterpriseCode",brand.getEnterpriseCode());
//			brandMap.put("contactName",brand.getContactName());
//			brandMap.put("mobile",brand.getMobile());
//			brandMap.put("email",brand.getEmail());
//			JedisUtil.putSingleObject(Constant.STORE_APP_SHOP_BRAND_INFO+brand.getEnterpriseCode(),brand.getEnterpriseName());
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("store:brand:edit")
	public R update( BrandDO brand){
		UserDO loginUser = getUser();
		String userId = String.valueOf(loginUser.getUserId());
		brand.setUpdateBy(userId);
		if (StringUtils.isBlank(userId)) {
			R.error("获取用户编码失败！");
		}
		brand.setUpdateTime(DateUtils.format(new Date(),DATE_TIME_PATTERN));
//		Map<String, Object> brandMap = new HashMap<String, Object>();
//		brandMap.put("enterpriseName",brand.getEnterpriseName());
//		brandMap.put("enterpriseAddress",brand.getEnterpriseAddress());
//		brandMap.put("enterpriseCode",brand.getEnterpriseCode());
//		brandMap.put("contactName",brand.getContactName());
//		brandMap.put("mobile",brand.getMobile());
//		brandMap.put("email",brand.getEmail());
//		JedisUtil.removeSingleObject(Constant.STORE_APP_SHOP_BRAND_INFO+brand.getEnterpriseCode());
//		JedisUtil.putSingleObject(Constant.STORE_APP_SHOP_BRAND_INFO+brand.getEnterpriseCode(),brand.getEnterpriseName());
		brandService.update(brand);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("store:brand:remove")
	public R remove( Integer id){
//		BrandDO brand = brandService.get(id);
		if(brandService.remove(id)>0){
//			JedisUtil.removeSingleObject(Constant.STORE_APP_SHOP_BRAND_INFO+brand.getEnterpriseCode());
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("store:brand:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		brandService.batchRemove(ids);
		return R.ok();
	}
	/**
	 * 判断请求参数是否已存在，存在则不通过
	 * @param params
	 * @return
	 */
	@PostMapping("/exit")
	@ResponseBody
	public boolean exit(@RequestParam Map<String, Object> params) {
		// 存在，不通过，false
		return !brandService.exit(params);
	}
}
