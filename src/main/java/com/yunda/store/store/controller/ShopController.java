package com.yunda.store.store.controller;

import com.alibaba.fastjson.JSON;
import com.yunda.store.common.controller.BaseController;
import com.yunda.store.common.utils.*;
import com.yunda.store.store.domain.BrandDO;
import com.yunda.store.store.domain.ShopDO;
import com.yunda.store.store.domain.vo.ShopVO;
import com.yunda.store.store.service.BrandService;
import com.yunda.store.store.service.ShopService;
import com.yunda.store.system.domain.UserDO;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.yunda.store.common.utils.DateUtils.DATE_TIME_PATTERN;

/**
 * 物业门店管理信息
 * 
 * @author jincheng.ding
 * @email ${email}
 * @date 2018-04-28 11:17:15
 */
 
@Controller
@RequestMapping("/store/shop")
public class ShopController extends BaseController {
	@Autowired
	private ShopService shopService;
	@Autowired
	private BrandService brandService;
	
	@GetMapping()
	@RequiresPermissions("store:shop:shop")
	String Shop(){
	    return "store/shop/shop";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("store:shop:shop")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<ShopVO> shopList = shopService.list(query);
		int total = shopService.count(query);
		PageUtils pageUtils = new PageUtils(shopList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("store:shop:add")
	String add(){
	    return "store/shop/add";
	}

	@GetMapping("/edit/{id}")
	@RequiresPermissions("store:shop:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		ShopDO shop = shopService.get(id);
        List<BrandDO> enterprises = brandService.listByReviewStatus(2);
        if (enterprises != null && enterprises.size()>0){
			model.addAttribute("enterprises", enterprises);
		}
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map<String,Object>> list = shopService.searchBranch(map);

		model.addAttribute("shop", shop);
	    return "store/shop/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("store:shop:add")
	public R save( ShopDO shop){
		UserDO loginUser = getUser();
		String userId = String.valueOf(loginUser.getUserId());
		if (StringUtils.isBlank(userId)) {
			R.error("获取用户编码失败！");
		}
		shop.setCreateBy(userId);
		String shopCode = String.valueOf(MajorKey.getKeyID());
		shop.setShopCode(shopCode);
		shop.setUpdateTime(DateUtils.format(new Date(),DATE_TIME_PATTERN));
		if(shopService.save(shop)>0){
			Map<String, Object> info = shopService.getShopInfo(shop);
			Map<String, Object> shopMap = new HashMap<String, Object>();
			shopMap.put("enterpriseCode",shop.getEnterpriseCode());
			shopMap.put("shopName",shop.getShopName());
			shopMap.put("shopCode",shop.getShopCode());
			shopMap.put("street",info.get("street"));
			shopMap.put("streetDetail",shop.getStreetDetail());
			shopMap.put("lng",shop.getLng());
			shopMap.put("lat",shop.getLat());
			shopMap.put("branchCode",shop.getBranchCode());
			shopMap.put("chargeName",shop.getChargeName());
			shopMap.put("chargePhone",shop.getChargePhone());
			shopMap.put("idCard",shop.getIdCard());
			//JedisUtil.putHashObject(Constant.STORE_APP_SHOP_INFO+shop.getEnterpriseCode(),shopCode,JSON.toJSONString(shopMap));
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("store:shop:edit")
	public R update( ShopDO shop){
		UserDO loginUser = getUser();
		String userId = String.valueOf(loginUser.getUserId());
		if (StringUtils.isBlank(userId)) {
			R.error("获取用户编码失败！");
		}
		shop.setUpdateBy(userId);
		shop.setUpdateTime(DateUtils.format(new Date(),DATE_TIME_PATTERN));
		shopService.update(shop);
		Map<String, Object> info = shopService.getShopInfo(shop);
		Map<String, Object> shopMap = new HashMap<String, Object>();
		shopMap.put("enterpriseCode",shop.getEnterpriseCode());
		shopMap.put("shopName",shop.getShopName());
		shopMap.put("shopCode",shop.getShopCode());
		shopMap.put("street",info.get("street"));
		shopMap.put("streetDetail",shop.getStreetDetail());
		shopMap.put("lng",shop.getLng());
		shopMap.put("lat",shop.getLat());
		shopMap.put("branchCode",shop.getBranchCode());
		shopMap.put("chargeName",shop.getChargeName());
		shopMap.put("chargePhone",shop.getChargePhone());
		shopMap.put("idCard",shop.getIdCard());
		//JedisUtil.removeHashObject(Constant.STORE_APP_SHOP_INFO+shop.getEnterpriseCode(),shop.getShopCode());
		//JedisUtil.putHashObject(Constant.STORE_APP_SHOP_INFO+shop.getEnterpriseCode(),shop.getShopCode(),JSON.toJSONString(shopMap));
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("store:shop:remove")
	public R remove( Integer id){
		ShopDO shop = shopService.get(id);
		if(shopService.remove(id)>0){
			//JedisUtil.removeHashObject(Constant.STORE_APP_SHOP_INFO+shop.getEnterpriseCode(),shop.getShopCode());
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("store:shop:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		shopService.batchRemove(ids);
		return R.ok();
	}

	/**
	 * 选择省
	 * @return
	 */
	@PostMapping("/searchProvince")
	@ResponseBody
	public List<Map<String,Object>> searchProvince(){
		List<Map<String,Object>> list = shopService.searchProvince();
		if (list != null && list.size()>0){
			return list;
		}
		return null;
	}

	/**
	 * 选择市
	 * @return
	 */
	@GetMapping("/searchCity/{provinceId}")
	@ResponseBody
	public List<Map<String,Object>> searchCity(@PathVariable("provinceId") Integer provinceId ){
		if (provinceId != null){
			List<Map<String,Object>> list = shopService.searchCity(provinceId);
			return list;
		}
		return null;
	}

	/**
	 * 选择区
	 * @return
	 */
	@GetMapping("/searchCounty/{cityId}")
	@ResponseBody
	public List<Map<String,Object>> searchCounty(@PathVariable("cityId") Integer cityId ){
		if (cityId != null){
			List<Map<String,Object>> list = shopService.searchCounty(cityId);
			return list;
		}
		return null;
	}

	/**
	 * 选择品牌
	 * @return
	 */
	@PostMapping("/searchBrand")
	@ResponseBody
	public List<Map<String,Object>> searchBrand(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> map = new HashMap<String, Object>();
		String q = request.getParameter("q");
		if(!StringUtils.isEmpty(q)){
			q = StringEscapeUtils.unescapeHtml(q);
		}
		map.put("q",q.trim());
		List<Map<String,Object>> list = shopService.searchBrand(map);
		if (list != null && list.size()>0){
			return list;
		}
		return null;
	}

	/**
	 * 选择网点
	 * @return
	 */
	@PostMapping("/searchBranch")
	@ResponseBody
	public List<Map<String,Object>> searchBranch(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> map = new HashMap<String, Object>();
		String q = request.getParameter("q");
		if(!StringUtils.isEmpty(q)){
			q = StringEscapeUtils.unescapeHtml(q);
		}
		map.put("q",q.trim());
		List<Map<String,Object>> list = shopService.searchBranch(map);
		if (list != null && list.size()>0){
			return list;
		}
		return null;
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
		return !shopService.exit(params);
	}
}
