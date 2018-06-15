package com.yunda.store.store.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 驿站管理信息
 *
 * @author jincheng.ding
 * @date 2018-05-03 14:12:39
 */
public class ShopDO implements Serializable {
	private static final long serialVersionUID = 1L;

	//序号
	private Integer id;
	//门店名称
	private String shopName;
	//品牌编码
	private String enterpriseCode;
	//门店编码
	private String shopCode;
	//省编码
	private Integer provinceId;
	//市编码
	private Integer cityId;
	//区编码
	private Integer countyId;
	//门店地址
	private String street;
	//地址附加描述
	private String streetDetail;
	//门店经度
	private Double lng;
	//门店纬度
	private Double lat;
	//所属网点编码
	private String branchCode;
	//负责人姓名
	private String chargeName;
	//负责人手机号
	private String chargePhone;
	//负责人身份证号
	private String idCard;
	//创建时间
	private String createTime;
	//修改时间
	private String updateTime;
	//创建人
	private String createBy;
	//修改人
	private String updateBy;
	//默认为0    0：未删除  1：已删除
	private Integer deleteFlag = 0;
	//默认为0    0：未审核  1：审核中  2:已审核
	private Integer reviewStatus;
	//默认为0    0：未启用 1：已启用  2:已停止
	private Integer enableStatus;

	/**
	 * 设置：序号
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：序号
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：门店名称
	 */
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	/**
	 * 获取：门店名称
	 */
	public String getShopName() {
		return shopName;
	}
	/**
	 * 设置：品牌编码
	 */
	public void setEnterpriseCode(String enterpriseCode) {
		this.enterpriseCode = enterpriseCode;
	}
	/**
	 * 获取：品牌编码
	 */
	public String getEnterpriseCode() {
		return enterpriseCode;
	}
	/**
	 * 设置：门店编码
	 */
	public void setShopCode(String shopCode) {
		this.shopCode = shopCode;
	}
	/**
	 * 获取：门店编码
	 */
	public String getShopCode() {
		return shopCode;
	}
	/**
	 * 设置：省编码
	 */
	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}
	/**
	 * 获取：省编码
	 */
	public Integer getProvinceId() {
		return provinceId;
	}
	/**
	 * 设置：市编码
	 */
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}
	/**
	 * 获取：市编码
	 */
	public Integer getCityId() {
		return cityId;
	}
	/**
	 * 设置：区编码
	 */
	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}
	/**
	 * 获取：区编码
	 */
	public Integer getCountyId() {
		return countyId;
	}
	/**
	 * 设置：门店地址
	 */
	public void setStreet(String street) {
		this.street = street;
	}
	/**
	 * 获取：门店地址
	 */
	public String getStreet() {
		return street;
	}
	/**
	 * 设置：地址附加描述
	 */
	public void setStreetDetail(String streetDetail) {
		this.streetDetail = streetDetail;
	}
	/**
	 * 获取：地址附加描述
	 */
	public String getStreetDetail() {
		return streetDetail;
	}
	/**
	 * 设置：门店经度
	 */
	public void setLng(Double lng) {
		this.lng = lng;
	}
	/**
	 * 获取：门店经度
	 */
	public Double getLng() {
		return lng;
	}
	/**
	 * 设置：门店纬度
	 */
	public void setLat(Double lat) {
		this.lat = lat;
	}
	/**
	 * 获取：门店纬度
	 */
	public Double getLat() {
		return lat;
	}
	/**
	 * 设置：所属网点编码
	 */
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	/**
	 * 获取：所属网点编码
	 */
	public String getBranchCode() {
		return branchCode;
	}
	/**
	 * 设置：负责人姓名
	 */
	public void setChargeName(String chargeName) {
		this.chargeName = chargeName;
	}
	/**
	 * 获取：负责人姓名
	 */
	public String getChargeName() {
		return chargeName;
	}
	/**
	 * 设置：负责人手机号
	 */
	public void setChargePhone(String chargePhone) {
		this.chargePhone = chargePhone;
	}
	/**
	 * 获取：负责人手机号
	 */
	public String getChargePhone() {
		return chargePhone;
	}
	/**
	 * 设置：负责人身份证号
	 */
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	/**
	 * 获取：负责人身份证号
	 */
	public String getIdCard() {
		return idCard;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public String getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	/**
	 * 获取：修改时间
	 */
	public String getUpdateTime() {
		return updateTime;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人
	 */
	public String getCreateBy() {
		return createBy;
	}
	/**
	 * 设置：修改人
	 */
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取：修改人
	 */
	public String getUpdateBy() {
		return updateBy;
	}
	/**
	 * 设置：默认为0    0：未删除  1：已删除
	 */
	public void setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
	}
	/**
	 * 获取：默认为0    0：未删除  1：已删除
	 */
	public Integer getDeleteFlag() {
		return deleteFlag;
	}
	/**
	 * 设置：默认为0    0：未审核  1：审核中  2:已审核
	 */
	public void setReviewStatus(Integer reviewStatus) {
		this.reviewStatus = reviewStatus;
	}
	/**
	 * 获取：默认为0    0：未审核  1：审核中  2:已审核
	 */
	public Integer getReviewStatus() {
		return reviewStatus;
	}
	/**
	 * 设置：默认为0    0：未启用 1：已启用  2:已停止
	 */
	public void setEnableStatus(Integer enableStatus) {
		this.enableStatus = enableStatus;
	}
	/**
	 * 获取：默认为0    0：未启用 1：已启用  2:已停止
	 */
	public Integer getEnableStatus() {
		return enableStatus;
	}
}
