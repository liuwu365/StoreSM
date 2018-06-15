package com.yunda.store.store.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 驿站品牌管理信息
 *
 * @author jincheng.ding
 * @date 2018-05-03 14:12:39
 */
public class BrandDO implements Serializable {
	private static final long serialVersionUID = 1L;

	//序号
	private Integer id;
	//企业全称
	private String enterpriseName;
	//企业地址
	private String enterpriseAddress;
	//app_key
	private String appKey;
	//品牌编码
	private String enterpriseCode;
	//联系人姓名
	private String contactName;
	//注册驿站品牌手机号，用于总部与驿站联系
	private String mobile;
	//邮箱地址
	private String email;
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
	 * 设置：企业全称
	 */
	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
	}
	/**
	 * 获取：企业全称
	 */
	public String getEnterpriseName() {
		return enterpriseName;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	/**
	 * 设置：企业地址
	 */
	public void setEnterpriseAddress(String enterpriseAddress) {
		this.enterpriseAddress = enterpriseAddress;
	}
	/**
	 * 获取：企业地址
	 */
	public String getEnterpriseAddress() {
		return enterpriseAddress;
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
	 * 设置：联系人姓名
	 */
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}
	/**
	 * 获取：联系人姓名
	 */
	public String getContactName() {
		return contactName;
	}
	/**
	 * 设置：注册驿站品牌手机号，用于总部与驿站联系
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	/**
	 * 获取：注册驿站品牌手机号，用于总部与驿站联系
	 */
	public String getMobile() {
		return mobile;
	}
	/**
	 * 设置：邮箱地址
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * 获取：邮箱地址
	 */
	public String getEmail() {
		return email;
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
