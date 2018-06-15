package com.yunda.store.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "store")
public class AutoBaseConfig {

	// 消息推送接口
	private String dispatchUrl;

	// 上传路径
	private String uploadPath;

	// 图片主机
	private String uploadLocal;

	public String getDispatchUrl() {
		return dispatchUrl;
	}

	public void setDispatchUrl(String dispatchUrl) {
		this.dispatchUrl = dispatchUrl;
	}

	public String getUploadPath() {
		return uploadPath;
	}

	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}

	public String getUploadLocal() {
		return uploadLocal;
	}

	public void setUploadLocal(String uploadLocal) {
		this.uploadLocal = uploadLocal;
	}

}
